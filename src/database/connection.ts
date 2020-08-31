import mongosse from 'mongoose';
require('dotenv/config');

mongosse.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
mongosse.Promise = global.Promise;

export default mongosse;