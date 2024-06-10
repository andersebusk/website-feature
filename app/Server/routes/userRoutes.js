const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.post('/register', async (req, res) => {
  const { company, email, phone, country } = req.body;

  try {
    const newUser = new User({ company, email, phone, country });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

module.exports = router;
