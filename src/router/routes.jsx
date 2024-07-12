import { Icon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PersonIcon from "@mui/icons-material/Person";

const routes = [
  {
    path: "/main",
    content: "Category",
    icon: <Icon component={DashboardIcon} />,
  },
  {
    path: "/main/product",
    content: "Products",
    icon: <Icon component={ShoppingCartIcon} />,
  },
  {
    path: "/main/worker",
    content: "Workers",
    icon: <Icon component={RoomServiceIcon} />,
  },
];

export default routes;
