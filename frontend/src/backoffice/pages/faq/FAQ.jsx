import { useEffect, useState } from "react";
import axios from "axios";
import AccordionFaq from "./AccordionFaq";

export default function FAQ() {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get("/api/backoffice/faq/");
                setFaqs(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFaqs();
    }, []);

    // Fonction pour sauvegarder les modifications apportées au FAQ
    const handleSave = async (id, nouveauTitre, nouveauContenue) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/backoffice/faq/${id}/`,
                {
                    question: nouveauTitre,
                    reponse: nouveauContenue,
                }
            );

            // Pour mettre à jour l'useState de faqs en comparant l'id donné en paramètre
            if (response.status === 200) {
                const updatedFaqs = faqs.map((faq) =>
                    faq.id === id
                        ? { ...faq, question: nouveauTitre, reponse: nouveauContenue }
                        : faq
                );
                setFaqs(updatedFaqs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <h1 className="my-5 text-center text-3xl font-bold">FAQ</h1>
            <main className="relative flex flex-col justify-center overflow-hidden text-white mb-20">
                <div className="w-full mx-auto px-4 md:px-6">
                    <div className="grid items-end grid-cols-1 lg:grid-cols-2 gap-x-[30px]">
                        {faqs &&
                            faqs.map((faq) => (
                                <AccordionFaq
                                    key={faq.id}
                                    id={faq.id}
                                    title={faq.question}
                                    active={faq.active}
                                    // la fonction pour appliquer les changements dans les faqs 'onSave'
                                    onSave={handleSave}
                                >
                                    {faq.reponse}
                                </AccordionFaq>
                            ))}
                    </div>
                </div>
            </main>
        </section>
    );
}
