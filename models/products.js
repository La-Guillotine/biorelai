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

Product.getByOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        con.query(`Select * from Produit 
        JOIN produits_commander ON Produit.CODEP = produits_commander.CODEP
        Where IDCOMMANDE = ?`,orderId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

Product.create = (producerId, product) => {
    return new Promise((resolve, reject) => {
        con.query("Insert Into Produit VALUES (NULL,?,?,?,?,?,?)",
        [product.codeCat, producerId, product.nom, product.description, product.prixU, product.unite],
         (err, res, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(res.insertId);
        });
    });
}

Product.update = (product) => {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE Produit SET
        CODECAT = ${con.escape(product.CODECAT)},
        NOMPRODUIT = ${con.escape(product.NOMPRODUIT)},
        DESCRIPTIFPRODUIT = ${con.escape(product.DESCRIPTIFPRODUIT)},
        PRIXUNITAIRE = ${con.escape(product.PRIXUNITAIRE)},
        UNITE = ${con.escape(product.UNITE)}
        WHERE CODEP = ${con.escape(product.CODEP)}
        `,
         (err, res, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(res);
        });
    });
}

Product.remove = (productId) => {
    return new Promise((resolve, reject) => {
        con.query("Delete From Produit Where CODEP = ?",productId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

module.exports = Product;