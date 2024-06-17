import axios from "axios";
import { useState, useEffect } from "react";

const HotelAndFacilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [facilitie, setFacilitie] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/backoffice/facilitiesRoom");
                const data = res.data.slice(1, 6);
                setFacilities(data);
                const facilitie = res.data[0];
                setFacilitie(facilitie);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    console.log(facilitie, facilities);
    return (
        <section className="bg-lightBlack z-[1]">
            <div className="py-[110px] bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07]">
                <div className="Container">
                    <div
                        className=" text-center mx-auto px-5 sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] "
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        {/* Section logo */}
                        <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-5">
                            <hr className="w-[100px] h-[1px] bg-[#3b3b3b] text-[#3b3b3b] " />
                            <img
                                src="/images/home-1/section-shape1.png"
                                alt="room_section_logo"
                                className="w-[50px] h-[50px]"
                            />
                            <hr className="w-[100px] h-[1px] bg-[#3b3b3b] text-[#3b3b3b] " />
                        </div>
                        <h1 className="text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] 2xl:leading-[52px] text-white mb-[6px] font-Garamond font-semibold uppercase">
                            HOTEL’S FACILITIES
                        </h1>
                        <p className="font-Lora leading-[26px] text-lightGray font-normal text-sm sm:text-base">
                            Proactively morph optimal infomediaries rather than
                            accurate expertise. Intrinsicly progressive
                            resources rather than resource-leveling
                        </p>
                    </div>
                    {/* HOTEL’S FACILITIES content */}
                    <div
                        className="grid items-center justify-center-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 3xl:grid-cols-6 gap-4  xl:gap-[26px] pt-[60px] pb-[110px] px-8 lg:px-10 xl:px-28 2xl:px-0"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        {facilitie && (
                            <div className="container">
                                <div className="content">
                                    <img
                                        src={facilitie.logo}
                                        alt={facilitie.nom}
                                        className="logo"
                                    />
                                    <h4 className="title">{facilitie.nom}</h4>
                                </div>
                                <style jsx>{`
                                    .container {
                                        height: 200px;
                                        width: 197px;
                                        padding-top: 37px;
                                        padding-bottom: 27px;
                                        border: 1px solid #343434;
                                        text-align: center;
                                        transition: all 500ms;
                                        position: relative;
                                        z-index: 1;
                                    }

                                    .container:before {
                                        content: "";
                                        background-image: url(${facilitie.image});
                                        position: absolute;
                                        width: 0;
                                        height: 100%;
                                        left: -0px;
                                        top: 0;
                                        transition: all 700ms;
                                        background-size: cover;
                                        background-position: center;
                                    }

                                    .container:hover:before {
                                        width: 100%;
                                        z-index: 1;
                                    }

                                    .content {
                                        position: relative;
                                    }

                                    .logo {
                                        margin: auto;
                                    }

                                    .title {
                                        font-size: 22px;
                                        line-height: 52px;
                                        font-family: Garamond;
                                        color: white;
                                        font-weight: medium;
                                        margin-top: 45px;
                                        position: relative;
                                    }

                                    .title:before {
                                        content: "";
                                        width: 1px;
                                        height: 25px;
                                        background-color: #808080;
                                        position: absolute;
                                        left: 50%;
                                        top: -27px;
                                    }

                                    .title:hover:before {
                                        background-color: #f0e68c;
                                    }
                                `}</style>
                            </div>
                        )}

                        {facilities &&
                            facilities.map((facilitie) => {
                                return (
                                    <>
                                        <div
                                            key={facilitie.id}
                                            className="h-[200px] w-[197px] pt-[37px] pb-[27px] border border-[#343434] text-center transition-all duration-500 relative z-[1] group facility-card"
                                            style={{
                                                "--facility-before-bg": `url(${facilitie.image})`,
                                            }}
                                        >
                                            <div className="flex items-center justify-center">
                                                <img
                                                    src={facilitie.logo}
                                                    alt={facilitie.nom}
                                                    className="w-[50px] h-[50px]"
                                                />
                                            </div>
                                            <div className="">
                                                <h4 className="text-[22px] leading-[52px] font-Garamond text-white font-medium mt-[45px] relative before:absolute before:w-[1px] before:h-[25px] before:left-[50%] before:top-[-27px] before:bg-slate-500 before:group-hover:bg-khaki">
                                                    {facilitie.nom}
                                                </h4>
                                            </div>
                                            <style jsx>{`
                                                .facility-card::before {
                                                    content: "";
                                                    position: absolute;
                                                    width: 0;
                                                    height: 100%;
                                                    left: 0;
                                                    top: 0;
                                                    background-image: var(
                                                    --facility-before-bg
                                                    );
                                                    background-size: cover;
                                                    background-position: center;
                                                    transition: all 0.5s;
                                                    z-index: 1;
                                                }
                                                .facility-card:hover::before {
                                                    width: 100%;
                                                }
                                                @media (min-width: 768px) {
                                                    .facility-card:hover::before {
                                                        width: 100%;
                                                    }
                                                }
                                                @media (min-width: 1280px) {
                                                    .facility-card::before {
                                                        right: -222px;
                                                    }
                                                    .facility-card:hover::before {
                                                        width: 100%;
                                                    }
                                                }
                                                @media (min-width: 1920px) {
                                                    .facility-card::before {
                                                        left: -222px;
                                                    }
                                                }
                                            `}</style>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotelAndFacilities;
