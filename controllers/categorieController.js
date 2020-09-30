const Categorie = require('../models/categorie');

exports.getAll = (req,res) => {
    Categorie.getCategories().then( (categories) => {
        res.send(JSON.stringify(categories));
    });
}
exports.getOneById = (req,res) => {
    Categorie.getOne(req.params.id).then(categorie => {
        res.send(JSON.stringify(categorie));
    });
}
exports.addCategorie = async (req,res) => {
    Categorie.createCategorie(req.body.libelleCat).then( insertId => {
        res.send(JSON.stringify(`InsertId : ${insertId}`));
    });  
}
exports.remove = (req,res) => {
    Categorie.remove(req.params.id).then((result) => {
        res.send(JSON.stringify(result));
    });
}