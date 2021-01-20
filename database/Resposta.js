const Sequelize = require('sequelize');  // sequelize
const connection = require('./database'); // conexão com banco

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false // não pode ser vazio
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false

    }
}, {});


Resposta.sync({ force: false });

module.exports = Resposta;

