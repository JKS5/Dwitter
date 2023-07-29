import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });
  }
}

//뒤에 여러개의 옵션을 보내줄 수 있음.
const socketIO = new Server(server, { cors: { origin: '*' } });

//on이라는 connection을 했다면 Listen해서 뒤 callback으로  Client에 전해주기
socketIO.on('connection', (socket) => {
  console.log('Client is here!');
  //event base이기 때문에 emit 해서 Client에 보내주기
  socketIO.emit('dwitter', 'Hello! message');
});

setInterval(() => {
  socketIO.emit('dwitter', 'setInterval Message');
}, 1000);
// socketIO.on('dwitter', (msg) => console.log(msg));
