const express = require('express');
const authController = require('../../controllers/admin/auth.controller');

const router = express.Router();

router.get('/', authController.logout);

module.exports = router;
