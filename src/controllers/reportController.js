const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const Contact = require('../models/Contact');

exports.getInventoryReport = async (req, res) => {
  try {
    const products = await Product.find({ businessId: req.businessId })
      .select('name category price stock')
      .sort('category name');

    const totalValue = products.reduce((sum, product) => {
      return sum + (product.price * product.stock);
    }, 0);

    const lowStockProducts = products.filter(p => p.stock < 10);

    res.json({
      products,
      summary: {
        totalProducts: products.length,
        totalValue,
        lowStockCount: lowStockProducts.length,
        lowStockProducts
      }
    });
  } catch (error) {
    console.error('Inventory report error:', error);
    res.status(500).json({ message: 'Error generating inventory report', error: error.message });
  }
};

exports.getTransactionReport = async (req, res) => {
  try {
    const { startDate, endDate, type, contactId } = req.query;
    const query = { businessId: req.businessId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    if (type) {
      query.type = type;
    }
    if (contactId) {
      if (type === 'sale') {
        query.customerId = contactId;
      } else if (type === 'purchase') {
        query.vendorId = contactId;
      }
    }

    const transactions = await Transaction.find(query)
      .populate('customerId', 'name')
      .populate('vendorId', 'name')
      .populate('products.productId', 'name')
      .sort('-date');

    // Calculate summary
    const summary = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'sale') {
        acc.totalSales += transaction.totalAmount;
        acc.salesCount += 1;
      } else {
        acc.totalPurchases += transaction.totalAmount;
        acc.purchasesCount += 1;
      }
      return acc;
    }, {
      totalSales: 0,
      totalPurchases: 0,
      salesCount: 0,
      purchasesCount: 0
    });

    summary.profit = summary.totalSales - summary.totalPurchases;

    res.json({
      transactions,
      summary
    });
  } catch (error) {
    console.error('Transaction report error:', error);
    res.status(500).json({ message: 'Error generating transaction report', error: error.message });
  }
};
