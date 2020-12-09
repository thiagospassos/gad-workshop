import axios from "axios";

const apiClient = axios.create({
  baseURL: `//localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const SuppliersService = {
  getAll() {
    return apiClient.get("/suppliers");
  },
  get(id) {
    return apiClient.get("/suppliers/" + id);
  },
  update(supplier) {
    return apiClient.put("/suppliers/" + supplier.id, supplier);
  },
  create(supplier) {
    return apiClient.post("/suppliers", supplier);
  }
};

export const CategoriesService = {
  getAll() {
    return apiClient.get("/categories");
  },
  get(id) {
    return apiClient.get("/categories/" + id);
  },
  create(category) {
    return apiClient.post("/categories/", category);
  },
  update(category) {
    return apiClient.put("/categories/" + category.id, category);
  },
  delete(id) {
    return apiClient.delete("/categories/" + id);
  }
};
