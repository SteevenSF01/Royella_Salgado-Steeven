import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Searchbar() {
    const notifySuccess = () =>
        toast.success("Data updated successfully", {
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
        toast.error("AError occurred during the upload", {
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

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        text: "",
        email: "",
        numero: "",
        address: "",
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/backoffice/contact/`);
                const donnees = res.data.slice(0, 1);
                setData(donnees);
                if (donnees.length > 0) {
                    setFormData(donnees[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            const timeoutId = setTimeout(async () => {
                const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    value
                )}&format=json`;
                try {
                    const response = await axios.get(url);
                    if (response.status === 200) {
                        setSuggestions(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching data from Nominatim:", error);
                    setSuggestions([]);
                }
            }, 500);

            return () => clearTimeout(timeoutId);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.display_name);
        setSuggestions([]);
        setFormData({
            ...formData,
            address: suggestion.display_name,
            latitude: suggestion.lat,
            longitude: suggestion.lon,
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `/api/backoffice/contact/${formData.id}/`,
                formData
            );
            notifySuccess();
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            notifyError();
            console.error("Error updating data:", error);
        }
    };

    return (
        <>
            <section className="h-fit">
                <div className="flex flex-col items-center py-10">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                        className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                    />
                    <ul className="w-full max-w-md mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.place_id}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                    handleSuggestionClick(suggestion)
                                }
                            >
                                {suggestion.display_name}
                            </li>
                        ))}
                    </ul>
                </div>
                {data &&
                    data.map((data) => (
                        <>
                            <div className="w-[900px] flex justify-center gap-4 h-fit py-10">
                                <form
                                    className="w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                    onSubmit={handleFormSubmit}
                                    key={data.id}
                                >
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="text"
                                        >
                                            Texte
                                        </label>
                                        <textarea
                                            name="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            rows={5}
                                            value={formData.text}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="numero"
                                        >
                                            Numéro
                                        </label>
                                        <input
                                            type="text"
                                            name="numero"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={formData.numero}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="address"
                                        >
                                            Adresse
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={formData.address}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="latitude"
                                        >
                                            Latitude
                                        </label>
                                        <input
                                            type="number"
                                            name="latitude"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={formData.latitude}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="longitude"
                                        >
                                            Longitude
                                        </label>
                                        <input
                                            type="number"
                                            name="longitude"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={formData.longitude}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="submit"
                                            className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Sauvegarder
                                        </button>
                                    </div>
                                </form>

                                <div className="w-[50%] h-[500px]">
                                    <iframe
                                        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${data.longitude}!3d${data.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2s!4v0&zoom=20`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </>
                    ))}
                <ToastContainer />
            </section>
        </>
    );
}
