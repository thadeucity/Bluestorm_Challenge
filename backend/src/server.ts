import express from 'express';
import http from 'http';
import io from 'socket.io';

import {
  getPaintData,
  availablePaintColors,
} from './controllers/CarPaintController';
import getPackageData from './controllers/CarPackageController';
import getWheelData from './controllers/CarWheelController';
import getHeadlightData from './controllers/CarHeadlightController';

const app = express();
const server = http.createServer(app);
const sockets = io(server);

const publicCarConfig = {
  paint: 'blue',
  wheels: 'orcus_silver',
  package: 'standart',
  headlights: 'halogen',
};

let onlineUsersOnPublicRoom = 0;

const publicSockets = sockets.of('/public');
const privateSockets = sockets.of('/private');

privateSockets.on('connection', socket => {
  console.log(`Socket: ${socket.id} connected`);

  socket.emit('receivedImage', getPaintData('blue'));
  socket.emit('availableColors', availablePaintColors);

  socket.on('changePaint', paintName => {
    socket.emit('receivedImage', getPaintData(paintName));
  });

  socket.on('changeWheels', wheelName => {
    socket.emit('receivedImage', getWheelData(wheelName));
  });

  socket.on('changeHeadlight', headlightName => {
    socket.emit('receivedImage', getHeadlightData(headlightName));
  });

  socket.on('changePackage', packageName => {
    socket.emit('receivedImage', getPackageData(packageName));
  });

  socket.on('disconnect', () => {
    console.log(`Socket: ${socket.id} disconnected`);
  });
});

publicSockets.on('connection', socket => {
  console.log(`Socket: ${socket.id} is connected to the public page`);

  socket.emit('receivedImage', getPaintData(publicCarConfig.paint));
  socket.emit('receivedImage', getWheelData(publicCarConfig.wheels));
  socket.emit('receivedImage', getHeadlightData(publicCarConfig.headlights));
  socket.emit('receivedImage', getPackageData(publicCarConfig.package));

  socket.emit('availableColors', availablePaintColors);
  onlineUsersOnPublicRoom += 1;
  publicSockets.emit('connectedUsers', onlineUsersOnPublicRoom);

  socket.on('changePaint', paintName => {
    publicCarConfig.paint = paintName;
    publicSockets.emit('receivedImage', getPaintData(paintName));
  });

  socket.on('changeWheels', wheelName => {
    publicCarConfig.wheels = wheelName;
    publicSockets.emit('receivedImage', getWheelData(wheelName));
  });

  socket.on('changeHeadlight', headlightName => {
    publicCarConfig.headlights = headlightName;
    publicSockets.emit('receivedImage', getHeadlightData(headlightName));
  });

  socket.on('changePackage', packageName => {
    publicCarConfig.package = packageName;
    publicSockets.emit('receivedImage', getPackageData(packageName));
  });

  socket.on('disconnect', () => {
    console.log(`Socket: ${socket.id} disconnected`);
    onlineUsersOnPublicRoom -= 1;
    publicSockets.emit('connectedUsers', onlineUsersOnPublicRoom);
  });
});

server.listen(3332, () => {
  console.log('Chat Server is up and running on port: 3332');
});
