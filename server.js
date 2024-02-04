const express = require('express');
const cors = require('cors');
const db = require('./mongo-config/db');
const redisClient = require('./redis/redis-client')
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Getting the data');
});

const middleware = (req,res,next) => {
  console.log("api called");
  next();
}

// Use the userRoute
const userRoute = require('./routes/userRoute')(); // Corrected by adding invocation parentheses
app.use('/user', middleware, userRoute);  // Pass the router to the app.use method

const PORT = process.env.PORT || 4000; // Set a default port if PORT is not provided in the environment
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
