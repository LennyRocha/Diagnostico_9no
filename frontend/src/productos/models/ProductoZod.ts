import z from "zod";

const ProductoZod = z.object({
    id: z.number().optional(),
    nombre: z.string().max(50, "El nombre debe tener hasta 50 caracteres").min(1, "Este campo no puede estar vacío"),
    descripcion: z.string().max(500, "La descripción debe tener hasta 500 caracteres").min(1, "Este campo no puede estar vacío"),
    precio: z.coerce.number().min(1, "El precio asignado no debe ser menor o igual a 0").max(9999999.99, "El precio dado es demasiado grande"),
    imagen:z.union([z.instanceof(File), z.string()]).optional(),
    stock: z.coerce.number()
});

export type ProductoDto = z.infer<typeof ProductoZod>;

export default ProductoZod;