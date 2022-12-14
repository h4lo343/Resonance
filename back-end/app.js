const express = require('express');
const authRouter = require('./routes/authRouter');
const verifyToken = require('./middlewares/verifyToken').verifyToken;
// const cors = require('cors');
const { default: mongoose } = require('mongoose');
const connectDB = require('./Config/connectMongo');
require('dotenv').config();

//connect to database
connectDB();

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8888;

app.use("/auth", authRouter);
app.use(verifyToken);

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(port, (error) => {
        if (!error)
            console.log("Server is Successfully Running, and App is listening on port " + port);
        else
            console.log("Error occurred, server can't start", error);
    }
    );
});

