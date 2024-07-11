// routes/detailpesanan.js
const express = require('express');
const router = express.Router();
const { DetailPesanan, Pesanan } = require('../models');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Create detail pesanan
router.post('/', async (req, res) => {
  try {
    const detailPesanan = await DetailPesanan.create(req.body);
    res.status(201).json({ message: 'Detail pesanan created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all detail pesanan
router.get('/', async (req, res) => {
  try {
    const detailPesanan = await DetailPesanan.findAll({
      include: [{ model: Pesanan, as: 'pesanan' }],
    });
    res.status(200).json(detailPesanan);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get detail pesanan by ID
router.get('/:id', async (req, res) => {
  try {
    const detailPesanan = await DetailPesanan.findByPk(req.params.id, {
      include: [{ model: Pesanan, as: 'pesanan' }],
    });
    if (!detailPesanan) {
      return res.status(404).json({ message: 'Detail Pesanan not found' });
    }
    res.status(200).json(detailPesanan);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update detail pesanan
router.put('/:id', async (req, res) => {
  try {
    const { file_cetak, alamat_pengiriman, biaya_pengiriman, jumlah_cetak, catatan } = req.body;
    const [updated] = await DetailPesanan.update(
      { file_cetak, alamat_pengiriman, biaya_pengiriman, jumlah_cetak, catatan },
      {
        where: { id_detailpesanan: req.params.id },
      }
    );

    if (updated) {
      const updatedDetailPesanan = await DetailPesanan.findByPk(req.params.id);
      res.status(200).json({ message: 'Detail pesanan updated successfully' });
    } else {
      res.status(404).json({ error: 'Detail pesanan not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete detail pesanan
router.delete('/:id', async (req, res) => {
  try {
    await DetailPesanan.destroy({ where: { id_detailpesanan: req.params.id } });
    res.status(200).json({ message: 'Detail Pesanan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
