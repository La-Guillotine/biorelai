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
    Product.create(req.params.id,req.body).then(insertId => {
        res.send(JSON.stringify("InsertId : " + insertId));
    });
}

exports.updateProduct = async(req, res) => {
    Product.getOne(req.params.productId).then((product) => {
        console.log(product);
        if(req.body.codeCat) product.CODECAT = req.body.codeCat;
        if(req.body.nom) product.NOMPRODUIT = req.body.nom;
        if(req.body.description) product.DESCRIPTIFPRODUIT = req.body.description;
        if(req.body.prixU) product.PRIXUNITAIRE = req.body.prixU;
        if(req.body.unite) product.UNITE = req.body.unite;
        console.log(product);

        Product.update(product).then(result => {
            res.send(JSON.stringify(result));
        });
    });
}
exports.removeProduct = async (req, res) => {
    Product.remove(req.params.productId).then( result => {
        res.send(JSON.stringify(result));
    });
}