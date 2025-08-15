import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './GamingLaptops.css';

const GamingLaptops = () => {
  const laptops = [
    {
      id: 1,
      name: "Stack Gaming Laptop Pro",
      price: "$1,899",
      specs: {
        processor: "Intel Core i7-12700H",
        graphics: "NVIDIA RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB NVMe SSD",
        display: "15.6\" 144Hz FHD"
      },
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Stack Gaming Laptop Elite",
      price: "$2,499",
      specs: {
        processor: "Intel Core i9-12900H",
        graphics: "NVIDIA RTX 4070",
        ram: "32GB DDR5",
        storage: "2TB NVMe SSD",
        display: "17.3\" 165Hz QHD"
      },
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Stack Gaming Laptop Ultimate",
      price: "$3,299",
      specs: {
        processor: "Intel Core i9-13900H",
        graphics: "NVIDIA RTX 4080",
        ram: "32GB DDR5",
        storage: "2TB NVMe SSD",
        display: "17.3\" 240Hz QHD"
      },
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="gaming-laptops">
      <Header />
      
      <main className="gaming-laptops__main">
        <div className="gaming-laptops__hero">
          <div className="container">
            <h1 className="gaming-laptops__title">Gaming Laptops</h1>
            <p className="gaming-laptops__subtitle">
              Powerful portable gaming machines for gaming on the go
            </p>
          </div>
        </div>

        <div className="gaming-laptops__content">
          <div className="container">
            <div className="gaming-laptops__grid">
              {laptops.map(laptop => (
                <div key={laptop.id} className="laptop-card">
                  <div className="laptop-card__image">
                    <img src={laptop.image} alt={laptop.name} />
                  </div>
                  <div className="laptop-card__content">
                    <h3 className="laptop-card__name">{laptop.name}</h3>
                    <div className="laptop-card__specs">
                      <div className="spec">
                        <span className="spec__label">Processor:</span>
                        <span className="spec__value">{laptop.specs.processor}</span>
                      </div>
                      <div className="spec">
                        <span className="spec__label">Graphics:</span>
                        <span className="spec__value">{laptop.specs.graphics}</span>
                      </div>
                      <div className="spec">
                        <span className="spec__label">RAM:</span>
                        <span className="spec__value">{laptop.specs.ram}</span>
                      </div>
                      <div className="spec">
                        <span className="spec__label">Storage:</span>
                        <span className="spec__value">{laptop.specs.storage}</span>
                      </div>
                      <div className="spec">
                        <span className="spec__label">Display:</span>
                        <span className="spec__value">{laptop.specs.display}</span>
                      </div>
                    </div>
                    <div className="laptop-card__footer">
                      <span className="laptop-card__price">{laptop.price}</span>
                      <button className="laptop-card__button">View Details</button>
                    </div>
                  </div>
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

export default GamingLaptops;
