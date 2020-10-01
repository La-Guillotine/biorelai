const con = require('./db.js');

//Product object constructor
let Product = function(data){
    this.Product = data;
    this.status = Product.status;
    this.created_at = new Date();
};

Product.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Produit", (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}
Product.getProductsByProducer = (producerId) => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Produit  Where Produit.IDINT = ?",producerId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

Product.getOne = (productId) => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Produit Where CODEP = ?",productId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
}

Product.update = (productId, product) => {

}

Product.remove = (productId) => {
    return new Promise((resolve, reject) => {
        con.query("Delete From Produit Where CODEP = ?",productId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
}

module.exports = Product;