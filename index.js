const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const configuration = require('./configs/configuration');
const connectDB = require('./configs/database');
const router = require('./routers');

const getCookie = require('./helpers/get.cookie');
const ErrorResponse = require('./helpers/ErrorResponse');

const accountModel = require('./models/account.model');
const exModel = require('./models/Excavator.model');
const hisModel = require('./models/activity.history.model');

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET, POST, PATCH, DELETE',
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

try {
  io.on('connection', async function (client) {
    console.log('SVlog: client connected...');
    // const token = getCookie('token', client.handshake.headers.cookie);

    // const decode = jwt.decode(token, configuration.SECRET_KEY);
    // const account = await accountModel.findById(decode?._id);
    // if (!account) {
    //   console.log('NOT FOUND ACCOUNT');
    // } else {
    //   let room = account._id;
    //   client.join(room);
    //   console.log('join room: ', room);

    client.on('status', async function (data) {
      const idEx = data.split(';')[0];
      const status = data.split(';')[1];
      const excavator = await exModel.findById(idEx);
      if (excavator) {
        let time = (
          Math.round(
            new Date().getTime() - new Date(excavator.updatedAt).getTime(),
          ) /
          (1000 * 60 * 60)
        ).toFixed(2);
        let bodyHis = {
          idEx: idEx,
        };
        if (Number(status) === 0 && excavator.status === 1) {
          bodyHis.status = 0;
          bodyHis.time_worker = time;
        } else {
          bodyHis.status = 1;
          bodyHis.time_off = time;
        }
        await Promise.all([
          hisModel.create(bodyHis),
          exModel.findByIdAndUpdate(idEx, { status: Number(status) }),
        ]);
        console.log('status: ', data);
        io.emit('status', data);
      } else {
        console.log('not found ex');
      }
    });
    // }?\
  });
} catch (error) {
  console.log(error.message);
}

connectDB();
router(app);

server.listen(5000, () => {
  console.log('run 5000');
});
