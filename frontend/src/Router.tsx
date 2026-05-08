import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import VerProductos from "./productos/pages/VerProductos";
import NuevoProducto from "./productos/pages/NuevoProducto";
import ModificarProducto from "./productos/pages/ModificarProducto";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VerProductos />} />
        <Route path="/nuevo" element={<NuevoProducto />} />
        <Route
          path="/modificar/:id"
          element={<ModificarProducto />}
        />
        <Route
          path="*"
          element={<div>404 Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
