import Accordion from "./Accordion";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AnimatedAccordionPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(
          "/api/backoffice/faq/"
        );
        setFaqs(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFaqs();
  }, []);


  return (
    <main className="relative flex flex-col justify-center  overflow-hidden">
      <div className="w-full mx-auto px-4 md:px-6 ">
        <div
          className=" grid items-end grid-cols-1 lg:grid-cols-2  gap-x-[30px]"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              title={faq.question}
              id={`faqs-${faq.id}`}
              active={faq.active}
            >
              {faq.reponse}
            </Accordion>
          ))}
        </div>
      </div>
    </main>
  );
}
