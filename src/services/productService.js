import { API_ENDPOINT } from "../constants";

export const getProducts = async () => {
  const response = await fetch(`${API_ENDPOINT}/products`);
  return response.json();
};

// Extraire les catégories des produits existants
export const getCategoriesFromProducts = async () => {
  const products = await getProducts();
  const categories = products.map((product) => product.category);

  // Éliminer les doublons de catégories en utilisant l'_id
  const uniqueCategories = Array.from(
    new Set(categories.map((cat) => cat._id))
  ).map((id) => categories.find((cat) => cat._id === id));

  return uniqueCategories;
};

export const addProduct = async (product) => {
  const response = await fetch(`${API_ENDPOINT}/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
};
