import { AuthProvider } from "./backoffice/pages/loginProvider/LoginProvider.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

const helmetContext = {};
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <HelmetProvider context={helmetContext}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </HelmetProvider>
        </ThemeProvider>
    </React.StrictMode>
);
