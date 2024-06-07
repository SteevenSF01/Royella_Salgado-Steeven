import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FooterImages() {
    const [footerImages, setFooterImages] = useState([]);
    const [imageChoisie, setImageChoisie] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImageId, setSelectedImageId] = useState(null);

    const notifySuccess = () =>
        toast.success("Image uploaded successfully", {
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
        toast.error("An error occurred during the upload", {
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

    // Pour get les images
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("/api/backoffice/footerGallery/");
                setFooterImages(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    // Pour la preview de l'image et la selection, image choisie => c'est la potontielle image a changer, image preview => image a previewer
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageChoisie(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Pour le submit de l'image
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageChoisie) return;

        const formData = new FormData();
        formData.append("image", imageChoisie);
        try {
            const res = await axios.put(
                `http://127.0.0.1:8000/api/backoffice/footerGallery/${selectedImageId}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setImagePreview(null);
            setImageChoisie(null);
            setSelectedImageId(null);
            notifySuccess();
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            console.error("Error uploading image:", error);
            notifyError();
        }
    };

    const handlePreview = (image) => {
        setImagePreview(image.image);
        setSelectedImageId(image.id);
    };

    return (
        <>
            <div className="mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mx-auto p-4 max-w-lg">
                    <h1 className="text-2xl font-semibold mb-4">
                        Upload les images du footer
                    </h1>
                    <div className="space-y-4 bg-white p-6 rounded shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="image"
                                >
                                    Upload une nouvelle image
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
                                    Sauvegarder
                                </button>
                            </div>
                        </form>
                        {imagePreview && (
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">
                                    Image Preview
                                </h2>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-auto"
                                    style={{ maxHeight: "calc(100vh - 500px)" }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <h2 className="text-xl font-semibold mb-4 col-span-full">
                        Footer Gallery
                    </h2>
                    {footerImages.map((image) => (
                        <div key={image.id} className="relative">
                            <img
                                src={image.image}
                                alt={`Footer ${image.id}`}
                                className="w-full h-auto"
                            />
                            <button
                                className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-semibold py-2 px-4 rounded focus:outline-none  absolute bottom-0 right-0"
                                onClick={() => handlePreview(image)}
                            >
                                Modifier
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
