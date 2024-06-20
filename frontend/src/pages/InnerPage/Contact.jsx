import { MdEmail, MdOutlineShareLocation } from "react-icons/md";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { IoIosCall } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {


    const notifySuccess = () =>
        toast.success("Message sent successfully", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });

    const notifyError = () =>
        toast.error("An error occurred while sending the message", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        contenue: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/getintouch/", formData);
            notifySuccess();
            setFormData({
                nom: "",
                email: "",
                contenue: "",
            });
        } catch (error) {
            console.error("Error sending message:", error);
            notifyError();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/backoffice/contact/`);
                const donnees = res.data.slice(0, 1);
                setData(donnees);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {data &&
                data.map((item) => {
                    return (
                        <div key={item.id}>
                            <BreadCrumb title="Contact " />

                            {/* Contact */}
                            {/* Contact with Us */}
                            <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
                                <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px] ">
                                    <div className="flex items-center flex-col md:flex-row">
                                        <div
                                            className="py-5 sm:p-5 flex-1"
                                            data-aos="zoom-in-up"
                                            data-aos-duration="1000"
                                        >
                                            <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                                                CONTACT US
                                            </p>
                                            <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                                                CONTACT WITH US
                                            </h2>
                                            <p className="text-Lora text-sm sm:text-base leading-[26px]  text-gray dark:text-lightGray font-normal">
                                                {item.text}
                                            </p>

                                            {/* call */}
                                            <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                                                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                                                    <IoIosCall
                                                        size={22}
                                                        className="text-khaki group-hover:text-whiteSmoke"
                                                    />
                                                </div>
                                                <div className="ml-3 md:ml-4">
                                                    <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">
                                                        Call Us Now
                                                    </p>
                                                    <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium">
                                                        +{item.numero}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr className="dark:text-gray dark:bg-gray text-lightGray bg-lightGray h-[1px]" />
                                            {/* email */}
                                            <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                                                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                                                    <MdEmail
                                                        size={22}
                                                        className="text-khaki group-hover:text-whiteSmoke"
                                                    />
                                                </div>
                                                <div className="ml-3 md:ml-4">
                                                    <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">
                                                        Send Email
                                                    </p>
                                                    <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium ">
                                                        {item.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr className="dark:text-gray dark:bg-gray text-lightGray bg-lightGray h-[1px]" />
                                            {/* location */}
                                            <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                                                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                                                    <MdOutlineShareLocation
                                                        size={22}
                                                        className="text-khaki group-hover:text-whiteSmoke"
                                                    />
                                                </div>
                                                <div className="ml-3 md:ml-4">
                                                    <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">
                                                        Our Locations
                                                    </p>
                                                    <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium ">
                                                        {item.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="flex-1 py-5 sm:p-5"
                                            data-aos="zoom-in-up"
                                            data-aos-duration="1000"
                                        >
                                            <div className="bg-lightBlack  p-[30px] lg:p-[45px] 2xl:p-[61px]">
                                                <h2 className="font-Garamond text-[22px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center">
                                                    GET IN TOUCH
                                                </h2>
                                                <div className="grid items-center grid-cols-1 gap-2 mt-8">
                                                    <form onSubmit={handleSubmit}>
                                                        <input
                                                            type="text"
                                                            className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                                            placeholder="Your Name"
                                                            name="nom"
                                                            value={formData.nom}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            className="w-full h-12 md:h-13 lg:h-[59px] px-4 border  border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                                            placeholder="Enter E-mail"
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <textarea
                                                            id=""
                                                            cols="30"
                                                            rows="10"
                                                            className="w-full h-[121px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray resize-none focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                                            placeholder="Write Message:"
                                                            onChange={handleChange}
                                                            name="contenue"
                                                            value={
                                                                formData.contenue
                                                            }
                                                        ></textarea>
                                                        <button className="w-full bg-khaki text-white text-center h-10 2xl:h-[55px] mt-5" type="submit">
                                                            SEND MESSAGE
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* google map */}
                            <div data-aos="fade-down" data-aos-duration="1000">
                                <div
                                    data-aos="fade-down"
                                    data-aos-duration="1000"
                                >
                                    {data.length > 0 && (
                                        <iframe
                                            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${data[0].longitude}!3d${data[0].latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2s!4v0&zoom=20`}
                                            height={450}
                                            allowFullScreen=""
                                            loading="lazy"
                                            width={"100%"}
                                        ></iframe>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

export default Contact;
