import axios from "axios";

const API_URL = "https://dummyjson.com/products";

const getAllProducts = (page: number, limit: number) => {
  const skip = page * limit;
  return axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
};
const getProductDetail = (id: number) => axios.get(`${API_URL}/${id}`);

const createProduct = (
  title: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  image: string
) => {
  return axios.post(`${API_URL}/add`, {
    title,
    description,
    price,
    category,
    stock,
    thumbnail: image,
  });
};

// const getAllProducts = () => axios.get(API_URL);

export const getProductById = async (id: number) => {
  return await axios.get(`${API_URL}/${id}`);
};

const getCategories = () => axios.get(`${API_URL}/categories`);

const getProductByCategory = (
  category: string,
  page: number,
  limit: number
) => {
  const skip = page * limit;
  return axios.get(
    `${API_URL}/category/${category}?limit=${limit}&skip=${skip}`
  );
};

const updateProduct = (
  id: number,
  title: string,
  description: string,
  price: number,
  category: string,
  stock: number
) => {
  return axios.patch(`${API_URL}/${id}`, {
    title,
    description,
    price,
    category,
    stock,
  });
};

const deleteProduct = (id: number) => axios.delete(`${API_URL}/${id}`);

const searchProduct = (query: string) =>
  axios.get(`${API_URL}/search?q=${query}`);

export {
  getAllProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductByCategory,
  getCategories,
};
