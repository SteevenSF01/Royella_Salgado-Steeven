import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function CreateRoom() {
    const navigate = useNavigate();

    const notifySuccess = () =>
        toast.success("Room created successfully", {
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
        toast.error("An error occured while creating the room", {
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


    const [formData, setFormData] = useState({
        nom: "",
        description: "",
        etoiles: "",
        lit: "",
        nom_lit: "",
        prix: "",
        max_adultes: "",
        max_enfants: "",
        superficie: "",
        facilitiesroom_id: [],
        photo: null
    });
    const [facilities, setFacilities] = useState([]);
    console.log(formData);
    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await axios.get("/api/backoffice/facilitiesRoom/");
            setFacilities(response.data);
        } catch (error) {
            console.error("Error fetching facilities:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            const updatedFacilities = checked
                ? [...formData.facilitiesroom_id, parseInt(value, 10)]
                : formData.facilitiesroom_id.filter(
                      (id) => id !== parseInt(value, 10)
                  );
            setFormData({ ...formData, facilitiesroom_id: updatedFacilities });
        } else if (name === "photo") {
            setFormData({ ...formData, photo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === "facilitiesroom_id") {
                formData[key].forEach((id) =>
                    formDataToSend.append("facilitiesroom_id", id)
                );
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        if (formData.photo) {
            formDataToSend.append("photo", formData.photo);
        }

        try {
            const response = await axios.post(
                "/api/backoffice/rooms/",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Room created:", response.data);
            notifySuccess()
            setTimeout(() => {
                navigate("/room");
            }, 2500);
        } catch (error) {
            console.error("Error creating room:", error);
            notifyError()
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create Room</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="number"
                    name="etoiles"
                    value={formData.etoiles}
                    onChange={handleChange}
                    placeholder="Stars"
                    required
                    min={1}
                    max={5}
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="number"
                    name="lit"
                    value={formData.lit}
                    onChange={handleChange}
                    placeholder="Number of beds"
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="text"
                    name="nom_lit"
                    value={formData.nom_lit}
                    onChange={handleChange}
                    placeholder="Type of bed"
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="number"
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="number"
                    name="max_adultes"
                    value={formData.max_adultes}
                    onChange={handleChange}
                    placeholder="Max adults"
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="number"
                    name="max_enfants"
                    value={formData.max_enfants}
                    onChange={handleChange}
                    placeholder="Max children"
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="number"
                    name="superficie"
                    value={formData.superficie}
                    onChange={handleChange}
                    placeholder="Surface"
                    required
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="file"
                    onChange={handleChange}
                    name="photo"
                    className="w-full p-2 border rounded-lg"
                />

                <div className="space-y-2">
                    <h3 className="font-semibold">Facilities</h3>
                    {facilities.map((facility) => (
                        <div key={facility.id}>
                            <input
                                type="checkbox"
                                id={`facility-${facility.id}`}
                                name="facilitiesroom_id"
                                value={facility.id}
                                checked={formData.facilitiesroom_id.includes(
                                    facility.id
                                )}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor={`facility-${facility.id}`}>
                                {facility.nom}
                            </label>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                    Create Room
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}
