import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css';
import Home from "./views/Home/Home";
import SearchResults from "./views/SearchResults/SearchResults";
import Registration from "./views/Registration/Registration";
import Login from "./views/Login/Login";
import Account from "./views/Account/Account";
import Booking from "./views/Booking/Booking";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/search-results",
        element: <SearchResults />
    },
    {
        path: "/register",
        element: <Registration />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/account",
        element: <Account />
    },
    {
        path: "/booking",
        element: <Booking />
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
