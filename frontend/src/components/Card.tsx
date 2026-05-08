import "../css/card.css";
import type Producto from "../productos/models/Producto";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useProductoMutation from "../productos/hooks/productoMutation";
import toast from "react-hot-toast";

type Props = {
  prod: Producto;
};

export default function Card({ prod }: Readonly<Props>) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useProductoMutation(
    {
      onSuccess: () => {
        toast.success("Producto eliminado exitosamente");
        queryClient.invalidateQueries({
          queryKey: ["productos"],
        });
      },
      onError: (error: unknown) => {
        toast.error(
          (
            error as {
              response?: { data?: { error?: string } };
            }
          ).response?.data?.error ||
            "Error al eliminar el producto",
        );
      },
    },
    "delete",
  );

  const handleDelete = () => {
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este producto?",
      )
    ) {
      deleteMutation.mutate({ id: prod.id });
    }
  };

  const handleEdit = () => {
    navigate(`/modificar/${prod.id}`);
  };

  //From Uiverse.io by andrew-demchenk0
  return (
    <div className="card">
      <div className="card-img">
        <img src={prod.imagen} alt={prod.nombre} className="cover aspect-16/9" />
      </div>
      <div className="card-title">{prod.nombre}</div>
      <div className="card-subtitle">
        {prod.descripcion}
      </div>
      <hr className="card-divider" />
      <div className="card-footer">
        <div className="card-price truncate">
          <span>$</span> {prod.precio}
        </div>
        <div className="card-buttons">
          <button
            type="button"
            className="card-btn"
            onClick={handleEdit}
            title="Editar producto"
            aria-label="Editar producto"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l8.06-8.06.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
            </svg>
          </button>
          <button
            type="button"
            className="card-btn"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            title="Eliminar producto"
            aria-label="Eliminar producto"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
