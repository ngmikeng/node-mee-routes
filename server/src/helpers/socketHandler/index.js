const socketIO = require('socket.io');
const logger = require('../../../config/winston');

module.exports = {
  init: init
};

function init(app) {
  const io = socketIO(app);
  logger.info('Socket server listening...');
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);
    socket.on('init', (data) => {
      
    });
  });

  return io;
}