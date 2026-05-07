import db from "../config/dbconfig.js";
import { DataTypes } from "sequelize";

const Producto = db.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 50],
                msg: 'El nombre debe tener hasta 50 caracteres'
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 500],
                msg: 'La descripción debe tener hasta 500 caracteres'
            }
        }
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imagen: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Producto;