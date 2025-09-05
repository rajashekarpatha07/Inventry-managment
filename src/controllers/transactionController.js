const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const Contact = require('../models/Contact');

exports.getTransactions = async (req, res) => {
  try {
    const { type, startDate, endDate, customerId, vendorId } = req.query;
    const query = { businessId: req.businessId };

    if (type) {
      query.type = type;
    }
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    if (customerId) {
      query.customerId = customerId;
    }
    if (vendorId) {
      query.vendorId = vendorId;
    }

    const transactions = await Transaction.find(query)
      .populate('customerId', 'name email phone')
      .populate('vendorId', 'name email phone')
      .populate('products.productId', 'name price')
      .sort('-date');

    res.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { type, customerId, vendorId, products } = req.body;

    // Validate contact exists
    if (type === 'sale' && customerId) {
      const customer = await Contact.findOne({
        _id: customerId,
        businessId: req.businessId,
        type: 'customer'
      });
      if (!customer) {
        return res.status(400).json({ message: 'Customer not found' });
      }
    }

    if (type === 'purchase' && vendorId) {
      const vendor = await Contact.findOne({
        _id: vendorId,
        businessId: req.businessId,
        type: 'vendor'
      });
      if (!vendor) {
        return res.status(400).json({ message: 'Vendor not found' });
      }
    }

    // Calculate total and update stock
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findOne({
        _id: item.productId,
        businessId: req.businessId
      });

      if (!product) {
        return res.status(400).json({ 
          message: `Product ${item.productId} not found` 
        });
      }

      // Calculate total
      totalAmount += item.quantity * item.price;

      // Update stock based on transaction type
      if (type === 'sale') {
        if (product.stock < item.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for product ${product.name}. Available: ${product.stock}`
          });
        }
        product.stock -= item.quantity;
      } else if (type === 'purchase') {
        product.stock += item.quantity;
      }

      await product.save();
    }

    // Create transaction
    const transactionData = {
      type,
      customerId: type === 'sale' ? customerId : undefined,
      vendorId: type === 'purchase' ? vendorId : undefined,
      products,
      totalAmount,
      businessId: req.businessId,
      date: req.body.date || Date.now()
    };

    const transaction = await Transaction.create(transactionData);
    
    // Populate the created transaction
    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('customerId', 'name email phone')
      .populate('vendorId', 'name email phone')
      .populate('products.productId', 'name price');

    res.status(201).json(populatedTransaction);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};
