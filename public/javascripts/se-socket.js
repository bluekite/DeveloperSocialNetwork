var socket = io.connect('http://192.168.1.109:7777');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});