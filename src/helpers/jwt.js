import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createToken = (uid, name) => {

  try {

    return jwt.sign({ uid, name }, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    });


  } catch (error) {
    console.error(error);
    return resizeBy.status(500).json({
      message: 'Problemas, contactese con el admin'
    })
  }

}