const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false

    }
}, {});



Pergunta.sync({ force: false }).then(() => {
    console.log('Tabela criada com sucesso!');
}).catch(error => {
    console.log(error);
})

