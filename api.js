const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRouter = require('./routes/authRouter').router;
const voteRouter = require('./routes/voteRouter').router;
const adminRouter = require('./routes/adminRouter').router;
const fakerRouter = require('./routes/fakerRouter').router;

const api = express();
api.use(helmet());
api.use(express.json());

api.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.set('useFindAndModify', false);
mongoose.connect(
    `mongodb+srv://AdminDev:FANgVpF5bm8ewtP@cluster0.uvzgr.mongodb.net/nodejsvincent?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error, couldn't connect to specified Mongo database."));
db.once('open', () => console.log("Successfully connected to MongoDB"));

api.use('/auth/', authRouter);
api.use('/admin/', adminRouter);
api.use('/vote/', voteRouter);
api.use('/faker/', fakerRouter);

api.listen(8000, () => console.log(`Server started on port 8000`));