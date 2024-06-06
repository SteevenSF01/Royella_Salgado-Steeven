import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";

export default function HeroHome() {
    const navigate = useNavigate();
    const notifySuccess = () =>
      toast.success("supprimé avec succès", {
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
        toast.error(`Il y a eu une erreur lors de la suppression`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });

    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/backoffice/heroHome/"
                );
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/backoffice/heroHome/${id}`);
            console.log("Deleted successfully:", res.data);
            notifySuccess();
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            console.error("Error deleting:", error);
            notifyError();
        }
    };

    return (
        <div className="w-full h-fit p-4">
          <button className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-5 rounded mb-5" onClick={() => navigate("/backoffice/heroHome/create")}>
            Créer
          </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data &&
                    data.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-cover bg-center w-full h-[400px] md:h-[500px] xl:h-[550px] 3xl:h-[650px] bg-[rgba(30,30,30,0.4)] bg-opacity-40 grid items-center justify-center text-white mb-8"
                            style={{
                                backgroundImage: `url(${item.photo})`,
                                backgroundBlendMode: "overlay",
                                backgroundColor: "rgba(30, 30, 30, 0.4)",
                            }}
                        >
                            <div className="font-Garamond 2xl:w-[600px] text-center">
                                <div className="flex space-x-2 items-center justify-center mb-5 lg:mb-6">
                                    {_.times(item.etoiles, (i) => (
                                        <FaStar
                                            className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-khaki"
                                            key={i}
                                        />
                                    ))}
                                </div>
                                <h4 className="text-base mb-4">{item.titre}</h4>
                                <div className="mb-7 md:mb-8 lg:mb-9 xl:mb-10">
                                    <h1 className="sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-semibold leading-[40px] md:leading-[50px] 3xl:leading-[70px]">
                                        {item.best}
                                    </h1>
                                    <h1 className="sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-semibold leading-[40px] lg:leading-[50px] 2xl:leading-[60px]">
                                        {item.place}
                                    </h1>
                                </div>
                            </div>
                            <div className="w-[221px] h-[50px] border-white border hidden md:flex items-center justify-center absolute left-28 top-24 lg:left-10 lg:top-24 ">
                                <BiPhoneCall className="w-5 h-5 mr-2 text-khaki" />{" "}
                                {item.telephone}
                            </div>
                            <div className="absolute top-4 right-4 flex space-x-2">
                              <Link to={`/backoffice/heroHome/update/${item.id}`}>
                                <button
                                    className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded"
                                >
                                    Modifier
                                </button>
                              </Link>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-khaki  hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <ToastContainer />
        </div>
    );
}
