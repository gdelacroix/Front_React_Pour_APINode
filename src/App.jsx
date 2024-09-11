import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <nav className="mb-4">
          <Link to="/" className="btn btn-primary me-2">
            Product List
          </Link>
          <Link to="/add-product" className="btn btn-secondary">
            Add Product
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
