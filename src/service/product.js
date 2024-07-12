import http from "./config";
const product = {
  create: data => http.post("/product", data),
  get: () => http.get("/products", { params: { page: 1, limit: 10 } }),
  update: data => http.put("/product", data),
  delete: id => http.delete(`/product/${id}`),
  get_product: id => http.get(`/product/${id}`),
};
export default product;
