import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ComponentSelector from '../components/configurator/ComponentSelector';
import CompatibilityWarning from '../components/configurator/CompatibilityWarning';
import ConfigSummary from '../components/configurator/ConfigSummary';
import { useAuth } from '../context/AuthContext';

const Configurator = () => {
    const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [components, setComponents] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    gpu: null,
    psu: null,
    case: null
  });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compatibilityIssues, setCompatibilityIssues] = useState([]);
  const [saving, setSaving] = useState(false);
  
  const categories = [
    { id: 'cpu', name: 'Processor (CPU)', icon: '💻' },
    { id: 'motherboard', name: 'Motherboard', icon: '🔌' },
    { id: 'ram', name: 'Memory (RAM)', icon: '🧠' },
    { id: 'storage', name: 'Storage', icon: '💾' },
    { id: 'gpu', name: 'Graphics Card (GPU)', icon: '🎮' },
    { id: 'psu', name: 'Power Supply (PSU)', icon: '⚡' },
    { id: 'case', name: 'Case', icon: '📦' },
  ];

  const currentCategory = categories[step];

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setLoading(true);
        const data = await api.get(`/products/components/${currentCategory.id}`);
        setOptions(data);
      } catch (error) {
        console.error('Error fetching components:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
    checkCompatibility();
  }, [step, components]);

  const handleSelect = (component) => {
    setComponents(prev => ({
      ...prev,
      [currentCategory.id]: component
    }));
    
    // Auto-advance if not the last step
    if (step < categories.length - 1) {
      setTimeout(() => setStep(step + 1), 500);
    }
  };

  const checkCompatibility = () => {
    const issues = [];
    const { cpu, motherboard, ram, gpu, psu, case: pcCase } = components;

    // CPU-Motherboard socket compatibility
    if (cpu && motherboard && cpu.specs.socket !== motherboard.specs.socket) {
      issues.push(`CPU socket (${cpu.specs.socket}) doesn't match motherboard socket (${motherboard.specs.socket})`);
    }

    // RAM-Motherboard compatibility
    if (ram && motherboard && ram.specs.memoryType !== motherboard.specs.memoryType) {
      issues.push(`RAM type (${ram.specs.memoryType}) doesn't match motherboard support (${motherboard.specs.memoryType})`);
    }

    // PSU wattage check
    if (cpu && gpu && psu) {
      const estimatedWattage = cpu.specs.tdp + gpu.specs.tdp + 150; // Add 150W for other components
      if (psu.specs.wattage < estimatedWattage) {
        issues.push(`PSU wattage (${psu.specs.wattage}W) may be insufficient for your components (estimated ${estimatedWattage}W)`);
      }
    }

    // Case size check
    if (motherboard && pcCase && pcCase.specs.formFactor) {
      const supportedFormFactors = pcCase.specs.formFactor.split(',').map(f => f.trim());
      if (!supportedFormFactors.includes(motherboard.specs.formFactor)) {
        issues.push(`Case supports ${supportedFormFactors.join('/')} motherboards, but selected is ${motherboard.specs.formFactor}`);
      }
    }

    setCompatibilityIssues(issues);
  };

  const calculateTotalPrice = () => {
    return Object.values(components)
      .filter(comp => comp !== null)
      .reduce((total, comp) => total + comp.price, 0);
  };

  const handleSaveConfiguration = async () => {
    try {
      setSaving(true);
      const configData = {
        name: "My Custom Build", // In a real app, let users name their build
        components: Object.keys(components).reduce((acc, key) => {
          if (components[key]) acc[key] = components[key]._id;
          return acc;
        }, {}),
        totalPrice: calculateTotalPrice(),
      };
      
      if (user) {
        // Save to user account
        await api.saveConfiguration(configData);
        alert('Configuration saved to your account!');
      } else {
        // Save to localStorage for guests
        const guestConfigs = JSON.parse(localStorage.getItem('guestConfigs') || []);
        guestConfigs.push({
          ...configData,
          id: Date.now().toString(),
          createdAt: new Date(),
        });
        localStorage.setItem('guestConfigs', JSON.stringify(guestConfigs));
        alert('Configuration saved locally!');
      }
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const nextStep = () => {
    if (step < categories.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const resetComponent = () => {
    setComponents(prev => ({
      ...prev,
      [currentCategory.id]: null
    }));
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-charcoal">Custom PC Builder</h1>
        <p className="text-lg text-gray-600 mt-2">
          Build your dream gaming PC step-by-step
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <span className="mr-2 text-2xl">{currentCategory.icon}</span>
                {currentCategory.name}
              </h2>
              {components[currentCategory.id] && (
                <button 
                  onClick={resetComponent}
                  className="text-sm bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded"
                >
                  Change Selection
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-accent"></div>
              </div>
            ) : components[currentCategory.id] ? (
              <div className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mr-6">
                  {components[currentCategory.id].image ? (
                    <img 
                      src={components[currentCategory.id].image} 
                      alt={components[currentCategory.id].name} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-5xl">🖥️</span>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{components[currentCategory.id].name}</h3>
                  <p className="text-violet-accent font-bold text-xl mt-1">
                    ${components[currentCategory.id].price}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {Object.entries(components[currentCategory.id].specs).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-semibold">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ComponentSelector 
                options={options} 
                onSelect={handleSelect} 
                category={currentCategory.id}
              />
            )}

            <CompatibilityWarning issues={compatibilityIssues} />

            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`py-2 px-6 rounded ${
                  step === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-100 hover:bg-gray-200 text-dark-charcoal'
                }`}
              >
                ← Previous
              </button>
              <button
                onClick={nextStep}
                disabled={step === categories.length - 1 || !components[currentCategory.id]}
                className={`py-2 px-6 rounded ${
                  step === categories.length - 1 || !components[currentCategory.id]
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-violet-accent hover:bg-violet-700 text-white'
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        <div>
          <ConfigSummary 
            components={components} 
            categories={categories}
            totalPrice={calculateTotalPrice()}
            onSave={handleSaveConfiguration}
            saving={saving}
            allSelected={Object.values(components).every(comp => comp !== null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Configurator;