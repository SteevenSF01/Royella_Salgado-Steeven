import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManagerVideo() {

    const notify = () => toast.success('Mise à jour enregistrée', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });

  const [employes, setEmployes] = useState([]);
  const [formData, setFormData] = useState({
    url: '',
    nom_hotel: '',
    description: '',
    quote: '',
    employe_id: null
  });

  const getData = async () => {
    try {
      const managerRes = await axios.get("/api/backoffice/managerVideo/1");
      setFormData({
        url: managerRes.data.url || '',
        nom_hotel: managerRes.data.nom_hotel || '',
        description: managerRes.data.description || '',
        quote: managerRes.data.quote || '',
        employe_id: managerRes.data.employe?.id || ''
      });

      const employesRes = await axios.get("/api/backoffice/employe/");
      setEmployes(employesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'employe_id' ? parseInt(value) : value
    });
};
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://127.0.0.1:8000/api/backoffice/managerVideo/1/", formData);
      console.log("Data submitted successfully:", response.data);
      notify();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const employesFilter = employes.filter((employe) => employe.id !== formData.employe_id);

  return (
    <>
      <form className="w-[800px] items-center justify-center" onSubmit={handleSubmit}>
        <div className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]" data-aos="fade-up" data-aos-duration="1000">
          <label htmlFor="url" className='text-[#2d2d2d] text-[16px] font-bold'>
            URL
            <input type="url" name="url" value={formData.url} onChange={handleChange} className="w-full font-normal" placeholder="URL" />
          </label>
          <label htmlFor="nom_hotel" className='text-[#2d2d2d] text-[16px] font-bold'>
            Nom de l'hotel
            <input type="text" name="nom_hotel" value={formData.nom_hotel} onChange={handleChange} className="w-full font-normal" placeholder="Nombre del hotel" />
          </label>
          <label htmlFor="description" className='text-[#2d2d2d] text-[16px] font-bold'>
            Descripción
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full font-normal" placeholder="Descripción"></textarea>
          </label>
          <label htmlFor="quote" className='text-[#2d2d2d] text-[16px] font-bold'>
            Citation
            <textarea name="quote" value={formData.quote} onChange={handleChange} className="w-full font-normal" placeholder="Cita"></textarea>
          </label>
          <label htmlFor="employe" className='text-[#2d2d2d] text-[16px] font-bold'>
            Employe
            <select name="employe_id" value={formData.employe_id}  onChange={handleChange} className='flex'> 
              <option value="">{employes[formData.employe_id -1 ]?.nom}</option>
              {employesFilter.map((employe) => (
                <option value={employe.id} key={employe.id} className='font-normal' >
                  {employe.nom}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="bg-khaki hover:bg-[#c19d68cc] text-white font-bold py-2 px-4 rounded mt-4">Enregistrer</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
