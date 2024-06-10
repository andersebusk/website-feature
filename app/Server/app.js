const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const User = require('./Models/User'); // Import the User model

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting server...'); // Log statement

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors());
app.use(bodyParser.json());

app.post('/api/users/register', async (req, res) => {
  try {
    const { company, email, phone, country } = req.body;
    console.log('Received data:', { company, email, phone, country });

    if (!company || !email || !phone || !country) {
      console.error('Validation error: missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = new User({ company, email, phone, country });
    const savedUser = await newUser.save();
    console.log('User registered:', savedUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log statement
});
