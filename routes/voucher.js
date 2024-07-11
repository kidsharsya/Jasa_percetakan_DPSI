const express = require('express');
const router = express.Router();
const { Voucher } = require('../models');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Create voucher
router.post('/', async (req, res) => {
  try {
    const voucher = await Voucher.create(req.body);
    res.status(201).json({ message: 'Voucher created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all vouchers
router.get('/', async (req, res) => {
  try {
    const vouchers = await Voucher.findAll();
    res.status(200).json(vouchers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get voucher by ID
router.get('/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findByPk(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    res.status(200).json(voucher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update voucher
router.put('/:id', async (req, res) => {
  try {
    const { nama_voucher, nilai_voucher, status, minimal_pesanan } = req.body;
    const [updated] = await Voucher.update(
      { nama_voucher, nilai_voucher, status, minimal_pesanan },
      {
        where: { id_voucher: req.params.id },
      }
    );

    if (updated) {
      const updatedVoucher = await Voucher.findByPk(req.params.id);
      res.status(200).json({ message: 'Voucher updated successfully' });
    } else {
      res.status(404).json({ error: 'Voucher not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete voucher
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Voucher.destroy({ where: { id_voucher: id } });
    if (deleted) {
      res.status(200).json({ message: 'Voucher deleted successfully' });
    } else {
      res.status(404).json({ message: 'Voucher not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
