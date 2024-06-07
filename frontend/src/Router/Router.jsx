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

// Backoffice
import PageBackoffice from "../backoffice/pageBackoffice";
import HeroHome from "../backoffice/pages/heroHome/HeroHome";
import HeroHomeCreate from "../backoffice/pages/heroHome/HeroHomeCreate";
import HeroHomeUpdate from "../backoffice/pages/heroHome/HeroHomeUpdate";
import BanierePagesMod from "../backoffice/pages/banierePages/BanierePagesMod";
import FooterImages from "../backoffice/pages/footer/FooterImages";

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
        path: "/room_details",
        element: <RoomDetails />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/service_details",
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
        path: "/blog_details",
        element: <BlogDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  // Backoffice //
  {
    path: "/backoffice",
    element: < PageBackoffice/>,
    children: [
      {
        path: "/backoffice/heroHome",
        element: <HeroHome />,
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
      }
    ]
  },
]);

export default router;
