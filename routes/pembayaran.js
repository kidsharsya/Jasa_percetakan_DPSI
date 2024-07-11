// routes/pembayaran.js
const express = require('express');
const router = express.Router();
const { Pembayaran } = require('../models');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Create pembayaran
router.post('/', async (req, res) => {
  try {
    const pembayaran = await Pembayaran.create(req.body);
    res.status(201).json({ message: 'Metode Pembayaran created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all pembayaran
router.get('/', async (req, res) => {
  try {
    const pembayaran = await Pembayaran.findAll();
    res.status(200).json(pembayaran);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get pembayaran by ID
router.get('/:id', async (req, res) => {
  try {
    const pembayaran = await Pembayaran.findByPk(req.params.id);
    if (!pembayaran) {
      return res.status(404).json({ message: 'Pembayaran not found' });
    }
    res.status(200).json(pembayaran);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update pembayaran
router.put('/:id', async (req, res) => {
  try {
    const { metode_pembayaran, biaya_layanan } = req.body;
    const [updated] = await Pembayaran.update(
      { metode_pembayaran, biaya_layanan },
      {
        where: { id_pembayaran: req.params.id },
      }
    );

    if (updated) {
      const updatedPembayaran = await Pembayaran.findByPk(req.params.id);
      res.status(200).json({ message: 'Metode Pembayaran updated successfully' });
    } else {
      res.status(404).json({ error: 'Pembayaran not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete pembayaran
router.delete('/:id', async (req, res) => {
  try {
    await Pembayaran.destroy({ where: { id_pembayaran: req.params.id } });
    res.status(200).json({ message: 'Metode Pembayaran deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
