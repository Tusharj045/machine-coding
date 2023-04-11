const Postgres = require('../services/Postgres');

// Controller functions
exports.test = async (req, res) => {
    await Postgres.checkConnection();
    res.send('Server ios running');
};

exports.getItems = async (req, res) => {
    try {
        const result = await Postgres.getAllItems();
        res.status(200).send({result});
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
};

exports.getItemById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Postgres.getItemById(id);
        res.status(200).send({result});
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
    
};

exports.addNewItem = async (req, res) => {
    let {name} = req.body;
    try {
        const result = await Postgres.addNewItem(name);
        res.status(200).send({message: result + ' New Item added ' + name});
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
    
};

exports.updateItem = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const result = await Postgres.updateItem(id, name);
        if (result === 0) {
            res.status(200).send({message: 'No Item exists with item id: '+ id});
        }
        res.status(200).send({message: result + ' Item updated ' + name});
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
};

exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Postgres.deleteItem(id);
        if (result === 0) {
            res.status(200).send({message: 'No Item exists with item id: '+ id});
        }
        res.status(200).send({message: result + ' Item Deleted with id: ' + id});
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
};

