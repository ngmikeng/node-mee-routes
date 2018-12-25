const socketIO = require('socket.io');
const logger = require('../../../config/winston');

const socketData = {
  drivers: {}
};

module.exports = {
  init: init,
  emitDriverLocationChange: emitDriverLocationChange
};

function init(app) {
  const io = socketIO(app);
  logger.info('Socket server listening...');
  io.on('connection', (socket) => {
    logger.info(`Socket ${socket.id} connected`);
    socket.on('init-driver-info', (data) => {
      socketData.drivers[socket.id] = {};
      socketData.drivers[socket.id].info = data;
      socketData.drivers[socket.id].socket = socket;
    });
    socket.on('disconnect', () => {
      logger.info(`Socket ${socket.id} disconnected`);
      delete socketData.drivers[socket.id];
    });
  });

  return io;
}

function findDriversById(driverId) {
  const result = [];
  for (const key in socketData.drivers) {
    if (socketData.drivers.hasOwnProperty(key)) {
      const obj = socketData.drivers[key];
      if (obj.socket && obj.info && obj.info.id == driverId) {
        result.push(obj);
      }
    }
  }
  return result;
}

function emitDriverLocationChange(driverId, data) {
  const socketDrivers = findDriversById(driverId);

  socketDrivers.forEach((obj) => {
    const eventName = `${driverId}-driver-location-change`;
    obj.socket.emit(eventName, data); // emit event name dynamic with driver id
    logger.info(`Socket emitted ${eventName}; Data = ${JSON.stringify(data)}`);
  });
}
