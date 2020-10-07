const MiseVente = require('../models/mise_vente');

exports.getByProducer = (req, res) => {
    MiseVente.getByProducer(req.params.id).then(ventes => {
        res.send(JSON.stringify(ventes));
    });
}

exports.getBySemaine = (req, res) => {

}

exports.addProduct = (req, res) => {
    MiseVente.addProduct(req.params.productId, req.query.semaine, req.body.quantite).then(result => {
        res.send(JSON.stringify(result));
    });
}

exports.remove = (req, res) => {
    MiseVente.removeOne(req.params.productId, req.query.semaine).then(result => {
        res.send(JSON.stringify(result));
    });
}