import "./App.css";
import { Toaster } from "react-hot-toast";
import Router from "./Router";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router />
    </>
  );
}

export default App;
