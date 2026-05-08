import { useMutation } from "@tanstack/react-query";
import ProductoRepository from "../repositories/ProductoRepository";
import { type ProductoDto } from "../models/ProductoZod";

type accion = "post" | "put" | "patch" | "delete";
type MutationData = {
    data?: ProductoDto;
    id?: number;
};

export default function useProductoMutation(
    props = {},
    accion: accion = "post",
) {
    const mutationFn = async ({ data, id }: MutationData) => {
        switch (accion) {
            case "post": {
                if (!data) {
                    throw new Error("Faltan datos para crear el producto");
                }
                return ProductoRepository.createProducto(data);
            }

            case "put": {
                if (id === undefined || !data) {
                    throw new Error("Faltan datos para actualizar el producto");
                }
                return ProductoRepository.updateProducto(id, data);
            }

            case "patch": {
                if (id === undefined || !data) {
                    throw new Error("Faltan datos para actualizar parcialmente el producto");
                }
                return ProductoRepository.patchProducto(id, data);
            }

            case "delete": {
                if (id === undefined) {
                    throw new Error("Falta el id del producto a eliminar");
                }
                return ProductoRepository.deleteProducto(id);
            }
        }
    };

    return useMutation({
        mutationFn,
        ...props,
    });
}
