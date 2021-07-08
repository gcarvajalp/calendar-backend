import jwt from 'jsonwebtoken';
import User from '../models/User';

export const jwtValidator = (req, res, next) => {

  try {

    const token = req.header('x-token');

    if (!token) {
      return res.status(400).json({
        message: 'token not valid'
      })
    }


    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;

    next();

  } catch (error) {
    return res.status(500).json(error)
  }


}