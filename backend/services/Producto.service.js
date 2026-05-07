import Producto from "../models/Producto.js";

export const findAll = async () => Producto.findAll();

export const findOne = async (id) => Producto.findByPk(id);

export const createOne = async (body) => {
    const prod = Producto.build(body);
    await prod.save();
    return prod;
}

export const changeOne = async (body, id) => {
    const prod = await Producto.findByPk(id);
    if (!prod) return null;
    prod.nombre = body.nombre;
    prod.descripcion = body.descripcion;
    prod.precio = body.precio;
    prod.imagen = body.imagen;
    prod.stock = body.stock;
    await prod.save();
    return prod;
}

export const patchOne = async (body, id) => {
    const prod = await Producto.findByPk(id);
    if (!prod) return null;
    if (body.nombre !== undefined) prod.nombre = body.nombre;
    if (body.descripcion !== undefined) prod.descripcion = body.descripcion;
    if (body.precio !== undefined) prod.precio = body.precio;
    if (body.imagen !== undefined) prod.imagen = body.imagen;
    if (body.stock !== undefined) prod.stock = body.stock;
    await prod.save();
    return prod;
}

export const destroyOne = async (id) => {
    const deleted = await Producto.destroy({ where: { id: id } });
    return deleted;
}