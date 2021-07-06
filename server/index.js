const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const router = require("./router");
const app = express();
const {getUser,removeUser,addUser,getUsersInRoom } = require('./users')

const server = http.createServer(app);
const port = 8080;
app.use(cors());
app.use(router);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  //socket is client instance
  console.log("we have a new connection");
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name},welcome to room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name},has joined` });
       io.to(user.room).emit("roomData", { room: user.room, users:getUsersInRoom(user.room) });

    socket.join(user.room);
    callback();
  });

  socket.on('sendmessage', (message,callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit("roomData", { room: user.room, users:getUsersInRoom(user.room) });

    
    callback();
  })

  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', {user:'admin',text:`${user.name} had left`})
    }
  });
});



app.use(function (req, res, next) {
  res.json({
    msg: "page not found",
    status: 404,
  });
});

server.listen(process.env.PORT || port, (err, done) => {
  if (err) {
    console.log("error loading to server");
  } else {
    console.log(`server listening at port ${port}`);
  }
});
