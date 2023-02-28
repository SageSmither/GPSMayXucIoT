const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'djqe3fdeq',
  api_key: '328313576248613',
  api_secret: 'eQ3eps1aagYVc44R0TDbKQkngXM',
  secure: true,
});

module.exports = cloudinary;