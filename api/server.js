const express = require('express');
const morgan = require('morgan'); //console logger
const cors = require('cors');
const {config} = require('dotenv');
const router = require('./router/router.js');
const connect = require('./database/conn.js');

if (process.env.NODE_ENV !== "PRODUCTION") {
    config({ path: "./api/config/config.env" });
}

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api', router);

app.get('/', (req, res) => {
    try {
        res.json("Hello from express !!")
    } catch (error) {
        res.json(error)
    }
});

connect().then(() => {
    if (process.env.NODE_ENV !== "PRODUCTION") {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    }
}).catch(error => {
    console.log("Invalid Database Connection");
});

module.exports = app