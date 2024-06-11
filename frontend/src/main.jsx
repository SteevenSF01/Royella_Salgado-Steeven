import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@material-tailwind/react";

const helmetContext = {};
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <HelmetProvider context={helmetContext}>
                <RouterProvider router={router} />
            </HelmetProvider>
        </ThemeProvider>
    </React.StrictMode>
);
