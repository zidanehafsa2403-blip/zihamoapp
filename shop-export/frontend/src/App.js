import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ShopApp from "./shop/ShopApp";

function App() {
  return (
    <BrowserRouter>
      <ShopApp />
    </BrowserRouter>
  );
}

export default App;
