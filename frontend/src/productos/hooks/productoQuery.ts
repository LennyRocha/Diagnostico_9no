import { useQuery } from "@tanstack/react-query";
import ProductoRepository from "../repositories/ProductoRepository";

export default function useProducto(id: number, enabled = true) {
    return useQuery({
        queryKey: ["productos", id],
        enabled,
        queryFn: () => ProductoRepository.getProducto(id),
    });
}