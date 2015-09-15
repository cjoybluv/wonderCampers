module.exports = {

    connections:{
        thisMongoDbServer: {
            adapter: 'sails-mongo',
            host: 'localhost',
            port: 27017,
            database: 'wondercampers_dev'
        }
    },
    models:{
        connection: 'thisMongoDbServer',
        migrate: 'alter'
    }
};

