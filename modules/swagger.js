const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0', 
        info: {
            title: 'NewsShell API',
            version: '1.0.0',
            description: 'NewsShell API with express',
        },
        //host: 'localhost:3000',
        host: "127.0.0.1:" + (process.env.PORT || 3000),
        schemes: [
            "https"
        ],
        basePath: '/'
    },
    apis: ['./routes/*.js', './swagger/*']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};