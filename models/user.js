const { promises } = require('fs');
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
            console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
};
User.getUserById = (UserId) => {
    return new Promise((resolve, reject) => {
        con.query("Select * from Intervenant where IDINT = ? ", UserId, (err, result, fields) => {
            console.log(result);
            if (err) reject(err);
            else resolve(result);
        });
    });
};
User.createUser = function (newUser, result) {    
    con.query("INSERT INTO Intervenant set ?", newUser, function (err, res) {    
        if(err) {
            console.log("error: ", err);
        }
        else{
            console.log(res.insertId);
            return res.insertId;
        }
    });           
};
User.updateById = function(id, User, result){
    return new Promise((resolve, reject) => {
        con.query("UPDATE Intervenant SET Intervenant = ? where IDINT = ? ", [User, id], (err, result, fields) => {
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

