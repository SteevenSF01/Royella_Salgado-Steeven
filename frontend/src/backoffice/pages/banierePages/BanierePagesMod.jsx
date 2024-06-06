import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BanierePagesMod() {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageChoisie, setImageChoisie] = useState(null);

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

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("/api/backoffice/banierePages/1");
                setImagePreview(res.data.image);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageChoisie(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageChoisie) return;

        const formData = new FormData();
        formData.append("image", imageChoisie);

        try {
            const res = await axios.put(
                "/api/backoffice/banierePages/1/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setImagePreview(res.data.image);
            console.log("Image updated successfully!", res.data);
            notifySuccess();
        } catch (error) {
            console.error("Error updating image:", error);
            notifyError();
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4">
                    Modify Background Image
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 bg-white p-6 rounded shadow-md"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="image"
                        >
                            Upload New Image
                        </label>
                        <input
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
                {imagePreview && (
                    <section
                        className="bg-no-repeat bg-cover h-[550px] bg-center grid items-center justify-center mt-8"
                        style={{
                            backgroundImage: `url(${imagePreview})`,
                            backgroundBlendMode: "overlay",
                            backgroundColor: "rgba(30, 30, 30, 0.5)",
                        }}
                    >
                        <div className="mt-10 text-center">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-10 lg:leading-[60px] 2xl:leading-[70px] text-white font-semibold font-Garamond uppercase">
                                Background Preview
                            </h1>
                        </div>
                    </section>
                )}
            </div>
            <ToastContainer />
        </>
    );
}
