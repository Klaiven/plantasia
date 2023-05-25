const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let Planta = new Schema({
    nome: {
        type: String
    },
    especie:{
        type: String
    },
    regiao: {
        type: String
    },
    descricao: {
        type: String
    }
}, {
    collection: 'planta'
});

module.exports = mongoose.model('planta', Planta);