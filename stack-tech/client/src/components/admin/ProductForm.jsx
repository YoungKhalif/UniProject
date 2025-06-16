// src/components/admin/ProductForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../../services/productService';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    images: [],
    specifications: {}
  });
  
  const [isLoading, setIsLoading] = useState(isEditing);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (isEditing) {
      const loadProduct = async () => {
        try {
          const product = await getProductById(id);
          setFormData(product);
          setImagePreviews(product.images);
        } catch (error) {
          console.error('Failed to load product:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images];
    const newPreviews = [...imagePreviews];
    
    files.forEach(file => {
      // In a real app, you would upload to cloud storage here
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        newImages.push(file);
        setImagePreviews([...newPreviews]);
        setFormData(prev => ({ ...prev, images: newImages }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isEditing) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Operation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading product data...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Product' : 'Create New Product'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a category</option>
              <option value="cpu">CPU</option>
              <option value="gpu">GPU</option>
              <option value="ram">RAM</option>
              <option value="storage">Storage</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          <div className="flex flex-wrap gap-3 mt-3">
            {imagePreviews.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;