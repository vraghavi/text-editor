const server = require('./src/index');

module.exports.universal = (event, context) => awsServerlessExpress.proxy(server, event, context);