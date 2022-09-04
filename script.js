const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling", "flashsocket"],
});

const uname = prompt("Enter your Name:");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

socket.on("new-user", (data) => {
  appendMessage(data);
});

socket.on("chat-message", (data) => {
  appendMessage(data);
});
socket.on("user-connected", (data) => {
  userJoined(`${data} joined`);
});
socket.emit("new-user", uname);

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function userJoined(name) {
  const joined = document.createElement("div");
  joined.classList.add("joined");
  joined.innerHTML = name;
  messageContainer.append(joined);
}

function appendMessage(message, e) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = message;
  messageContainer.append(messageDiv);
}
