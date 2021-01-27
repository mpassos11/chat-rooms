const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

if (messageForm != null) {
    const name = prompt('What is your name?');
    appendMessage('You joined', 'info');
    socket.emit('new-user', roomName, name);

    messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageInput.value;
        appendMessage(`${message}`, 'me-message');
        socket.emit('send-chat-message', roomName, message);
        messageInput.value = '';
    });
}

socket.on('room-created', room => {
    const roomElement = document.createElement('div');
    roomElement.innerText = room;
    const roomLink = document.createElement('a');
    roomLink.href = `/${room}`;
    roomLink.innerText = 'join';
    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});

socket.on('chat-message', data => {
    let type = 'other-message';
    if (data.name == 'You') type = 'me-message';
    appendMessage(`${data.message}`, type);
});

socket.on('user-connected', name => {
    let type = 'info';
    appendMessage(`${name} connected`, type);
});

socket.on('user-disconnected', name => {
    let type = 'info';
    appendMessage(`${name} disconnected`, info);
});

function appendMessage(message, type) {
    console.log(type);
    if (type == 'info') {
        messageContainer.innerHTML += ('<div>' + message + '</div>');
    }

    if (type == 'me-message') {
        messageContainer.innerHTML += ('<div class="row"><div class="col text-right my-1"><div class="box-right sb1">' + message + '</div></div></div>');
    }

    if (type == 'other-message') {
        messageContainer.innerHTML += ('<div class="row"><div class="col text-left my-1"><div class="box-left sb2">' + message + '</div></div></div>');
    }
}