import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { BiPhoneCall } from 'react-icons/bi';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default function HeroHome() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/backoffice/heroHome/');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleModify = (id) => {
    console.log('Modificar slider con id:', id);
  };

  const handleDelete = (id) => {
    console.log('Borrar slider con id:', id);
  };

  return (
    <div className="container mx-auto p-4 h-fit">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data && data.map((item) => (
          <div
            key={item.id}
            className="relative bg-cover bg-center w-full h-[400px] md:h-[500px] xl:h-[550px] 3xl:h-[650px] bg-[rgba(30,30,30,0.4)] bg-opacity-40 grid items-center justify-center text-white mb-8"
            style={{
              backgroundImage: `url(${item.photo})`,
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(30, 30, 30, 0.4)',
            }}
          >
            <div className="font-Garamond 2xl:w-[600px] text-center">
              <div className="flex space-x-2 items-center justify-center mb-5 lg:mb-6">
                {_.times(item.etoiles, (i) => (
                  <FaStar className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-khaki" key={i} />
                ))}
              </div>
              <h4 className="text-base mb-4">{item.titre}</h4>
              <div className="mb-7 md:mb-8 lg:mb-9 xl:mb-10">
                <h1 className="sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-semibold leading-[40px] md:leading-[50px] 3xl:leading-[70px]">
                  {item.best}
                </h1>
                <h1 className="sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-semibold leading-[40px] lg:leading-[50px] 2xl:leading-[60px]">
                  {item.place}
                </h1>
              </div>
            </div>
            <div className="w-[221px] h-[50px] border-white border hidden md:flex items-center justify-center absolute left-28 top-24 lg:left-10 lg:top-24 xl:left-28 xl:top-24 ">
              <BiPhoneCall className="w-5 h-5 mr-2 text-khaki" /> {item.telephone}
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button 
                onClick={() => handleModify(item.id)} 
                className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded"
              >
                Modifier
              </button>
              <button 
                onClick={() => handleDelete(item.id)} 
                className="bg-khaki  hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
