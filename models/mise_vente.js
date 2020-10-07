const con = require('./db.js');

//MiseVente object constructor
let MiseVente = function(data){
    this.MiseVente = data;
    this.status = MiseVente.status;
    this.created_at = new Date();
};

MiseVente.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query("Select * from mise_vente", (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

MiseVente.getByProducer = (producerId) => {
    return new Promise((resolve, reject) => {
        con.query(`Select mise_vente.*, NOMPRODUIT, LIBELLECAT FROM mise_vente 
        JOIN produit ON produit.CODEP = mise_vente.CODEP 
        JOIN categorie ON produit.CODECAT = categorie.CODECAT
        WHERE IDINT = ?`,
        producerId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

MiseVente.getBySemaine = (idSemaine) => {
    return new Promise((resolve, reject) => {
        con.query("Select * from mise_vente IDSEM = ?", idSemaine, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

MiseVente.addProduct = (idProduct, idSemaine, quantite) => {
    return new Promise((resolve, reject) => {
        con.query("INSERT INTO mise_vente VALUES(?,?,?)", [idProduct, idSemaine, quantite], (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

MiseVente.removeOne = (idProduct, idSemaine) => {
    return new Promise((resolve, reject) => {
        con.query("DELETE FROM mise_vente WHERE CODEP = ? AND IDSEM = ?", [idProduct, idSemaine], (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

module.exports = MiseVente;