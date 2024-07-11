const express = require('express');
const path = require('path');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.use('/users', require('./user'));
router.use('/layanan', verifyToken, require('./layanan'));
router.use('/voucher', verifyToken, require('./voucher'));
router.use('/customers', verifyToken, require('./customer'));
router.use('/pesanan', verifyToken, require('./pesanan'));
router.use('/detailpesanan', verifyToken, require('./detailpesanan'));
router.use('/jasakirim', verifyToken, require('./jasakirim'));
router.use('/pembayaran', verifyToken, require('./pembayaran'));

module.exports = router;
