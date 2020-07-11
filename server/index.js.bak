const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const Message = require('./Message');
const mongoose = require('mongoose');

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

io.on('connection', (socket) => {

    console.log("in connection");
    // Get the last 10 messages from the database.
    Message.find().sort({ createdAt: -1 }).limit(10).exec((err, messages) => {
        if (err) return console.error(err);

        // Send the last messages to the user.
        socket.emit('init', messages);
    });

    // Listen to connected users for a new message.
    socket.on('message', (msg) => {
        // Create a message with the content and the name of the user.
        const message = new Message({
            content: msg.content,
            name: msg.name,
        });

        // Save the message to the database.
        message.save((err) => {
            if (err) return console.error(err);
        });

        // Notify all other users about a new message.
        socket.broadcast.emit('push', msg);
        //io.emit('message', msg);

        console.log("hu hu");
    });

    socket.on('disconnect', function(){ });
});

http.listen(port, () => {
    console.log('listening on *:' + port);
});