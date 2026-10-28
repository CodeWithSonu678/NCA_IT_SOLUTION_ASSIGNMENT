const express = require('express');
const authRouter = require('../src/routes/auth.route')
const cors = require('cors')


const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use('/api/auth',authRouter);


module.exports = app;