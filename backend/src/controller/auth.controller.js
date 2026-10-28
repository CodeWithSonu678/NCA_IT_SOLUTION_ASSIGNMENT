const userModel = require('../models/auth.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function regUser(req, res) {
  const { username, email,mobile, password } = req.body;

  // validation

  if (!username || !email ||!mobile || !password) {
    return res.status(400).json({
      message : "All fields are required !",
      success: false,
    });
  }

  try {
    const isAlreadyReg = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyReg) {
      return res.status(409).json({
        message: "You are already registered !",
        success: false,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    //save user data
    const user = await userModel.create({
      username,
      email,
      mobile,
      password: hash,
    });

    // create jwt token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // HTTPS ke liye
      sameSite: "none", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      massage: "Registration successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);

    res.status(401).json({
      message : "Unauthorized Access denied!",
      success: false,
    });
  }
}

module.exports = regUser