const express = require('express');
// const fs = require('fs');
// upload file to cloudinary
const cloudinary = require('cloudinary').v2;
const auth = require('../../middlewares/admin/auth');

const router = express.Router();

cloudinary.config({
  cloud_name: 'pu',
  api_key: 184645515918475,
  api_secret: 'yleO1tbnCBAkcYOPZXSFd15t-H4',
});

router.route('/').post(auth('manageProduct'), async (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src *; script-src *; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
  );

  const listFile = Object.values(req.files);

  const multiplePicturePromise = listFile.map((picture) =>
    cloudinary.uploader.upload(picture.tempFilePath, {
      file: picture.tempFilePath,
      upload_preset: 'svmn_preset',
    })
  );

  const imageResponses = await Promise.all(multiplePicturePromise);
  console.log(imageResponses);

  res.send(imageResponses);
});

module.exports = router;
