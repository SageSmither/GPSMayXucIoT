module.exports = {
  SALT_ROUND: +10,
  SECRET_KEY: 'fdafeojjfsdjurururskd',
  // DB_URL: 'mongodb://127.0.0.1:27017/GPSMayXucIoT',
  DB_URL:
    process.env.MONGODB_URI ||
    'mongodb+srv://root:123@cluster0.70cd3.mongodb.net/GPSMayXucIoT?retryWrites=true&w=majority',
  USER_ADMIN: {
    username: 'thongminh',
    password: 'thongminh123@',
    phone: '0966567778',
    address: 'Ha Noi',
    role: 'admin',
  },
};
