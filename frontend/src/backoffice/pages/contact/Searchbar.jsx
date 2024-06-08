import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Searchbar() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`/api/backoffice/contact/`);
                setData(res.data);
            }catch(error){
                console.error(error);
            }
        };
        fetchData();
    }, []);
    console.log(data);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            // Ajout du debouncing pour limiter le nombre de requêtes à la fois
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
        setSelectedLocation({
            lat: suggestion.lat,
            lon: suggestion.lon,
            displayName: suggestion.display_name,
        });
        setQuery(suggestion.display_name);
        setSuggestions([]);
    };

    return (
        <div className="flex flex-col items-center mt-10">
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
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion.display_name}
                    </li>
                ))}
            </ul>
            {selectedLocation && (
                <div className="w-full max-w-md mt-5">
                    <div className="w-[400px] h-[400px] bg-red-500 "></div>
                    <div>
                        <p>
                            Latitude: {selectedLocation.lat}, Longitude:{" "}
                            {selectedLocation.lon} adresse:{" "}
                            {selectedLocation.displayName}
                        </p>
                        <iframe
                            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${selectedLocation.lon}!3d${selectedLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2s!4v0&zoom=20`}
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
