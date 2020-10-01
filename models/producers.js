const con = require('./db.js');
const util = require('util');
let User = require('./user');

//Producer object constructor
let Producer = function(data){
    this.Producer = data;
    this.status = Producer.status;
    this.created_at = new Date();
};

function ProducerModel(){
    Producer.apply(this, arguments);
}
util.inherits(Producer, User);

Producer.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Intervenant JOIN Producteur ON Producteur.IDINT = Intervenant.IDINT", (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

Producer.getOne = (producerId) => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Producteur JOIN Intervenant ON Producteur.IDINT = Intervenant.IDINT Where Producteur.IDINT = ?",producerId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
}

Producer.create = (producer) => {
    let insertId;
    return new Promise((resolve, reject) => {
        con.beginTransaction( (error) => {
            if(error) reject(error);
            // 1ere requète
            con.query(`INSERT INTO Intervenant (NOM,PRENOM, MDP) 
                        VALUES(${con.escape(producer.nom)}, ${con.escape(producer.prenom)}, ${con.escape(producer.mdp)});`,
                 (err, res, fields) => {

                if (err) reject(err);
                console.log(res.insertId);
                insertId = res.insertId; // je récupère l'Id insérer

                //2nde requète
                con.query(`INSERT INTO Producteur 
                            VALUES(${con.escape(insertId)},${con.escape(producer.presentation)}, ${con.escape(producer.coord)}, ${con.escape(producer.tel)}, ${con.escape(producer.mail)});`,
                 (err, result, fields) => {
                     // en cas d'erreur j'annule la transaction et je rejette la promesse
                    if (err) con.rollback(() => {
                        reject(err);
                    });
                    // sinon je commit et insère les données
                    else con.commit((error) => {
                        if (error) con.rollback(() => {
                            reject(error);
                        });
                        else resolve(result.insertId);
                    });       
                });
            }); 
        });
    });
}

Producer.update = (producerId, producer) => {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE Intervenant JOIN Producteur ON Intervenant.IDINT = Producteur.IDINT
        SET NOM = ${con.escape(producer.NOM)},
        PRENOM = ${con.escape(producer.PRENOM)},
        MDP = ${con.escape(producer.MDP)},
        PRESENTATION = ${con.escape(producer.PRESENTATION)},
        COORDONNEES = ${con.escape(producer.COORDONNEES)},
        TELPROD = ${con.escape(producer.TELPROD)},
        MAILPROD = ${con.escape(producer.MAILPROD)}
         where Producteur.IDINT = ? `, producerId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
}

Producer.remove = (producerId) => {
    return new Promise((resolve, reject) => {
        con.query("Delete from Producteur Where IDINT = ?",producerId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
}

module.exports = Producer;




