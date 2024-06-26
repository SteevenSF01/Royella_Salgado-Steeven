import { createBrowserRouter } from "react-router-dom";

// Home And Main Home1
import Main from "../Main/Main";
import Home1 from "../Pages/Home1/Home1";

// All InnerPage
import About from "../Pages/InnerPage/About";
import Room from "../Pages/InnerPage/Room";
import FindRoom from "../Pages/InnerPage/FindRoom";
import RoomDetails from "../Pages/InnerPage/RoomDetails";
import Services from "../Pages/InnerPage/Services";
import ServiceDetails from "../Pages/InnerPage/ServiceDetails";
import Team from "../Pages/InnerPage/Team";
import Pricing from "../Pages/InnerPage/Pricing";
import Blog from "../Pages/InnerPage/Blog";
import BlogDetails from "../Pages/InnerPage/BlogDetails";
import Contact from "../Pages/InnerPage/Contact";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Register from "../backoffice/register/Register";
import Login from "../backoffice/pages/login/Login";
import CreateBlog from "../backoffice/pages/createBlog/CreateBlog";

// Backoffice
import PageBackoffice from "../backoffice/pageBackoffice";
// Backoffice - Hero Home
import HeroHome from "../backoffice/pages/heroHome/HeroHome";
import HeroHomeCreate from "../backoffice/pages/heroHome/HeroHomeCreate";
import HeroHomeUpdate from "../backoffice/pages/heroHome/HeroHomeUpdate";
// Backoffice - Baniere Pages
import BanierePagesMod from "../backoffice/pages/banierePages/BanierePagesMod";
// Backoffice - Footer Images
import FooterImages from "../backoffice/pages/footer/FooterImages";
// Backoffice - Address
import Autocomplete from "../backoffice/pages/contact/Googlemaps";
// Backoffice - FAQ
import FAQ from "../backoffice/pages/faq/FAQ";
// Backoffice - Facilities
import FacilitiesAll from "../backoffice/pages/facilities/FacilitiesAll";
// Backoffice - Get in touch
import Inbox from "../backoffice/pages/getInTouch/GetInTouch";
// Backoffice - Rooms
import CreateRoom from "../backoffice/pages/room/CreateRoom";
// Reservation
import Reservation from "../backoffice/pages/reservation/Reservation";

import ProtectedRoute from "../backoffice/pages/protectedRoute/ProtectedRoute";

// Starting React Router.
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home1 />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/room",
                element: <Room />,
            },
            {
                path: "/find_room",
                element: <FindRoom />,
            },
            {
                path: "/room_details/:id",
                element: <RoomDetails />,
            },
            {
                path: "/services",
                element: <Services />,
            },
            {
                path: "/service_details/:id",
                element: <ServiceDetails />,
            },
            {
                path: "/our_team",
                element: <Team />,
            },
            {
                path: "/pricing",
                element: <Pricing />,
            },
            {
                path: "/blog",
                element: <Blog />,
            },
            {
                path: "/blog_details/:id",
                element: <BlogDetails />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/create_blog",
                element: <CreateBlog />,
            },
            {
                path: "/reservation",
                element: <Reservation />,
            }
        ],
    },
    // Backoffice //
    {
        path: "/backoffice",
        element: (
            // <ProtectedRoute>
                <PageBackoffice />
            // </ProtectedRoute>
        ),
        children: [
            {
                path: "/backoffice",
                element: <HeroHome />,
                index: true,
            },
            {
                path: "/backoffice/heroHome/create",
                element: <HeroHomeCreate />,
            },
            {
                path: "/backoffice/heroHome/update/:id",
                element: <HeroHomeUpdate />,
            },
            {
                path: "/backoffice/banierePages",
                element: <BanierePagesMod />,
            },
            {
                path: "/backoffice/footerImages",
                element: <FooterImages />,
            },
            {
                path: "/backoffice/address",
                element: <Autocomplete />,
            },
            {
                path: "/backoffice/faq",
                element: <FAQ />,
            },
            {
                path: "/backoffice/facilities",
                element: <FacilitiesAll />,
            },
            {
                path: "/backoffice/getintouch",
                element: <Inbox />,
            },
            {
                path: "/backoffice/rooms",
                element: <CreateRoom />,
            },
        ],
    },
]);

export default router;
