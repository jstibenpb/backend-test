const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');
const schemes = require('../models/mongoose');

module.exports.signUp = async (res, parameters) => {
  const {
    password,
    passwordConfirmation,
    email,
    username,
    name,
    lastName,
  } = parameters;

  if (password === passwordConfirmation) {
    const newUser = schemes.User({
      password: Bcrypt.hashSync(password, 10),
      email,
      username,
      name,
      lastName,
    });

    try {
      const savedUser = await newUser.save();

      const token = jwt.sign(
        { email, id: savedUser.id, username },
        config.API_KEY_JWT,
        { expiresIn: config.TOKEN_EXPIRES_IN }
      );

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  return res.status(400).json({
    status: 400,
    message: 'Passwords are different, try again!!!',
  });
};

module.exports.logIn = async (res, parameters) => {
  const { password, username } = parameters;
  try {
    const userRecord = await schemes.User.findOne({ username });
    if (userRecord) {
      if (Bcrypt.compareSync(password, userRecord.password)) {
        const token = jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { email: userRecord.email, id: userRecord._id, username },
          config.API_KEY_JWT,
          { expiresIn: config.TOKEN_EXPIRES_IN }
        );
        return res.status(200).json({ token });
      }
    }

    return res.status(401).json({
      status: 401,
      message: 'username or password are not valid',
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};
