const Order = require('../models/order');
const Product = require('../models/products');

exports.getByCustomer = async (req, res) => {
    const orders = await Order.getByCustomer(req.params.id);
    await Promise.all(orders.map(async order => {
      const products = await Product.getByOrder(order.IDCOMMANDE);
      order.products = products;
    }));
    res.send(JSON.stringify(orders));
}

exports.getOne = (req, res) => {
    Order.getOne(req.params.orderId).then(order => {
        Product.getByOrder(order.IDCOMMANDE).then(products => {
            order.products = products;
            res.send(JSON.stringify(order));
        });
    });
}

exports.createOrder = (req, res) => {

}

exports.addProduct = (product) => {

}

exports.getByProducer = (req,res) => {

}