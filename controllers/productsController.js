const Product = require('../models/products');

exports.getProducts = async (req, res) => {
    Product.getProductsByProducer(req.params.id).then((products) => {
        res.send(JSON.stringify(products));
    });
}
exports.getOneProduct = async (req, res) => {
    Product.getOne(req.params.productId).then((product) => {
        res.send(JSON.stringify(product));
    });
}

exports.addProduct = async(req, res) => {
    Product.create(req.params.id).then(result => {
        res.send(JSON.stringify(result));
    });
}

exports.updateProduct = async(req, res) => {
    Product.create(req.params.id).then(result => {
        res.send(JSON.stringify(result));
    });
}
exports.removeProduct = async (req, res) => {
    Product.remove(req.params.id).then( result => {
        res.send(JSON.stringify(result));
    });
}