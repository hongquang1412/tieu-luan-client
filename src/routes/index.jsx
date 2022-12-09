import LayoutSidebar from "../components/layout/LayoutSidebar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Category from "../pages/category/Category";
import Detail from "../pages/detail/Detail";
import Cart from "../pages/cart/Cart";
import Info from "../pages/info/Info";
import Orders from "../pages/orders/Orders";
import { default as OrderDetails } from "../pages/orders/Detail";
import Address from "../pages/address/Address";
import { default as AddAddress } from "../pages/address/Add";
import { default as UpdateAddress } from "../pages/address/Update";
import PasswordRetrieval from "../pages/login/PasswordRetrieval";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/passwordRetrieval", component: PasswordRetrieval },
  { path: "/category/:name", component: Category },
  { path: "/detail/:id", component: Detail },
];
const privateRoutes = [
  { path: "/cart", component: Cart },
  { path: "/info", component: Info, layout: LayoutSidebar },
  { path: "/orders", component: Orders, layout: LayoutSidebar },
  {
    path: "/orders/detail/:id",
    component: OrderDetails,
    layout: LayoutSidebar,
  },
  { path: "/address", component: Address, layout: LayoutSidebar },
  { path: "/address/add", component: AddAddress, layout: LayoutSidebar },
  {
    path: "/address/update/:id",
    component: UpdateAddress,
    layout: LayoutSidebar,
  },
];
export { publicRoutes, privateRoutes };
