const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling", "flashsocket"],
});
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
socket.on("chat-message", (data) => {
  appendMessage(data)
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});
function appendMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;
    messageContainer.append(messageDiv)
}