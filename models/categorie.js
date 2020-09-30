const con = require('./db.js');

//Categorie object constructor
let Categorie = function(data){
    this.Categorie = data;
    this.status = Categorie.status;
    this.created_at = new Date();
};

Categorie.getCategories = () => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Categorie", (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

Categorie.getOne = function(categId){
    return new Promise((resolve, reject) => {
        con.query("Select * from Categorie where CODECAT = ? ", categId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
}

Categorie.createCategorie = function (libCateg, result) {    
    return new Promise((resolve, reject) => {
        con.query("INSERT INTO Categorie (LIBELLECAT) VALUES (?)", libCateg, function (err, res) {    
            if(err) reject(err);
            
            else resolve(res.insertId);
        }); 
    });          
}

Categorie.remove = function(categId){
    return new Promise((resolve, reject) => {
        con.query("DELETE FROM Categorie where CODECAT = ? ", categId, (err, result, fields) => {
            console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = Categorie;