import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import Landing from "@/pages/Landing";
import ShopApp from "@/shop/ShopApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shop/*" element={<ShopApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
