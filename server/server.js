const config = require('./config/config');
const app = require('./config/app');
const winstonLogger = require('./config/winston');
const socketHandler = require('./src/helpers/socketHandler');
const http = require('http');
const server = http.createServer(app);

// Server is listening on port {config.port}
server.listen(config.port, () => {
  winstonLogger.info(`Server started on port ${config.port} (${config.env})`);
  // Init socket.io
  socketHandler.init(server);
});


module.exports = server;