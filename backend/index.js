import e from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from './config/dbconfig.js'

const app = e();

app.use(cors());
app.use(e.json());

app.use(morgan('dev'));

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    try {
        await db.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});