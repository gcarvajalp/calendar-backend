

import { Router } from 'express';
import { check } from 'express-validator';

import { authLogin, authLogout, authRegister, authRenew } from '../controllers/auth.controller';
import { filesvalidator } from '../middlewares/files-validator';
import { jwtValidator } from '../middlewares/jwt-validator';


const router = Router();

router.post(
  '/',
  [//middlewares
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
    filesvalidator
  ],
  authLogin);

router.post(
  '/new',
  [//middlewares
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
    filesvalidator
  ],
  authRegister);

router.post('/logout', authLogout);

router.get(
  '/renew',
  [//middlewares
    jwtValidator
  ],
  authRenew)

export default router;
