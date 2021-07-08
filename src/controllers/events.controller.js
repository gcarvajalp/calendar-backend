import { json } from 'express';
import Event from '../models/Event';

export const createEvent = async (req, res) => {

  const { title, notes, start, end } = req.body;

  try {

    const newEvent = Event({ title, notes, start, end });
    newEvent.user = req.uid;

    await newEvent.save();

    console.log(newEvent);

    return res.status(200).json({
      message: 'Created',
      event: newEvent
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Problemas, contactese con el admin'
    });
  }

};

export const getEventById = (req, res) => {

  const { eventId } = req.params;

  try {

    return res.status(200).json({
      message: `Get event by ID: ${eventId}`
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Problemas, contactese con el admin'
    });
  }
}

export const getEvents = async (req, res) => {

  try {

    const events = await Event.find().populate('user', 'name');

    return res.status(200).json({
      message: 'Get events',
      events
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mesage: 'Problemas, contactese con el admin'
    })
  }

};

export const updateEventById = async (req, res) => {

  const { eventId } = req.params;

  try {

    const findEvent = await Event.findById(eventId);

    if (!findEvent) {
      return res.status(404).json({
        message: 'id event no coincide con nuestros registros'
      });
    }

    if (findEvent.user.toString() !== req.uid) {
      return res.status(401).json({
        message: 'usuario no permitido para editar'
      })
    }

    const newEvent = {
      ...req.body,
      user: req.uid
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    return res.status(200).json({
      message: 'Update event',
      updated: eventUpdated
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Problemas, contactese con el admin'
    })
  }

};

export const deleteEventById = async (req, res) => {

  const { eventId } = req.params;

  try {

    const findEvent = await Event.findById(eventId);

    if (!findEvent) {
      return res.status(404).json({
        message: 'Evento no encontrado'
      })
    }

    console.log(req.uid, findEvent.user.toString());

    if (req.uid !== findEvent.user.toString()) {
      return res.status(403).json({
        message: 'accion no permitida para este usuario'
      })
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      message: 'Delete event',
      event: deletedEvent
    });


  } catch (error) {

    console.error(error);
    return res.status(500).json({
      message: 'Problemas, contactese con su proveedor'
    })

  }


}