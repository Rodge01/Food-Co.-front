import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx'
import Home from '../pages/home/Home.jsx'
import Login from '../components/Login.jsx'
import Register from "../components/Register.jsx";
import CartPage from "../pages/food/CartPage.jsx";
import Checkout from "../pages/food/Checkout.jsx";
import SingleFood from "../pages/food/SingleFood.jsx"
import PrivateRoute from "./Privateroute.jsx";
import OrderPage from "../pages/food/OrderPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ManageFoods from "../pages/dashboard/manageFoods/ManageFoods.jsx";
import UpdateFood from "../pages/EditFood/UpdateFood.jsx";
import Order from "../pages/dashboard/Orders/Order.jsx";
import AddFood from "../pages/addFood/AddFood.jsx";


const router = createBrowserRouter([
    {
     path: "/",
     element: <App/>,
     children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
            path: "/about",
            element: <div>About</div>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        },
        {
            path: "/cart",
            element: <CartPage/>
        },
        {
            path: "/checkout",
            element: <PrivateRoute><Checkout/></PrivateRoute>
        },
        {
            path: "/food/:id",
            element: <SingleFood/>
        },
     ]
    },
{
    path: "/admin",   
     element: <AdminLogin/>
},
{
    path: "/dashboard",
    element: <AdminRoute><DashboardLayout/></AdminRoute>,
    children:[{
        path:  "",
        element: <AdminRoute><Dashboard/></AdminRoute>
    },
    {
        path: "add-new-food",
        element:<AdminRoute><AddFood/></AdminRoute> 
    },
    {
        path: "edit-food/:id",
        element: <AdminRoute><UpdateFood/></AdminRoute>
    },
    {
        path: "manage-food",
        element: <AdminRoute><ManageFoods/></AdminRoute>
    },
    {
        path: "Orders",
        element: <AdminRoute><Order/></AdminRoute>
    },
    ]},
]);
export default router;