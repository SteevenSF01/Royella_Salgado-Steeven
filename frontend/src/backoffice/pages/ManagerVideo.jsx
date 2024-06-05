import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ManagerVideo() {
    const [managerHome, setManagerHome] = useState([])
    const [employes, setEmployes] = useState([])
    const [formData, setFormData] = useState({
        url: '',
        nom_hotel: '',
        description: '',
        quote: '',
        employe: ''
      });

    const getData = async () => {
        try {
          const managerRes = await axios.get("/api/backoffice/managerVideo/1");
          setManagerHome(managerRes.data);

          const employesRes = await axios.get("/api/backoffice/employe/");
          setManagerHome(employesRes.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

//   console.log(managerHome)
//   console.log(employes)
  return (
    <>
        <form  className="w-[800px] items-center justify-center">
        <div className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]" data-aos="fade-up" data-aos-duration="1000">
            <input type="url" name="url" value={managerHome.url} onChange={handleChange} className="w-full" placeholder="URL" />
            <input type="text" name="nom_hotel" value={managerHome.nom_hotel} onChange={handleChange} className="w-full" placeholder="Nombre del hotel" />
            <textarea name="description" value={managerHome.description} onChange={handleChange} className="w-full" placeholder="Descripción"></textarea>
            <textarea name="quote" value={managerHome.quote} onChange={handleChange} className="w-full" placeholder="Cita"></textarea>
            {/* Aquí deberías agregar un campo select para el empleado */}
            {/* <input type="text" name="employe" value={managerHome.employe} onChange={handleChange} className="w-full" placeholder="Empleado" /> */}
        <button type="submit" className="bg-khaki hover:bg-[#c19d68cc] text-white font-bold py-2 px-4 rounded mt-4 ml-4">Enregistrer</button>
        </div>
        </form> 
    </>
  )
}
