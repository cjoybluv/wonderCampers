module.exports = {

    connections:{
        myMongoDbServerProd: {
            adapter: 'sails-mongo',
            url: process.env.MONGOLAB_URI
        }
    },

    models:{
        connection: 'myMongoDbServerProd'
    }
};