const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      // Check if the user already has a password set
      if (user.password_hash) {
        return res.status(409).json({ message: "User already exists with a password. Please log in." });
      }

      // If user exists but has no password, update with new password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password_hash = hashedPassword;
      user.full_name = name || user.full_name; // Update name if provided
      user.role = role || user.role; // Keep existing role if not provided
      await user.save();

      // Generate token
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

      return res.status(200).json({
        message: "Password set successfully. You can now log in.",
        user: {
          id: user.id,
          email: user.email,
          name: user.full_name,
          role: user.role,
          token: token,
          profile_picture: user.profile_picture,
        },
      });
    }

    // If user does not exist, create a new one
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ email, password_hash: hashedPassword, full_name: name, role });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        token: token,
        profile_picture: user.profile_picture,
        resume_file: user.resume_file,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is null (user was created from another form)
    if (!user.password_hash) {
      return res.status(403).json({
        message: "Account found, but no password is set. Please complete registration.",
        status: "no_password",
      });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 365 } // 1 year in seconds
    );

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        token: token,
        profile_picture: user.profile_picture,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};


exports.getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: [
        "id",
        "email",
        "full_name",
        "role",
        "profile_picture",
        "bio",
        "country",
        "years_of_experience",
        "expected_salary",
        "job_type_preference",
        "subscribed",
        "is_featured",
        "plan_id",
      ],
      include: [
        {
          model: require("../models/jobTitles"),
          as: "job_title",
          attributes: ["id", "title"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};
