const Item = require('../models/Item');

const itemController = {
  getAllItems: async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createItem: async (req, res) => {
    try {
      const { name, description } = req.body;
      const newItem = new Item({ name, description });
      await newItem.save();
      res.status(201).json({ message: 'Item created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getItemById: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      await Item.findByIdAndUpdate(id, { name, description });
      res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      await Item.findByIdAndDelete(id);
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = itemController;
