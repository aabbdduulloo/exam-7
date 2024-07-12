import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import {
  SignIn,
  Main,
  Category,
  Worker,
  ForgotPassword,
  Product,
  SinglePage,
} from "@pages";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="main/*" element={<Main />}>
          <Route index element={<Category />} />
          <Route path="worker" element={<Worker />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<SinglePage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default Index;
