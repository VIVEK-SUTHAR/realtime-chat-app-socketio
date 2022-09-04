const io = require("socket.io")(3000);
const users={}
io.on("connection", (socket) => {
  console.log("NEW USET");
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected',name)
  })
  socket.emit("chat-message", "Hello");
    socket.on("send-chat-message", (message) => {
      console.log(message);
    socket.broadcast.emit('chat-message',message)
  });
});
