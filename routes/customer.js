const express = require('express');
const router = express.Router();
const { Customer, Pesanan, DetailPesanan } = require('../models');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Create customer
router.post('/', async (req, res) => {
  try {
    const { id_user, nama_customer, no_telpon, alamat, email } = req.body;
    const customer = await Customer.create({
      id_user,
      nama_customer,
      no_telpon,
      alamat,
      email,
    });
    res.status(201).json({ message: 'Customer add succesfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        {
          model: Pesanan,
          as: 'pesanan',
          include: [{ model: DetailPesanan, as: 'detailPesanan' }],
        },
      ],
    });
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        {
          model: Pesanan,
          as: 'pesanan',
          include: [{ model: DetailPesanan, as: 'detailPesanan' }],
        },
      ],
    });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update customer
router.put('/:id', async (req, res) => {
  try {
    const { nama_customer, no_telpon, alamat, email } = req.body;
    const [updated] = await Customer.update(
      { nama_customer, no_telpon, alamat, email },
      {
        where: { id_customer: req.params.id },
      }
    );

    if (updated) {
      const updatedCustomer = await Customer.findByPk(req.params.id);
      res.status(200).json({ message: 'Customer updated succesfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete customer
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Customer.destroy({ where: { id_customer: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
