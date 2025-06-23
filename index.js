require('dotenv').config();
const mongoose = require('mongoose');
const { connectToDatabase } = require('./connection');
const app = require('./src/app.js');

const { PORT, BASE_URL } = process.env;

(async () => {
  try {
    console.log('Initializing server');
    await connectToDatabase();
    // post script function should goes here before starting the server
    app.listen(PORT, () => console.log(`Server is running on ${BASE_URL}`)).on('error', shutdown);
  } catch (error) {
    shutdown(error);
  }
})();

async function shutdown(err) {
  console.log('Unable to initialize the server:', err.message);
  await mongoose.connection.close();
  process.exit(1);
}
