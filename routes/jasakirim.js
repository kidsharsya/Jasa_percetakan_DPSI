// routes/jasakirim.js
const express = require('express');
const router = express.Router();
const { JasaKirim } = require('../models');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Create jasa kirim
router.post('/', async (req, res) => {
  try {
    const jasaKirim = await JasaKirim.create(req.body);
    res.status(201).json({ message: 'Jasa kirim created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all jasa kirim
router.get('/', async (req, res) => {
  try {
    const jasaKirim = await JasaKirim.findAll();
    res.status(200).json(jasaKirim);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get jasa kirim by ID
router.get('/:id', async (req, res) => {
  try {
    const jasaKirim = await JasaKirim.findByPk(req.params.id);
    if (!jasaKirim) {
      return res.status(404).json({ message: 'Jasa Kirim not found' });
    }
    res.status(200).json(jasaKirim);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update jasa kirim
router.put('/:id', async (req, res) => {
  try {
    const { nama_jasakirim, jenis_pengiriman, biaya_ongkir } = req.body;
    const [updated] = await JasaKirim.update(
      { nama_jasakirim, jenis_pengiriman, biaya_ongkir },
      {
        where: { id_jasakirim: req.params.id },
      }
    );

    if (updated) {
      const updatedJasaKirim = await JasaKirim.findByPk(req.params.id);
      res.status(200).json({ message: 'Jasa kirim updated successfully' });
    } else {
      res.status(404).json({ error: 'Jasa kirim not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete jasa kirim
router.delete('/:id', async (req, res) => {
  try {
    await JasaKirim.destroy({ where: { id_jasakirim: req.params.id } });
    res.status(200).json({ message: 'Jasa Kirim deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
