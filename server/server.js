require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

require('./config/mongoose.config')();

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
    const allowCrossDomain = (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Cache-Control',
        );
  
        app.use(allowCrossDomain);
    };
  } 

app.use('/api', require('./routes/routes'));

const port = process.env.PORT || 8000;

const server = app.listen(port, () =>
    console.log(`Listening at Port ${port}`),
);
