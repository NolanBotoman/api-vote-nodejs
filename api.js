const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const crypto = require('crypto');

const authRouter = require('./routes/authRouter').router;
const voteRouter = require('./routes/voteRouter').router;
const adminRouter = require('./routes/adminRouter').router;
const fakerRouter = require('./routes/fakerRouter').router;

const api = express();
api.use(helmet());
api.use(express.json());

global.JWT_SECRET = crypto.randomBytes(64).toString('hex')

api.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.set('useFindAndModify', false);
mongoose.connect(
    process.env.DB_CREDENTIAL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error, couldn't connect to specified Mongo database."));
db.once('open', () => console.log("Successfully connected to MongoDB"));

api.use('/auth/', authRouter);
api.use('/admin/', adminRouter);
api.use('/vote/', voteRouter);
api.use('/faker/', fakerRouter);

api.listen(8000, () => console.log(`Server started on port 8000`));