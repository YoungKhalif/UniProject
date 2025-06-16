import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Account = () => {
  const { user } = useAuth();
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchConfigs = async () => {
        try {
          const response = await api.getSavedConfigurations();
          setSavedConfigs(response.data);
        } catch (error) {
          console.error('Failed to fetch saved configurations', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchConfigs();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Account Information</h2>
          <p className="text-lg mb-6">Please log in to view your account details</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/login" 
              className="bg-violet-accent text-white py-2 px-6 rounded hover:bg-violet-700"
            >
              Login
            </a>
            <a 
              href="/register" 
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-charcoal">My Account</h1>
        <p className="text-lg text-gray-600 mt-2">
          Welcome back, {user.name}!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Account Information</h2>
            <div className="space-y-4">
              <div className="flex">
                <span className="w-32 font-medium">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex">
                <span className="w-32 font-medium">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex">
                <span className="w-32 font-medium">Account Type:</span>
                <span className="capitalize">{user.role}</span>
              </div>
              <div className="flex">
                <span className="w-32 font-medium">Member Since:</span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Saved PC Configurations</h2>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-accent"></div>
              </div>
            ) : savedConfigs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven't saved any configurations yet</p>
                <a 
                  href="/configurator" 
                  className="bg-violet-accent text-white py-2 px-6 rounded hover:bg-violet-700"
                >
                  Build a PC
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {savedConfigs.map(config => (
                  <div key={config._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold">{config.name}</h3>
                      <span className="text-xl font-bold text-violet-accent">
                        ${config.totalPrice.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.components).map(([category, component]) => (
                        component && (
                          <div key={category} className="flex items-center">
                            <div className="bg-gray-100 rounded w-16 h-16 flex items-center justify-center mr-4">
                              {component.image ? (
                                <img 
                                  src={component.image} 
                                  alt={component.name} 
                                  className="w-12 h-12 object-contain"
                                />
                              ) : (
                                <span className="text-2xl">💻</span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium capitalize">{category}</h4>
                              <p className="text-sm">{component.name}</p>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                    
                    <div className="flex justify-end mt-4 space-x-3">
                      <button className="bg-violet-accent text-white py-1 px-4 rounded hover:bg-violet-700">
                        Add to Cart
                      </button>
                      <button className="bg-gray-200 text-gray-800 py-1 px-4 rounded hover:bg-gray-300">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
              <a 
                href="/pre-built" 
                className="bg-violet-accent text-white py-2 px-6 rounded hover:bg-violet-700"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;