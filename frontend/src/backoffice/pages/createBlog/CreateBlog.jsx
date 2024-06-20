import { useState, useEffect } from "react";
import { useAuth } from "../loginProvider/LoginProvider";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateBlog = () => {

    const notifySuccess = () =>
        toast.success("Blog created successfully", {
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
        toast.error("Error creating blog", {
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


    const { user } = useAuth();
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);
    const [formData, setFormData] = useState();
    useEffect(() => {
        setFormData({
            titre: "",
            contenue: "",
            image: null,
            auteur_id: user.id,
            categorie_id: "",
            tags_id: [],
        })    
    }, [user]);
    console.log(formData);

    useEffect(() => {
        if (user) {
            setFormData((prevState) => ({
                ...prevState,
                auteur_id: user.id,
            }));
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/backoffice/tags`);
                setTags(res.data);
                const resCategorie = await axios.get(`/api/backoffice/categories`);
                setCategories(resCategorie.data);
                const resBlogs = await axios.get(`/api/backoffice/blog/`);
                setAllBlogs(resBlogs.data.results);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    console.log(allBlogs);
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === "image" ? files[0] : value,
        });
    };

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        const tagId = parseInt(value, 10);
        setFormData((prevState) => ({
            ...prevState,
            tags_id: checked
                ? [...prevState.tags_id, tagId]
                : prevState.tags_id.filter((id) => id !== tagId),
        }));
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append("titre", formData.titre);
        submitData.append("contenue", formData.contenue);
        submitData.append("image", formData.image);
        submitData.append("auteur_id", formData.auteur_id);
        submitData.append("categorie_id", formData.categorie_id);
        formData.tags_id.forEach((tag) => {
            submitData.append("tags_id", tag);
        });
    
        try {
            const res = await axios.post("/api/backoffice/blog/", submitData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Blog created:", res.data);
            notifySuccess();
            setTimeout(() => {
                window.location.href = "/blog";
            }, 2500);
        } catch (error) {
            console.error("Error during blog creation:", error);
            notifyError();
        }
    };
    
    

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg my-48">
            <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                        Title:
                    </label>
                    <input
                        id="titre"
                        name="titre"
                        type="text"
                        value={formData?.titre}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="contenue" className="block text-sm font-medium text-gray-700">
                        Content:
                    </label>
                    <textarea
                        id="contenue"
                        name="contenue"
                        value={formData?.contenue}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="4"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image:
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categorie_id" className="block text-sm font-medium text-gray-700">
                        Category:
                    </label>
                    <select
                        id="categorie_id"
                        name="categorie_id"
                        value={formData?.categorie_id}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Category</option>
                        {categories.map((categorie) => (
                            <option key={categorie.id} value={categorie.id}>
                                {categorie.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags:
                    </label>
                    <div>
                        {tags.map((tag) => (
                            <div key={tag.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`tag-${tag.id}`}
                                    value={tag.id}
                                    checked={formData?.tags_id.includes(tag.id)}
                                    onChange={handleTagChange}
                                    className="mr-2"
                                />
                                <label htmlFor={`tag-${tag.id}`}>{tag.nom}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded"
                >
                    Create Blog
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateBlog;
