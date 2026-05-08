import { useNavigate, useParams } from "react-router-dom";
import useProducto from "../hooks/productoQuery";
import useProductoMutation from "../hooks/productoMutation";
import type { ProductoDto } from "../models/ProductoZod";
import toast from "react-hot-toast";
import ProductoZod from "../models/ProductoZod";
import InputCustom from "../../components/InputCustom";
import Button from "../../components/Button";
import React from "react";

function ModificarProductoForm({
  producto,
}: Readonly<{ producto: ProductoDto }>) {
  const plantilla: ProductoDto = {
    nombre: "",
    descripcion: "",
    precio: 1,
    imagen: undefined,
    stock: 1,
    id: undefined,
  };
  const [formData, setFormData] =
    React.useState<ProductoDto>(producto);

  const navigate = useNavigate();

  const mutation = useProductoMutation(
    {
      onSuccess: () => {
        toast.success("Producto actualizado exitosamente");
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
            "Error al actualizar el producto",
        );
      },
    },
    "put",
  );

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const parsed = ProductoZod.safeParse(formData);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) =>
        toast.error(issue.message),
      );
      return;
    }

    mutation.mutate({ data: parsed.data, id: producto.id });
  };

  return (
    <main className="w-full">
      <h1>Modificar Producto</h1>
      <form className="p-2">
        <section className="flex flex-wrap gap-2 ">
          <InputCustom
            label="Nombre"
            type="text"
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
          Modificar Producto
        </Button>
        <Button onClick={() => navigate("/")}>
          Volver
        </Button>
      </form>
    </main>
  );
}

export default function ModificarProducto() {
  const { id } = useParams();
  const hasId = Boolean(id);
  const prodQuery = useProducto(Number(id ?? 0), hasId);

  if (!id) {
    return <div>Id no proporcionado</div>;
  }
  if (prodQuery.isLoading) {
    return <div>Cargando...</div>;
  }
  if (!prodQuery.data) {
    return <div>No se pudo cargar el producto</div>;
  }
  return (
    <ModificarProductoForm producto={prodQuery.data} />
  );
}
