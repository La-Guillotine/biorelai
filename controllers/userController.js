const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
    
exports.getUsers = async (req,res) => {
    User.getAll().then((users) => {
        console.log(users);
        res.send(JSON.stringify(users));
    });
}

exports.getUser = async (req, res) => {
    User.getUserById(req.params.id).then((user) => {
        res.send(JSON.stringify(user));
    });
}

exports.addUser = async function(req, res){
    let mdpHash = bcrypt.hash(req.body.mdp, saltRounds, function(err, hash) {
        if(err){
            console.error(err);
        }
        else{
            return hash;
        }
    });
    console.log(mdpHash);
    let newUser = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mdp:mdpHash
    }
    let insertId = await user.createUser(newUser);
    console.log(insertId);
}

exports.updateUser = async function(user){

}

exports.removeUser = async function(id){
    
}
