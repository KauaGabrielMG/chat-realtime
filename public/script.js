const socket = io();
const form = document.getElementById('form');
const nameInput = document.getElementById('name');

const formMessage = document.getElementById('formMessage');
const messageInput = document.getElementById('message');
const messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (nameInput.value) {
    socket.emit('chat message', `${nameInput.value} entrou no chat`);
    sessionStorage.setItem('name', nameInput.value);
    nameInput.value = '';
    form.style.display = 'none';
    formMessage.style.display = 'flex';
  }
});

formMessage.addEventListener('submit', function (e) {
  e.preventDefault();
  if (messageInput.value) {
    const name = sessionStorage.getItem('name');
    socket.emit('chat message', `${name}: ${messageInput.value}`);
    messageInput.value = '';
  }
});

socket.on('chat message', function (msg) {
  const name = sessionStorage.getItem('name');
  const msgName = msg.split(': ')[0];
  const item = document.createElement('li');
  if (name === msgName) {
    item.style.alignSelf = 'flex-end';
  } else {
    item.style.alignSelf = 'flex-start';
  }
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
