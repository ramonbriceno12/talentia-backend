const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {

  const { email, password, name, role } = req.body;

  try {

    let user = await User.findOne({ where: { email } });
    if (user) return res.status(409).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ email, password_hash: hashedPassword, full_name: name, role });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        token: token,
        profile_picture: user.profile_picture,
        resume_file: user.resume_file
      } 
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ 
      message: 'User logged successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        token: token,
        profile_picture: user.profile_picture,
        resume_file: user.resume_file
      } 
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error logging in' });
  }
};