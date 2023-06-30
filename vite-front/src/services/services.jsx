import axios from "axios";

export const getAllCategories = async () => await axios.get("/test/categories");

export const getAllProducts = async () => await axios.get("/test/products");
