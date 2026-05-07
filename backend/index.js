const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./config/dbconfig');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});