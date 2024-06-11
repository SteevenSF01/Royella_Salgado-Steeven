import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
export default function AccordionFaq({ children, title, id, active = false, onSave }) {
    const [accordionOpen, setAccordionOpen] = useState(false);
    // Pour géré l'ouverture ou la fermeture du mode édition
    const [isEditing, setIsEditing] = useState(false);
    const [editeTitre, setEditTitre] = useState(title);
    // Dans ce cas le children est la réponse du FAQ
    const [editContenue, setEditContenue] = useState(children);

    useEffect(() => {
        setAccordionOpen(active);
    }, []);

    // Fonction pour sauvegarder les modifications et désactiver le mode édition
    const handleSave = () => {
        // Mettre les parametres dans le même ordre que dans la fonction handleSave, sino la question et réponse seront inversés!
        onSave(id, editeTitre, editContenue);
        setIsEditing(false);
    };

    return (
        <div className="py-2">
            <h2>
                <button
                    className="flex items-center justify-between w-full text-left font-semibold font-Garamond hover:bg-khaki focus:bg-khaki p-5 group bg-normalBlack"
                    onClick={(e) => {
                        e.preventDefault();
                        setAccordionOpen(!accordionOpen);
                    }}
                    aria-expanded={accordionOpen}
                    aria-controls={`accordion-text-${id}`}
                >
                    <span className=" text-base sm:text-lg md:text-xl 2xl:text-[22px] ">
                        {editeTitre}
                    </span>
                    <svg
                        className="fill-white shrink-0 ml-8"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            className={`transform origin-center transition duration-200 ease-out ${
                                accordionOpen && "!rotate-180"
                            }`}
                        />
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                accordionOpen && "!rotate-180"
                            }`}
                        />
                    </svg>
                </button>
            </h2>
            <div
                id={`accordion-text-${id}`}
                role="region"
                aria-labelledby={`accordion-title-${id}`}
                className={`grid text-sm sm:text-base font-Lora font-normal leading-[26px] text-white overflow-hidden transition-all duration-300 ease-in-out px-5 bg-normalBlack ${
                    accordionOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    {isEditing ? (
                        <div className="py-4">
                            <input
                                type="text"
                                value={editeTitre}
                                onChange={(e) => setEditTitre(e.target.value)}
                                className="mb-2 p-2 w-full text-black"
                            />
                            <textarea
                                value={editContenue}
                                onChange={(e) => setEditContenue(e.target.value)}
                                className="p-2 w-full text-black"
                            />
                            <button
                                onClick={handleSave}
                                className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] rounded-lg text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"                            >
                                Sauvegarder
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="mt-2 ml-2 p-2 bg-red-500 hover:bg-[rgba(255,0,0,0.9)] rounded-lg text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" 
                            >
                                Annuler
                            </button>
                        </div>
                    ) : (
                        <p className="py-4 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-[22px] font-Garamond">
                            {/* Le children équivaut à ce qu'on met entre le composant <AccordionFaq />, dans ce cas la réponse {faq.reponse} */}
                            {children}
                        </p>
                    )}
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-2 p-2 bg-khaki hover:bg-[rgba(141,115,77,0.9)] rounded-lg text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                        >
                            Modifier
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
