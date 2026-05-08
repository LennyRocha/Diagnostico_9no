import ProductoDto from "../models/ProductoDto.js";
import { findAll, findOne, createOne, changeOne, destroyOne, patchOne } from "../services/Producto.service.js";

export const getAll = async (req, res) => {
    try {
        const productos = await findAll();
        const productosJson = productos.map(producto => {
            const productoJson = producto.toJSON();
            if (productoJson.imagen) {
                productoJson.imagen = `data:image/png;base64,${productoJson.imagen.toString('base64')}`;
            }
            return productoJson;
        });
        res.json(productosJson);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error interno del servidor" });
    }
}

export const getOne = async (req, res) => {
    try {
        const producto = await findOne(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        const productoJson = producto.toJSON();

        if (productoJson.imagen) {
            productoJson.imagen = `data:image/png;base64,${productoJson.imagen.toString('base64')}`;
        }

        res.json(productoJson);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error interno del servidor" });
    }
}

export const create = async (req, res) => {
    try {
        const data = {
            ...req.body,
            imagen: req.file?.buffer
        };
        const parsed = ProductoDto.safeParse(data);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
        }
        const producto = await createOne(parsed.data);
        const productoJson = producto.toJSON();
        if (productoJson.imagen) {
            productoJson.imagen = `data:image/png;base64,${productoJson.imagen.toString('base64')}`;
        }
        res.status(201).json(productoJson);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al crear el producto" });
    }
}

export const update = async (req, res) => {
    try {
        const data = {
            ...req.body,
            imagen: req.file?.buffer
        };
        const parsed = ProductoDto.safeParse(data);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
        }
        const producto = await changeOne(parsed.data, req.params.id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        const productoJson = producto.toJSON();
        if (productoJson.imagen) {
            productoJson.imagen = `data:image/png;base64,${productoJson.imagen.toString('base64')}`;
        }
        res.json(productoJson);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al actualizar el producto" });
    }
}

export const partialUpdate = async (req, res) => {
    try {
        const data = {
            ...req.body,
            imagen: req.file?.buffer
        };
        const parsed = ProductoDto.partial().safeParse(data);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
        }
        const producto = await patchOne(parsed.data, req.params.id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        const productoJson = producto.toJSON();
        if (productoJson.imagen) {
            productoJson.imagen = `data:image/png;base64,${productoJson.imagen.toString('base64')}`;
        }
        res.json(productoJson);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al actualizar el producto" });
    }
}

export const destroy = async (req, res) => {
    try {
        const deleted = await destroyOne(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message || "Error interno del servidor" });
    }
}