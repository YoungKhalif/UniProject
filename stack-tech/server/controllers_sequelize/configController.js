// controllers_sequelize/configController.js
const { Configuration, Product } = require('../models_sequelize');

exports.createConfiguration = async (req, res) => {
  try {
    const { name, userId, components, totalPrice } = req.body;
    
    const configuration = await Configuration.create({
      name,
      userId,
      cpuId: components.cpu,
      motherboardId: components.motherboard,
      ramId: components.ram,
      storageId: components.storage,
      gpuId: components.gpu,
      psuId: components.psu,
      caseId: components.case,
      totalPrice
    });
    
    res.status(201).json(configuration);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserConfigurations = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const configurations = await Configuration.findAll({
      where: { userId },
      include: [
        { model: Product, as: 'cpu' },
        { model: Product, as: 'motherboard' },
        { model: Product, as: 'ram' },
        { model: Product, as: 'storage' },
        { model: Product, as: 'gpu' },
        { model: Product, as: 'psu' },
        { model: Product, as: 'case' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(configurations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getConfigurationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const configuration = await Configuration.findByPk(id, {
      include: [
        { model: Product, as: 'cpu' },
        { model: Product, as: 'motherboard' },
        { model: Product, as: 'ram' },
        { model: Product, as: 'storage' },
        { model: Product, as: 'gpu' },
        { model: Product, as: 'psu' },
        { model: Product, as: 'case' }
      ]
    });
    
    if (!configuration) {
      return res.status(404).json({ message: 'Configuration not found' });
    }
    
    res.json(configuration);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, components, totalPrice } = req.body;
    
    const [updated] = await Configuration.update({
      name,
      cpuId: components.cpu,
      motherboardId: components.motherboard,
      ramId: components.ram,
      storageId: components.storage,
      gpuId: components.gpu,
      psuId: components.psu,
      caseId: components.case,
      totalPrice
    }, {
      where: { id }
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Configuration not found' });
    }
    
    const updatedConfiguration = await Configuration.findByPk(id, {
      include: [
        { model: Product, as: 'cpu' },
        { model: Product, as: 'motherboard' },
        { model: Product, as: 'ram' },
        { model: Product, as: 'storage' },
        { model: Product, as: 'gpu' },
        { model: Product, as: 'psu' },
        { model: Product, as: 'case' }
      ]
    });
    
    res.json(updatedConfiguration);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await Configuration.destroy({
      where: { id }
    });
    
    if (!deleted) {
      return res.status(404).json({ message: 'Configuration not found' });
    }
    
    res.json({ message: 'Configuration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
