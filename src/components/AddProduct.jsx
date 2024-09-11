import React, { useState, useEffect } from "react";
import {
  getCategoriesFromProducts,
  addProduct,
} from "../services/productService";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Récupère toutes les catégories disponibles à partir des produits
    getCategoriesFromProducts().then(setCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let category = { _id: selectedCategoryId };

    if (newCategoryName) {
      // Génère un ID pour la nouvelle catégorie si un nom est fourni
      category = {
        _id: generateCategoryId(), // Génère un ID aléatoire
        name: newCategoryName,
      };
    } else {
      const selectedCategory = categories.find(
        (cat) => cat._id === selectedCategoryId
      );
      if (selectedCategory) {
        category.name = selectedCategory.name;
      }
    }

    const product = {
      name: productName,
      price: parseFloat(productPrice),
      category,
    };

    await addProduct(product);

    // Réinitialiser le formulaire
    setProductName("");
    setProductPrice("");
    setNewCategoryName("");
    setSelectedCategoryId("");
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            disabled={!!newCategoryName}
          >
            <option value="">Select an existing category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="newCategoryName" className="form-label">
            Or Create New Category
          </label>
          <input
            type="text"
            className="form-control"
            id="newCategoryName"
            value={newCategoryName}
            onChange={(e) => {
              setNewCategoryName(e.target.value);
              setSelectedCategoryId(""); // Réinitialiser la catégorie sélectionnée si une nouvelle catégorie est entrée
            }}
            placeholder="Enter new category name"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}
function generateCategoryId() {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const machineIdentifier = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  const processIdentifier = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .padStart(4, "0");
  const counter = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

  return timestamp + machineIdentifier + processIdentifier + counter;
}
export default AddProduct;
