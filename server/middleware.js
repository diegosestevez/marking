const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const assignRouter = require('./Routes/assignmentRoutes');
const userRouter = require('./Routes/userRoutes');


const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};


app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/assign', assignRouter);

module.exports = app;