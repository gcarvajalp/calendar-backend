import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`${process.env.MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then((db) => { console.log(`Server started on host ${db.connection.host}`) })
  .catch((err) => {
    console.log(err);
    throw new Error('Error inicializando la DB')
  });