const Producer = require('../models/producers');

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