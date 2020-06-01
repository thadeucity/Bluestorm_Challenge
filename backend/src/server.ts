import express from 'express';
import http from 'http';
import io from 'socket.io';
import path from 'path';

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

function changePackage(packageName: string): string {
  return path.resolve(__dirname, 'assets', 'pack', `${packageName}.png`);
}

app.use(express.json());

sockets.on('connection', socket => {
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

server.listen(3332, () => {
  console.log('Chat Server is up and running on port: 3332');
});
