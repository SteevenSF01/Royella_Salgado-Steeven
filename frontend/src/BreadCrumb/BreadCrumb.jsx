import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BreadCrumb = ({ title, home }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("/api/backoffice/banierePages/1");
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
          getData();
    }, []);
    const location = useLocation();
    const pathName = location.pathname.split("/")[1];
    return (
        <>
            {data && (
                <section
                    className="bg-no-repeat bg-cover h-[550px] bg-center grid items-center justify-center"
                    style={{
                        backgroundImage: `url(${data.image})`,
                        backgroundBlendMode: "overlay",
                        backgroundColor: "rgba(30, 30, 30, 0.5)",
                    }}
                >
                    <div className="mt-10 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-10 lg:leading-[60px] 2xl:leading-[70px] text-white font-semibold font-Garamond uppercase">
                            {title}
                        </h1>
                        <div className="flex items-center justify-center">
                            <Link
                                to={`${pathName ? `/${pathName}` : "/"}`}
                                className="text-base lg:text-2xl leading-10 2xl:leading-[70px] text-khaki font-semibold font-Garamond flex items-center"
                            >
                                Home <span className="mx-2 text-white">/</span>
                            </Link>
                            <Link
                                to={`#`}
                                className="text-base lg:text-2xl leading-10 2xl:leading-[70px] text-white font-semibold font-Garamond capitalize"
                            >
                                {title}
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default BreadCrumb;
