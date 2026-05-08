import { useQuery } from "@tanstack/react-query";
import ProductoRepository from "../repositories/ProductoRepository";

export default function useProductos() {
    return useQuery({
        queryKey: ["productos"],
        queryFn: ProductoRepository.getProductos,
    });
}