import e from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from './config/dbconfig.js'
import router from './routes/producto.routes.js';
import './models/Producto.js';

const app = e();

app.use(cors());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api/productos', router);

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    try {
        await db.authenticate();
        console.log('Database connection has been established successfully.');
        await db.sync({
            alter: true,
            logging: console.log
        });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});