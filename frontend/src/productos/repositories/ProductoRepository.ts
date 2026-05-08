import api from "../../utils/api";
import type Producto from "../models/Producto";
import { type ProductoDto } from "../models/ProductoZod";

function buildProductoFormData(data: Partial<ProductoDto>) {
    const formData = new FormData();

    if (data.nombre !== undefined) {
        formData.append("nombre", data.nombre);
    }
    if (data.descripcion !== undefined) {
        formData.append("descripcion", data.descripcion);
    }
    if (data.precio !== undefined) {
        formData.append("precio", String(data.precio));
    }
    if (data.stock !== undefined) {
        formData.append("stock", String(data.stock));
    }
    if (data.imagen instanceof File) {
        formData.append("imagen", data.imagen);
    }

    return formData;
}

const ProductoRepository = {
    getProductos: async () => {
        const res = await api.get<Producto[]>("/productos");
        return res.data;
    },
    getProducto: async (id: number) => {
        const res = await api.get<Producto>(`/productos/${id}`);
        return res.data;
    },
    createProducto: async (data: ProductoDto) => {
        const res = await api.post(
            "/productos",
            buildProductoFormData(data),
        );
        return res.data;
    },
    updateProducto: async (id: number, data: ProductoDto) => {
        const res = await api.put(
            `/productos/${id}`,
            buildProductoFormData(data),
        );
        return res.data;
    },
    patchProducto: async (
        id: number,
        data: Partial<ProductoDto>,
    ) => {
        const res = await api.patch(
            `/productos/${id}`,
            buildProductoFormData(data),
        );
        return res.data;
    },
    deleteProducto: async (id: number) => {
        const res = await api.delete(`/productos/${id}`);
        return res.data;
    },
};

export default ProductoRepository;
