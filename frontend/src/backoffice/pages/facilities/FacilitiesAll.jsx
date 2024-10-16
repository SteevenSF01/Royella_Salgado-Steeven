import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const FacilitiesAll = () => {
    const [facilities, setFacilities] = useState([]);
    const [newOrder, setNewOrder] = useState(1);
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({
        nom: "",
        sous_titre: "",
        description: "",
        order: newOrder,
    });
    // GET les données
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("/api/backoffice/facilities/");
                const resSlice = res.data.slice(0, 4);
                setFacilities(resSlice);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    // Function pour edit
    const handleEdit = (facilitie) => {
        setEditMode(facilitie.id);
        setEditData({
            nom: facilitie.nom,
            sous_titre: facilitie.sous_titre,
            description: facilitie.description,
            order: newOrder,
        });
    };
    // Function pour changer les données
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };
    // Function pour sauvegarder les données
    const handleSave = async (id) => {
        try {
            await axios.put(`/api/backoffice/facilities/${id}/`, editData);
            setEditMode(null);
            const res = await axios.get("/api/backoffice/facilities/");
            const resSlice = res.data.slice(0, 4);
            setFacilities(resSlice);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="dark:bg-mediumBlack">
            <section className="Container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]">
                <div className="">
                    {facilities &&
                        facilities.map((facilitie) => {
                            // Pour eviter que l'edit s'ouvre dans tout les facilities en mettant que l'useState soit égale à facilitie.id
                            const isEditing = editMode === facilitie.id;
                            return facilitie.order % 2 === 0 ? (
                                <>
                                    <hr className="text-[#e8e8e8] dark:text-[#383838] mb-10 mt-10" />
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-2"
                                        key={facilitie.id}
                                    >
                                        <div className="relative w-full h-[100%] md:pr-[30px]">
                                            <img
                                                src={facilitie.photo}
                                                alt=""
                                                className="w-full h-full"
                                            />
                                            <div className="hidden md:block absolute -top-[0px] md:-right-[12%] -right-[7%] xl:-right-[5%]">
                                                <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px] text-khaki font-Garamond">
                                                    0{facilitie.order}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="relative text-black font-Garamond md:ml-[60px] lg:ml-[107px] mt-3 md:mt-0 h-full">
                                            {isEditing ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        name="nom"
                                                        value={editData.nom}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full mb-2 text-black"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="sous_titre"
                                                        value={
                                                            editData.sous_titre
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full mb-2 text-black"
                                                    />
                                                    <textarea
                                                        name="description"
                                                        value={
                                                            editData.description
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full mb-2"
                                                    ></textarea>
                                                    <select
                                                        value={editData.order}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        name="order"
                                                        className="w-full mb-2 text-black"
                                                    >
                                                        {facilities.map(
                                                            (facility) => (
                                                                <option
                                                                    key={
                                                                        facility.order
                                                                    }
                                                                    value={
                                                                        facility.order
                                                                    }
                                                                >
                                                                    {
                                                                        facility.order
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <button
                                                        onClick={() =>
                                                            handleSave(
                                                                facilitie.id
                                                            )
                                                        }
                                                        className="bg-khaki text-white px-3 py-1 mb-2 rounded-lg"
                                                    >
                                                        Sauvegarder
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                facilitie
                                                            )
                                                        }
                                                        className="bg-khaki text-white px-3 py-1 mb-2 rounded-lg"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <h4 className="text-base font-semibold text-khaki leading-[26px] pb-[6px] uppercase mt-2 md:mt-0">
                                                        {facilitie.nom}
                                                    </h4>
                                                    <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white">
                                                        <Link to="/service_details">
                                                            {
                                                                facilitie.sous_titre
                                                            }
                                                        </Link>
                                                    </h1>
                                                    <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px] relative">
                                                        {facilitie.description}
                                                    </p>
                                                </>
                                            )}
                                            <Link to="/service_details">
                                                <HiArrowLongRight
                                                    size={30}
                                                    className="text-gray hover:text-khaki"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <hr className="text-[#e8e8e8] dark:text-[#383838] mb-10 mt-10" />
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-2"
                                        key={facilitie.id}
                                    >
                                        <div className="font-Garamond md:mr-[2px] lg:mr-[110px] h-full text-black">
                                            {isEditing ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        name="nom"
                                                        value={editData.nom}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full mb-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="sous_titre"
                                                        value={
                                                            editData.sous_titre
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full mb-2"
                                                    />
                                                    <textarea
                                                        name="description"
                                                        value={
                                                            editData.description
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full mb-2"
                                                    ></textarea>
                                                    <select
                                                        value={editData.order}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        name="order"
                                                        className="w-full mb-2 text-black"
                                                    >
                                                        {facilities.map(
                                                            (facility) => (
                                                                <option
                                                                    key={
                                                                        facility.order
                                                                    }
                                                                    value={
                                                                        facility.order
                                                                    }
                                                                >
                                                                    {
                                                                        facility.order
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <button
                                                        onClick={() =>
                                                            handleSave(
                                                                facilitie.id
                                                            )
                                                        }
                                                        className="bg-khaki text-white px-3 py-1 mb-2 rounded-lg"
                                                    >
                                                        Sauvegarder
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                facilitie
                                                            )
                                                        }
                                                        className="bg-khaki text-white px-3 py-1 mb-2 rounded-lg"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <h4 className="text-base font-semibold text-khaki leading-[26px] pb-[6px] uppercase">
                                                        {facilitie.nom}
                                                    </h4>
                                                    <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white">
                                                        <Link to="/service_details">
                                                            {
                                                                facilitie.sous_titre
                                                            }
                                                        </Link>
                                                    </h1>
                                                    <p className="font-Lora relative text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px]">
                                                        {facilitie.description}
                                                    </p>
                                                </>
                                            )}
                                            <Link to="/service_details">
                                                <HiArrowLongRight
                                                    className="text-gray hover:text-khaki"
                                                    size={30}
                                                />
                                            </Link>
                                        </div>

                                        <div className="w-full md:pl-[30px] relative mt-5 md:mt-0">
                                            <img
                                                src={facilitie.photo}
                                                alt=""
                                                className="w-full h-full"
                                            />
                                            <div className="hidden md:block absolute -top-[0px] -left-[12%] xl:-left-[6%]">
                                                <h1 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px] text-khaki font-Garamond">
                                                    0{facilitie.order}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                </div>
            </section>
        </div>
    );
};

export default FacilitiesAll;
