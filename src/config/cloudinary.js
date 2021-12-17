const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'pu',
  api_key: '184645515918475',
  api_secret: 'yleO1tbnCBAkcYOPZXSFd15t-H4',
});

module.exports = cloudinary;
