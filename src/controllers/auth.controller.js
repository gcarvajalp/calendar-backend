import { json } from 'express';
import User from '../models/User';
import { createToken } from '../helpers/jwt';

export const authLogin = async (req, res) => {

  const { email, password } = req.body;

  try {

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(400).json({
        message: 'Params not registered'
      });
    }

    if (! await User.isValidPassword(password, findUser.password)) {
      return res.status(400).json({
        message: 'Params not conicidence'
      })
    }

    const token = createToken(findUser._id, findUser.name);

    return res.json({
      message: 'auth login',
      name: findUser.name,
      uid: findUser._id,
      token
    });


  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error, favor contactese con admin'
    })
  }


};

export const authLogout = (req, res) => {
  return res.json({
    message: 'auth logout'
  })
};

export const authRegister = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    //buscar usuario duplicado
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({
        message: 'Usuario con email ingresado anteriormente'
      });
    }

    //crear y almacenar nuevo usuario
    const savedUser = User({
      name,
      email,
      password: await User.encryptPassword(password)
    });

    await savedUser.save();

    //crear JWT
    const token = createToken(savedUser._id, name);

    return res.status(201).json({
      message: 'auth register',
      uid: savedUser._id,
      name,
      token
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error, favor contactese con admin'
    });
  }
};

export const authRenew = (req, res) => {

  try {

    const { uid, name } = req;
    const token = createToken(uid, name);

    return res.json({
      message: 'auth renew',
      token,
      uid,
      name
    });

  } catch (err) {

    //console.error(err);

    return res.status(500).json({
      message: 'Problemas, comuniquese con su admin'
    });

  }

};