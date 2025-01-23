const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

app.get('/show/:number/:status', (req, res) => {
    const plateNumber = req.params.number;
    const status = req.params.status; // 0: xanh, 1: đỏ
    
    io.emit('showPlate', {
        number: plateNumber,
        status: status
    });
    
    setTimeout(() => {
        io.emit('hidePlate');
    }, 3000);
    
    res.json({ success: true });
});

http.listen(3000, () => {
    console.log('Server running on port 3000');
});
