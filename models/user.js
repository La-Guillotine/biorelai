const con = require('./db.js');

//User object constructor
let User = function(data){
    this.user = data;
    this.status = User.status;
    this.created_at = new Date();
};

User.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Intervenant", (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
};
User.getUserById = (UserId) => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Intervenant where IDINT = ? ", UserId, (err, result, fields) => {
            // console.log(result);
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};
User.createUser = function (newUser) {    
    con.query("INSERT INTO Intervenant VALUES (NULL, ?, ?, ?)", [newUser.nom, newUser.prenom, newUser.mdp], function (err, res) {    
        if(err) {
            console.log("error: ", err);
        }
        else{
            console.log("InsertId : " + res.insertId);
            return res.insertId;
        }
    });           
};
User.updateById = function(id, user){
    return new Promise((resolve, reject) => {
        con.query(`UPDATE Intervenant 
        SET NOM = ${con.escape(user.NOM)},
        PRENOM = ${con.escape(user.PRENOM)},
        MDP = ${con.escape(user.MDP)}
         where IDINT = ? `, id, (err, result, fields) => {
            console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
};
User.remove = function(UserId){
    return new Promise((resolve, reject) => {
        con.query("DELETE FROM Intervenant where IDINT = ? ", UserId, (err, result, fields) => {
            console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports= User;

