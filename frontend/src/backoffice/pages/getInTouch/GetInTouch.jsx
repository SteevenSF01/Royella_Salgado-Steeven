import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Inbox = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [emailsRecieved, setEmailsRecieved] = useState([]);
    const formatDate = (date) => {
        return moment(date).format("MMMM D, YYYY");
    };
    

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("/api/getintouch/");
                setEmailsRecieved(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    console.log(emailsRecieved);
    const handleEmailSelect = (email) => {
        setSelectedEmail(email);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Inbox</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Lista de correos */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden text-black">
                    {emailsRecieved && emailsRecieved.map((email) => (
                        <div
                            key={email.id}
                            className={`px-4 py-3 border-b border-gray-200 cursor-pointer ${
                                selectedEmail && selectedEmail.id === email.id
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() => handleEmailSelect(email)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-gray-600 text-sm">
                                            {email.nom
                                                .slice(0, 1)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {email.nom}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    {formatDate(email.date_sent)}
                                </p>
                            </div>
                            <p className="text-gray-700 mt-2 line-clamp-2">{email.contenue}</p>
                        </div>
                    ))}
                </div>

                {/* Detalle del correo seleccionado */}
                {selectedEmail && (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden text-black">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-gray-600 text-sm">
                                            {selectedEmail.nom
                                                .slice(0, 1)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {selectedEmail.nom}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    {formatDate(selectedEmail.date_sent)}
                                </p>
                            </div>
                            <p className="text-gray-700">
                                {selectedEmail.contenue}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
