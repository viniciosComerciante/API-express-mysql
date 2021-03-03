const Sequelize = require('sequelize');
const connection = require('./database.js');

const Filmes = connection.define('filmes', {

    title:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    duration:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },

    year:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }

})




module.exports = Filmes;