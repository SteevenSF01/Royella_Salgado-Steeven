import React, { useState, useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Bars4Icon,
    GlobeAmericasIcon,
    NewspaperIcon,
    PhoneIcon,
    RectangleGroupIcon,
    SquaresPlusIcon,
    SunIcon,
    TagIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { BiSun } from "react-icons/bi";
import { IoMoonSharp } from "react-icons/io5";

const navListMenuItems = [
    {
        title: "Hero Home",
        description: "Section Hero",
        link: 'heroHome',
        icon: SquaresPlusIcon,
    },
    {
        title: "Baniere Pages",
        description: "Section Baniere Pages",
        link: 'banierePages',
        icon: UserGroupIcon,
    },
    {
        title: "Footer Images",
        description: "Section Footer Images",
        link: 'footerImages',
        icon: Bars4Icon,
    },
    {
        title: "Contact",
        description: "Section Contact",
        link: 'address',
        icon: Bars4Icon,
    },
    {
        title: "Faq",
        description: "Section Faq",
        link: 'faq',
        icon: Bars4Icon,
    },
    // {
    //     title: "Services",
    //     description: "Learn how we can help you achieve your goals.",
    //     link: 'backoffice1',
    //     icon: SunIcon,
    // },
    // {
    //     title: "Support",
    //     description: "Reach out to us for assistance or inquiries",
    //     link: 'backoffice1',
    //     icon: GlobeAmericasIcon,
    // },
    // {
    //     title: "Contact",
    //     description: "Find the perfect solution for your needs.",
    //     link: 'backoffice1',
    //     icon: PhoneIcon,
    // },
    // {
    //     title: "News",
    //     description: "Read insightful articles, tips, and expert opinions.",
    //     link: 'backoffice1',
    //     icon: NewspaperIcon,
    // },
    // {
    //     title: "Products",
    //     description: "Find the perfect solution for your needs.",
    //     link: 'backoffice1',
    //     icon: RectangleGroupIcon,
    // },
    // {
    //     title: "Special Offers",
    //     description: "Explore limited-time deals and bundles",
    //     link: 'backoffice1',
    //     icon: TagIcon,
    // },
];

import { Link } from "react-router-dom";
function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const renderItems = navListMenuItems.map(
        ({ icon, title, description, link, }, key) => (
            <a href={link} key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg">
                    <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-2">
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 text-gray-900 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm font-bold"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xs font-medium text-blue-gray-500"
                        >
                            {description}
                        </Typography>
                    </div>
                </MenuItem>
            </a>
        )
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography
                        as="div"
                        variant="small"
                        className="font-medium"
                    >
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-medium text-black bg-white"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Resources
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${
                                    isMobileMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-white">
                    <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <Typography
                as="a"
                href="/"
                variant="small"
                className="font-medium text-white"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Home
                </ListItem>
            </Typography>
            <NavListMenu />
            <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium text-white"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Contact Us
                </ListItem>
            </Typography>
        </List>
    );
}

export default function Navbaroffice() {
  const [isDarkMode, setIsDarkMode] = useState(
      localStorage.getItem("darkMode") === "true"
  );


  const [openNav, setOpenNav] = useState(false);

  const handleClick = () => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem("darkMode", newMode);
      document.documentElement.classList.toggle("dark", newMode); 
  };

  useEffect(() => {
      window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false)
      );
      document.documentElement.classList.toggle("dark", isDarkMode);

      return () => {
          window.removeEventListener(
              "resize",
              () => window.innerWidth >= 960 && setOpenNav(false)
          );
      };
  }, [isDarkMode]);

  return (
    <section className="flex justify-center backdrop-blur-sm fixed w-full z-30">
            <Navbar className="mx-auto w-full px-4 py-2  bg-khaki text-white flex-grow z-40 mt-3  ">
          <div className="flex items-center justify-between">
              <Typography
                  as="a"
                  href="#"
                  variant="h6"
                  className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-white"
              >
                  Royella Backoffice
              </Typography>
              <div className="hidden lg:block">
                  <NavList />
              </div>
              <div className="hidden gap-2 lg:flex">
                  <span onClick={handleClick} className="mr-3 cursor-pointer">
                      {isDarkMode ? (
                          <BiSun
                              className="text-white"
                              title="Apply Light Mode"
                              size={20}
                          />
                      ) : (
                          <IoMoonSharp
                              size={20}
                              className="text-white"
                              title="Apply Dark Mode"
                          />
                      )}
                  </span>{" "}
              </div>
              <IconButton
                  variant="text"
                  className="lg:hidden text-white"
                  onClick={() => setOpenNav(!openNav)}
              >
                  {openNav ? (
                      <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                  ) : (
                      <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                  )}
              </IconButton>
          </div>
          <Collapse open={openNav}>
              <NavList />
              <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                  <span onClick={handleClick} className="mr-3 cursor-pointer">
                      {isDarkMode ? (
                          <BiSun
                              className="text-white"
                              title="Apply Light Mode"
                              size={20}
                          />
                      ) : (
                          <IoMoonSharp
                              size={20}
                              className="text-white"
                              title="Apply Dark Mode"
                          />
                      )}
                  </span>
              </div>
          </Collapse>
      </Navbar>
    </section>
  );
}
