import axios from "axios";
import NProgress from "nprogress";

const apiClient = axios.create({
  baseURL: `//localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  () => {
    NProgress.done();
  }
);
apiClient.interceptors.response.use(
  (config) => {
    NProgress.done();
    return config;
  },
  () => {
    NProgress.done();
  }
);

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
  },
};

export const ProductsService = {
  getAllPaged(page, sortColumn, sortOrder) {
    var query = `/products?_page=${page}`;

    if (sortColumn) {
      query = `${query}&_sort=${sortColumn}&_order=${sortOrder}`;
    }

    return apiClient.get(query);
  },
  isUniqueProductName(name) {
    return apiClient.get("/products?name=" + name).then((result) => {
      return result.data.length === 0;
    });
  },
  getAll() {
    return apiClient.get("/products");
  },
  get(id) {
    return apiClient.get("/products/" + id);
  },
  create(product) {
    return apiClient.post("/products/", product);
  },
  update(product) {
    return apiClient.put("/products/" + product.id, product);
  },
  delete(id) {
    return apiClient.delete("/products/" + id);
  },
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
  },
};
