const express = require('express');
const router = express.Router();
const { Pesanan, Customer, Layanan, DetailPesanan, Voucher } = require('../models');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Create pesanan
router.post('/', async (req, res) => {
  try {
    const pesanan = await Pesanan.create(req.body);
    res.status(201).json({ message: 'Pesanan created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all pesanan
router.get('/', async (req, res) => {
  try {
    const pesanan = await Pesanan.findAll({
      include: [
        { model: Customer, as: 'customer' },
        { model: Layanan, as: 'layanan' },
        { model: DetailPesanan, as: 'detailPesanan' },
        { model: Voucher, as: 'voucher' }, // Menyertakan informasi voucher
      ],
    });
    res.status(200).json(pesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get pesanan by ID
router.get('/:id', async (req, res) => {
  try {
    const pesanan = await Pesanan.findByPk(req.params.id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: Layanan, as: 'layanan' },
        { model: DetailPesanan, as: 'detailPesanan' },
        { model: Voucher, as: 'voucher' }, // Menyertakan informasi voucher
      ],
    });
    if (!pesanan) {
      return res.status(404).json({ message: 'Pesanan not found' });
    }
    res.status(200).json(pesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update pesanan
router.put('/:id', async (req, res) => {
  try {
    const { id_customer, id_layanan, id_voucher, id_pembayaran, id_jasakirim, harga_order, metode_pembayaran } = req.body;

    const [updated] = await Pesanan.update(
      {
        id_customer,
        id_layanan,
        id_voucher,
        id_pembayaran,
        id_jasakirim,
        harga_order,
        metode_pembayaran,
      },
      {
        where: { id_pesanan: req.params.id },
      }
    );

    if (updated) {
      const updatedPesanan = await Pesanan.findByPk(req.params.id, {
        include: [
          { model: Customer, as: 'customer' },
          { model: Layanan, as: 'layanan' },
          { model: DetailPesanan, as: 'detailPesanan' },
          { model: Voucher, as: 'voucher' }, // Menyertakan informasi voucher
        ],
      });
      res.status(200).json({ message: 'Pesanan updated successfully' });
    } else {
      res.status(404).json({ error: 'Pesanan not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete pesanan
router.delete('/:id', async (req, res) => {
  try {
    await Pesanan.destroy({ where: { id_pesanan: req.params.id } });
    res.status(200).json({ message: 'Pesanan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
