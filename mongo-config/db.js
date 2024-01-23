// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-setup';

// Use 'debugger' to pause execution for debugging
debugger;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    // Use 'debugger' here if you want to inspect the error
    debugger;
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;
