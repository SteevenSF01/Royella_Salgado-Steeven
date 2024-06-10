import React from "react";
import { Outlet, Link } from "react-router-dom";
import NavbarOffice from "./pages/navbar/NavbarOffice";

export default function PageBackoffice() {
    return (
        <section>
            <NavbarOffice />
            <div className="h-fit bg-[#aeadac] dark:bg-normalBlack flex flex-col items-center pt-32">
                <Link to="/">
                    <button className="bg-khaki text-white hover:bg-[rgba(141,115,77,0.9)] font-bold py-2 px-4 rounded-lg">
                        retour
                    </button>
                </Link>
                <h1 className="text-5xl font-Garamond font-semibold">
                    Backoffice
                </h1>
                <Outlet />
            </div>
        </section>
    );
}
