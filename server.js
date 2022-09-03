const io = require("socket.io")(3000);
io.on("connection", (socket) => {
  console.log("NEW USET");
  socket.emit("chat-message", "Hello");
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit('chat-message',message)
  });
});
