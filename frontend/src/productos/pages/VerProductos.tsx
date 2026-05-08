import Button from "../../components/Button";
import Card from "../../components/Card";
import useProductos from "../hooks/productosQuery";
import { useNavigate } from "react-router-dom";

export default function VerProductos() {
  const productosQuery = useProductos();
  const navigate = useNavigate();

  if (productosQuery.isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <main>
      <h1>Mis productos</h1>
      <div className="flex gap-4 flex-wrap my-6 max-md:justify-center px-2">
        {productosQuery.data?.map((producto) => (
          <Card key={producto.id} prod={producto} />
        ))}
      </div>
      <Button onClick={() => navigate("/nuevo")}>
        Nuevo Producto
      </Button>
    </main>
  );
}
