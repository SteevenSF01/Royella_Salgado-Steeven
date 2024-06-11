import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

export default function HeroHomeUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const notifySuccess = () =>
        toast.success("Modification avec succès", {
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
        toast.error(`Oups, une erreur est survenue lors de la modification`, {
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

    const [titre, setTitre] = useState("");
    const [photo, setPhoto] = useState(null);
    const [best, setBest] = useState("");
    const [place, setPlace] = useState("");
    const [etoiles, setEtoiles] = useState(0);
    const [telephone, setTelephone] = useState("");


    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await axios.get(`/api/backoffice/heroHome/${id}`);
            setTitre(res.data.titre);
            setBest(res.data.best);
            setPlace(res.data.place);
            setEtoiles(res.data.etoiles);
            setTelephone(res.data.telephone);
        }catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("titre", titre);
        if (photo) {
            formData.append("photo", photo);
        }
        formData.append("best", best);
        formData.append("place", place);
        formData.append("etoiles", etoiles);
        formData.append("telephone", telephone);
        
        try {
            const res = await axios.put(
                `/api/backoffice/heroHome/${id}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Form submitted successfully:", res.data);
            notifySuccess();
            setTimeout(() => {
                navigate("/backoffice/heroHome");
            }, 2500);
        } catch (error) {
            console.error("Error submitting form:", error);
            notifyError();
        }
    };

    return (
        <>
            <section className="text-black">
                <div className="container mx-auto p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 bg-white p-6 rounded shadow-md"
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="titre"
                            >
                                Titre
                            </label>
                            <input
                                id="titre"
                                type="text"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Titre"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="photo"
                            >
                                Photo
                            </label>
                            <input
                                id="photo"
                                type="file"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Photo"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="best"
                            >
                                Best
                            </label>
                            <input
                                id="best"
                                type="text"
                                value={best}
                                onChange={(e) => setBest(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Best"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="place"
                            >
                                Place
                            </label>
                            <input
                                id="place"
                                type="text"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Place"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="etoiles"
                            >
                                Etoiles
                            </label>
                            <input
                                min={0}
                                max={5}
                                id="etoiles"
                                type="number"
                                value={etoiles}
                                onChange={(e) => setEtoiles(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Etoiles"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="telephone"
                            >
                                Telephone
                            </label>
                            <input
                                id="telephone"
                                type="text"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Telephone"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Modifier
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
}
