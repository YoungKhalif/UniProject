import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './Components.css';

const Components = () => {
  const componentCategories = [
    {
      id: 1,
      name: "Processors (CPUs)",
      icon: "🖥️",
      products: [
        { name: "Intel Core i9-13900K", price: "$589", specs: "24 Cores, 32 Threads" },
        { name: "AMD Ryzen 9 7950X", price: "$699", specs: "16 Cores, 32 Threads" },
        { name: "Intel Core i7-13700K", price: "$409", specs: "16 Cores, 24 Threads" }
      ]
    },
    {
      id: 2,
      name: "Graphics Cards",
      icon: "🎮",
      products: [
        { name: "NVIDIA RTX 4090", price: "$1,599", specs: "24GB GDDR6X" },
        { name: "NVIDIA RTX 4080", price: "$1,199", specs: "16GB GDDR6X" },
        { name: "AMD RX 7900 XTX", price: "$999", specs: "24GB GDDR6" }
      ]
    },
    {
      id: 3,
      name: "Memory (RAM)",
      icon: "💾",
      products: [
        { name: "Corsair Vengeance 32GB DDR5", price: "$299", specs: "5600MHz, RGB" },
        { name: "G.Skill Trident Z5 32GB", price: "$349", specs: "6000MHz, RGB" },
        { name: "Kingston Fury 16GB DDR5", price: "$149", specs: "5200MHz" }
      ]
    },
    {
      id: 4,
      name: "Storage",
      icon: "💿",
      products: [
        { name: "Samsung 990 PRO 2TB", price: "$199", specs: "NVMe Gen4, 7000MB/s" },
        { name: "WD Black SN850X 1TB", price: "$129", specs: "NVMe Gen4, 7300MB/s" },
        { name: "Crucial P5 Plus 2TB", price: "$169", specs: "NVMe Gen4, 6600MB/s" }
      ]
    },
    {
      id: 5,
      name: "Motherboards",
      icon: "🔌",
      products: [
        { name: "ASUS ROG Strix Z790-E", price: "$449", specs: "Intel Z790, WiFi 6E" },
        { name: "MSI MPG X670E Carbon", price: "$499", specs: "AMD X670E, WiFi 6E" },
        { name: "Gigabyte Z790 AORUS Elite", price: "$329", specs: "Intel Z790, DDR5" }
      ]
    },
    {
      id: 6,
      name: "Power Supplies",
      icon: "⚡",
      products: [
        { name: "Corsair RM1000x", price: "$179", specs: "1000W, 80+ Gold" },
        { name: "EVGA SuperNOVA 850W", price: "$149", specs: "850W, 80+ Platinum" },
        { name: "Seasonic Focus GX-750", price: "$129", specs: "750W, 80+ Gold" }
      ]
    }
  ];

  return (
    <div className="components">
      <Header />
      
      <main className="components__main">
        <div className="components__hero">
          <div className="container">
            <h1 className="components__title">PC Components</h1>
            <p className="components__subtitle">
              Premium components for custom PC builds and upgrades
            </p>
          </div>
        </div>

        <div className="components__content">
          <div className="container">
            <div className="components__grid">
              {componentCategories.map(category => (
                <div key={category.id} className="component-category">
                  <div className="component-category__header">
                    <span className="component-category__icon">{category.icon}</span>
                    <h3 className="component-category__title">{category.name}</h3>
                  </div>
                  
                  <div className="component-category__products">
                    {category.products.map((product, index) => (
                      <div key={index} className="component-product">
                        <div className="component-product__info">
                          <h4 className="component-product__name">{product.name}</h4>
                          <p className="component-product__specs">{product.specs}</p>
                        </div>
                        <div className="component-product__price">{product.price}</div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="component-category__button">
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

export default Components;
