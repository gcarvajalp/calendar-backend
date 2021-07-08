import { Router } from 'express';
import { check } from 'express-validator';

import {
  createEvent,
  getEventById,
  getEvents,
  updateEventById,
  deleteEventById
} from '../controllers/events.controller';
import { jwtValidator } from '../middlewares/jwt-validator';
import { filesvalidator } from '../middlewares/files-validator';
import { isDate } from '../helpers/isDate';

const router = Router();

//todas tienen que pasar por la validacion del JWT
router.use(jwtValidator);

router.post(
  '/',
  [//middlewares
    check('title', 'parametro title es obligatorio').notEmpty(),
    check('start', 'parametro start (fecha de inicio) es obligatoria').custom(isDate),
    check('end', 'parametro end (fecha de termino) es obligatoria').custom(isDate),
    filesvalidator
  ],
  createEvent);

router.get(
  '/:eventId',
  [//middlewares
  ],
  getEventById);

router.get(
  '/',
  [//middlewares
  ],
  getEvents);

router.put(
  '/:eventId',
  [//middlewares
  ],
  updateEventById);

router.delete(
  '/:eventId',
  [//middlewares
  ],
  deleteEventById);

export default router;