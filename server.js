
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');
const db = require('./model');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const env = require('dotenv')
env.config();


let userRoute = require('./route/user_route');
let messageRoute = require('./route/message_route');
let user_rooms = require('./route/user_rooms_route');
let messageControler = require('./controller/message.controler');







// db.sequelize.sync({ force: false });
app.get('/', (req, res) => res.send('nodejs server started. hello!'));

let selected_room_id;
let connectedUsers = [];

async function addUser(user) {
  let promise = await new Promise((resolve, reject) => {
    if (connectedUsers.length == 0) {
      connectedUsers.push(user)
    } else {
      let indexx = connectedUsers.findIndex((ele, index) => {
        return ele.id == user.id
      });

      if (indexx == -1) {
        connectedUsers.push(user)
      }
    }

    resolve("done")
  })

}

async function removeUser(socketid) {
  await new Promise((resolve, reject) => {
    let indexx = connectedUsers.findIndex((ele, index) => {
      return ele.socketid == socketid
    });

    if (indexx > -1) {
      connectedUsers.splice(indexx, 1)
    }
  })


}

function getSocketId(id) {

  let result = connectedUsers.find((elements) => { return elements.id == id });
  return result;
}

try{
  io.on('connection', (socket) => {
    console.log("A user connected...");
    socket.on('message', (msg) => {
      messageRoute.addMessage(msg);
      if (msg.room_id == 1) {
        io.emit('message-broadcast', msg)
      }
    });
  
    socket.on('typing', (data) => {
      let socketId = getSocketId(data.receiver_id);
      let senderSocket = getSocketId(data.sender_id);
      if (socketId  && senderSocket) {
        socket.to(socketId.socketid).to(senderSocket.socketid).emit('display', data)
      }else {
        socket.to(senderSocket.socketid).emit('display', data)
      }
    })
  
    socket.on('sendMessage', async (msg) => {
      let data = await messageControler.storeMessage(msg);
      let socketId = getSocketId(msg.receiver_id);
      let senderSocket = getSocketId(msg.sender_id);
      if (socketId && senderSocket) {
        io.to(socketId.socketid).to(senderSocket.socketid).emit('personal-Message-broadcast', {
          sender_id: msg.sender_id,
          message: msg.message
        })
      } else {
        io.to(senderSocket.socketid).emit('personal-Message-broadcast', {
          sender_id: msg.sender_id,
          message: msg.message
        })
      }
  
    });
  
    socket.on('login', async (data) => {
      await addUser({
        id: data.id,
        socketid: socket.id
      });
      console.log("Connected users=>", connectedUsers);
      io.emit('connectedUsers', connectedUsers)
    });
    
   
    socket.on('disconnect', () => {
      removeUser(socket.id)
      io.emit('connectedUsers', connectedUsers)
      console.log("dis =>", connectedUsers);
    });
  });

}catch(e){
   
}


let corsOrigin = {
  origin: "*",
}
app.use(cors(corsOrigin));


app.use('/user', userRoute);
app.use('/message', messageRoute.route);
app.use('/user_rooms', user_rooms);

http.listen(process.env.port, () => {
  console.log('listening on *:3000');
});