const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = { businessId: req.businessId };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).sort('-createdAt');
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      businessId: req.businessId
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, businessId: req.businessId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      businessId: req.businessId
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { quantity, operation } = req.body;
    const product = await Product.findOne({
      _id: req.params.id,
      businessId: req.businessId
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (operation === 'increase') {
      product.stock += quantity;
    } else if (operation === 'decrease') {
      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      product.stock -= quantity;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ message: 'Error updating stock', error: error.message });
  }
};
