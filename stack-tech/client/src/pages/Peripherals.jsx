import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './Peripherals.css';

const Peripherals = () => {
  const categories = [
    {
      id: 1,
      name: "Gaming Keyboards",
      description: "Mechanical and membrane keyboards for competitive gaming",
      products: [
        { name: "Stack Mechanical RGB Pro", price: "$149" },
        { name: "Stack Wireless Gaming", price: "$89" },
        { name: "Stack Compact TKL", price: "$119" }
      ]
    },
    {
      id: 2,
      name: "Gaming Mice",
      description: "High-precision gaming mice with customizable DPI",
      products: [
        { name: "Stack Pro Gaming Mouse", price: "$79" },
        { name: "Stack Wireless RGB", price: "$99" },
        { name: "Stack Ultra Light", price: "$69" }
      ]
    },
    {
      id: 3,
      name: "Gaming Headsets",
      description: "Immersive audio experience for competitive gaming",
      products: [
        { name: "Stack 7.1 Surround", price: "$129" },
        { name: "Stack Wireless Pro", price: "$179" },
        { name: "Stack Studio Quality", price: "$199" }
      ]
    },
    {
      id: 4,
      name: "Gaming Monitors",
      description: "High refresh rate monitors for smooth gameplay",
      products: [
        { name: "Stack 24\" 144Hz", price: "$299" },
        { name: "Stack 27\" 165Hz", price: "$399" },
        { name: "Stack 32\" 4K 144Hz", price: "$699" }
      ]
    }
  ];

  return (
    <div className="peripherals">
      <Header />
      
      <main className="peripherals__main">
        <div className="peripherals__hero">
          <div className="container">
            <h1 className="peripherals__title">Gaming Peripherals</h1>
            <p className="peripherals__subtitle">
              Complete your gaming setup with professional-grade peripherals
            </p>
          </div>
        </div>

        <div className="peripherals__content">
          <div className="container">
            <div className="peripherals__grid">
              {categories.map(category => (
                <div key={category.id} className="category-card">
                  <div className="category-card__header">
                    <h3 className="category-card__title">{category.name}</h3>
                    <p className="category-card__description">{category.description}</p>
                  </div>
                  
                  <div className="category-card__products">
                    {category.products.map((product, index) => (
                      <div key={index} className="product-item">
                        <span className="product-item__name">{product.name}</span>
                        <span className="product-item__price">{product.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="category-card__button">
                    View All {category.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Peripherals;
