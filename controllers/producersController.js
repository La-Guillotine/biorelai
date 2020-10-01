const Producer = require('../models/producers');
const Product = require('../models/products');
const User = require('../models/user');
const userController = require('./userController');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getProducers = async (req,res) => {
    Producer.getAll().then((producers) => {
        // console.log(Producers);
        res.send(JSON.stringify(producers));
    });
}

exports.getProducer = async (req, res) => {
    Producer.getOne(req.params.id).then((producer) => {
        res.send(JSON.stringify(producer));
    });
}

exports.createProducer = async (req,res) => {
    let newProducer;
    userController.getMdpHash(req.body.mdp).then(async (mdp) => {
        // console.log(mdp);
        newProducer = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            mdp:mdp,
            presentation: req.body.presentation,
            coord: req.body.coordonnees,
            tel: req.body.tel,
            mail: req.body.mail
        }
        Producer.create(newProducer).then(insertId => {
            res.send("InsertId : " + insertId);
        });
    });
}

exports.updateProducer = async (req, res) => {
    Producer.getOne(req.params.id).then(async (producer) => {
        //console.log(req.body);
        if(req.body.prenom) producer.PRENOM = req.body.prenom;
        if(req.body.nom) producer.NOM = req.body.nom;
        if(req.body.mdp) await userController.getMdpHash(req.body.mdp).then(mdp => producer.MDP = mdp);
        if(req.body.presentation) producer.PRESENTATION = req.body.presentation;
        if(req.body.coordonnees) producer.COORDONNEES = req.body.coordonnees;
        if(req.body.tel) producer.TELPROD = req.body.tel;
        if(req.body.mail) producer.MAILPROD = req.body.mail;
        console.log(producer);

        Producer.update(req.params.id, producer).then((result) => {
            res.send(JSON.stringify(result));
        });
    });
}

exports.removeProducer = async (req,res) => {
    Producer.remove(req.params.id).then( () => {
        User.remove(req.params.id).then( result => {
            res.send(JSON.stringify(result));
        });
    });
}