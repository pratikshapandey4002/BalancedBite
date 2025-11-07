import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

//register user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- FIX #1: Correct validation logic ---
    if (!email || !password) {
      // Added 'return'
      return res.status(400).json({ msg: 'please enter all fields' });
    }

    // --- FIX #2: Added 'return' ---
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
    }

    // --- FIX #3: Typo (toLowerCase) ---
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      // --- FIX #4: Typo (toLowerCase) ---
      email: email.toLowerCase(),
      passwordHash: passwordHash
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- FIX #5: Typo (toLowerCase) ---
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' }); // Added 'return'
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' }); // Added 'return'
    }

    const payload = {
      user: {
        id: user._id
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      msg: 'Logged in successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;