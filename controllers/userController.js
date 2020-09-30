const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
    
exports.getUsers = async (req,res) => {
    User.getAll().then((users) => {
        // console.log(users);
        res.send(JSON.stringify(users));
    });
}

exports.getUser = async (req, res) => {
    User.getUserById(req.params.id).then((user) => {
        res.send(JSON.stringify(user));
    });
}

exports.addUser = async function(req, res){
    let newUser;
    getMdpHash(req.body.mdp).then(async (mdp) => {
        // console.log(mdp);
        newUser = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            mdp:mdp
        }
        let insertId = await User.createUser(newUser);
        res.send("InsertId : " + insertId);
    });
}

exports.updateUser = async function(req, res){
    User.getUserById(req.params.id).then(async (user) => {
        console.log(req.body);
        if(req.body.prenom) user.PRENOM = req.body.prenom;
        if(req.body.nom) user.NOM = req.body.nom;
        if(req.body.mdp) await getMdpHash(req.body.mdp).then(mdp => user.MDP = mdp);
        console.log(user);
        User.updateById(req.params.id, user).then((result) => {
            res.send(result);
        });
    });
}

exports.removeUser = async function(req,res){
    User.remove(req.params.id).then((result) => {
        res.send(result);
    })
}

async function getMdpHash(plainedPassword){
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainedPassword, saltRounds, function(err, hash) {
            if (err) reject(err);
            else resolve(hash);
        });
    });
}
