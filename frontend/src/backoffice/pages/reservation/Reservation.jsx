import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../loginProvider/LoginProvider";

const ReservationDetails = () => {
    const { user, authToken } = useAuth();
    const [reservation, setReservation] = useState([]);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await axios.get(
                    `/api/backoffice/reservation/`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setReservation(response.data);
            } catch (error) {
                console.error("Error fetching reservation:", error);
            }
        };

        fetchReservation();
    }, [user.id]);


    return (
        <div className="flex flex-wrap justify-center items-center my-40 w-full mx-auto p-4 font-lora gap-5">
            { reservation && reservation.map((res)=> {
                return(
                    <div className="w-[400px] mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <h1 className="bg-gray-200 text-gray-700 px-6 py-4 font-Garamond text-center text-5xl font-semibold">
                        Reservation Details
                    </h1>
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">
                                Client Information
                            </h2>
                            <div className="flex items-center">
                                <div>
                                    <div className="text-lg font-semibold">
                                        { res.client.first_name} {res.client.last_name}
                                    </div>
                                    <div className="text-gray-600">
                                        {res.client.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">
                                Room Information
                            </h2>
                            <div className="flex items-center">
                                <div>
                                    <div className="text-lg font-semibold">
                                        {res.room.nom}
                                    </div>
                                    <p className="text-gray-600 font-bold">
                                        Price per night: <span className="font-normal">${res.room.prix}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">
                                Reservation Details
                            </h2>
                            <div className="text-gray-600">
                                <p className="font-bold">Date In: <span className="font-normal">{res.date_in}</span></p>
                                <p className="font-bold">Date Out: <span className="font-normal">{res.date_out}</span></p>
                                <p className="font-bold">Adults: <span className="font-normal">{res.adultes}</span></p>
                                <p className="font-bold">Children: <span className="font-normal">{res.enfants}</span></p>
                                <p className="font-bold">Total Price: <span className="font-normal">${res.prix_total}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    );
};

export default ReservationDetails;
