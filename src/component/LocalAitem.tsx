import React, { FC } from 'react';
import { ILocation } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface LocalAitemProps {
    local: ILocation;
}

const LocalAitem: FC<LocalAitemProps> = ({ local }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/local/${local.id}`); 
    };

  return (
    <div 
      className='bg-gray-50 w-60 h-32 rounded-lg bg-center flex flex-col justify-center items-center shadow-lg cursor-pointer text-center'
      onClick={handleClick}
    >
        <h3 className='font-semibold w-50'>{local.name}</h3>
        <p className='text-sm text-gray-600'>{local.type}</p>   
    </div> 
  );
};

export default LocalAitem;