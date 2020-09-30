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

module.exports = Producer;




