const express = require('express');
const router = express.Router();
const { Layanan } = require('../models');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken); //Gunakan verifyToken dari middleware auth untuk semua metode HTTP

// Create layanan
router.post('/', async (req, res) => {
  try {
    const layanan = await Layanan.create(req.body);
    res.status(201).json({ message: 'Layanan created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all layanan
router.get('/', async (req, res) => {
  try {
    const layanan = await Layanan.findAll();
    res.status(200).json(layanan);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get layanan by ID
router.get('/:id', async (req, res) => {
  try {
    const layanan = await Layanan.findByPk(req.params.id);
    if (!layanan) {
      return res.status(404).json({ message: 'Layanan not found' });
    }
    res.status(200).json(layanan);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update layanan
router.put('/:id', async (req, res) => {
  try {
    const { nama_layanan, poster_layanan, deskripsi, harga } = req.body;
    const [updated] = await Layanan.update(
      { nama_layanan, poster_layanan, deskripsi, harga },
      {
        where: { id_layanan: req.params.id },
      }
    );

    if (updated) {
      const updatedLayanan = await Layanan.findByPk(req.params.id);
      res.status(200).json({ message: 'Layanan updated successfully' });
    } else {
      res.status(404).json({ error: 'Layanan not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete layanan
router.delete('/:id', async (req, res) => {
  try {
    await Layanan.destroy({ where: { id_layanan: req.params.id } });
    res.status(200).json({ message: 'Layanan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
