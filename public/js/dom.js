$(function() {
  var socket = io();
  const submit = document.getElementById("submit");
  const mes = document.getElementById("mes");
  const messageContent = document.getElementById("messageContent");

  const li = document.createElement("li");
  messageContent.addEventListener("keyup", e => {
    if (e.which == 13) {
      socket.emit("chat message", messageContent.value);
      messageContent.value = "";
      return false;
    }
  });

  const send = document.querySelector(".message-send");
  send.addEventListener("click", e => {

    socket.emit("chat message", messageContent.value);
    messageContent.value = "";
    return false;

  });


  socket.on("chat message", function(msg) {
    // const msgBox = document.createElement('div');
    // msgBox.setAttribute('class','message-box');
    // msgBox.textContent = msg;
    // const bigBox = document.querySelector('.message-box-holder');
    // bigBox.appendChild(msgBox);
    const user = document.querySelector(".user");

    const msgBoxHolder = document.querySelector(".message-box-holder");
    const msgSender = document.createElement("div");
    msgSender.setAttribute("class", "message-sender");
    msgBoxHolder.appendChild(msgSender);
    const username = document.createElement("a");
    username.textContent = user.value;
    msgSender.appendChild(username);
    const msgContent = document.createElement("div");
    msgContent.setAttribute("class", "message-box message-partner");
    msgBoxHolder.appendChild(msgContent);
    msgContent.textContent = msg;
  });
});
