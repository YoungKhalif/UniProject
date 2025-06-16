const ConfigSummary = ({ components, categories, totalPrice, onSave, saving, allSelected }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h2 className="text-xl font-bold mb-4">Your Configuration</h2>
      
      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={`border-b pb-3 ${components[category.id] ? '' : 'opacity-50'}`}
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">{category.icon}</span>
              <h3 className="font-medium">{category.name}</h3>
            </div>
            
            {components[category.id] ? (
              <div className="ml-7 mt-1">
                <p className="font-semibold">{components[category.id].name}</p>
                <p className="text-violet-accent">${components[category.id].price}</p>
              </div>
            ) : (
              <p className="ml-7 mt-1 text-gray-500">Not selected</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Total:</span>
          <span className="text-2xl font-bold text-violet-accent">${totalPrice.toFixed(2)}</span>
        </div>
        
        <button
          onClick={onSave}
          disabled={saving || !allSelected}
          className={`w-full py-3 rounded-md text-white font-medium ${
            saving || !allSelected
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-violet-accent hover:bg-violet-700'
          }`}
        >
          {saving ? 'Saving...' : allSelected ? 'Save Configuration' : 'Complete Selection'}
        </button>
        
        <p className="text-center mt-3 text-sm text-gray-500">
          Save your configuration to add to cart later
        </p>
      </div>
    </div>
  );
};

export default ConfigSummary;