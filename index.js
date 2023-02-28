const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const connectDB = require('./configs/database');
const router = require('./routers');

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET, POST, PATCH, DELETE',
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'uploads')));

connectDB();
router(app);

server.listen(3000, () => {
  console.log('run 3000');
});