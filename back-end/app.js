require('dotenv').config();
require('express-async-errors');

const express = require('express');

const authRouter = require('./routes/authRouter');
const accountRouter = require('./routes/accountRouter');

const verifyToken = require('./middlewares/verifyToken').verifyToken;

const notFoundHandler = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');

const cors = require('cors');
const helmet = require('helmet');

const { default: mongoose } = require('mongoose');
const connectDB = require('./Config/connectMongo');



//connect to database


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/auth", authRouter);
app.use(verifyToken);
app.use("/user", accountRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 8888;
connectDB();
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

