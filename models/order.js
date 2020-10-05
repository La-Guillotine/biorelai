const con = require('./db.js');

//Order object constructor
let Order = function(data){
    this.Order = data;
    this.status = Order.status;
    this.created_at = new Date();
};

Order.getOne = (orderId) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM commande WHERE IDCOMMANDE = ?", orderId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
}

Order.getBySemaine = (idSemaine) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM commande WHERE IDSEM = ?",idSemaine, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

Order.getByCustomer = (customerId) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM commande WHERE IDINT = ?", customerId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

Order.getByProducer = (producerId) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM commande
        INNER JOIN produits_commander ON commande.IDCOMMANDE = produits_commander.IDCOMMANDE
        INNER JOIN produit ON produits_commander.CODEP = produit.CODEP
        WHERE produit.IDINT = ?; `, producerId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    }); 
}

module.exports = Order;