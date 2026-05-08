import React from "react";
import useProductoMutation from "../hooks/productoMutation";
import type { ProductoDto } from "../models/ProductoZod";
import toast from "react-hot-toast";
import ProductoZod from "../models/ProductoZod";
import InputCustom from "../../components/InputCustom";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function NuevoProducto() {
  const plantilla: ProductoDto = {
    nombre: "",
    descripcion: "",
    precio: 1,
    imagen: undefined,
    stock: 1,
    id: undefined,
  };
  const [formData, setFormData] =
    React.useState<ProductoDto>(plantilla);
  const navigate = useNavigate();
  const mutation = useProductoMutation(
    {
      onSuccess: () => {
        toast.success("Producto creado exitosamente");
        setFormData(plantilla);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      },
      onError: (error: unknown) => {
        toast.error(
          (
            error as {
              response?: { data?: { error?: string } };
            }
          ).response?.data?.error ||
            "Error al crear el producto",
        );
      },
    },
    "post",
  );
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const parsed = ProductoZod.safeParse(formData);
    if (!parsed.success) {
      parsed.error.errors.map((e: any) =>
        toast.error(e.message),
      );
      return;
    }

    mutation.mutate({ data: parsed.data });
  };
  return (
    <main className="w-full">
      <h1>Nuevo Producto</h1>
      <form className=" p-2">
        <section className="flex flex-wrap gap-2">
          <InputCustom
            label="Nombre"
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({
                ...formData,
                nombre: e.target.value,
              })
            }
            maxLength={50}
          />
          <InputCustom
            label="Descripción"
            type="text"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({
                ...formData,
                descripcion: e.target.value,
              })
            }
            maxLength={500}
          />
          <InputCustom
            type="number"
            label="Precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={(e) =>
              setFormData({
                ...formData,
                precio:
                  Number.parseFloat(e.target.value) || 0,
              })
            }
            min={1}
          />
          <InputCustom
            type="number"
            label="Stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: Number.parseInt(e.target.value) || 0,
              })
            }
            min={1}
          />
          <InputCustom
            type="file"
            label="Imagen"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFormData({ ...formData, imagen: file });
              }
            }}
          />
        </section>
        <Button
          onClick={handleSubmit}
          disabled={
            formData.nombre === "" ||
            formData.descripcion === "" ||
            formData.precio <= 0 ||
            formData.stock < 0 ||
            formData.imagen === undefined ||
            mutation.isPending ||
            ProductoZod.safeParse(formData).success ===
              false
          }
        >
          Crear Producto
        </Button>
        <Button onClick={() => navigate("/")}>
          Volver
        </Button>
      </form>
    </main>
  );
}
