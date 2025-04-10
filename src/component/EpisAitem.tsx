import { FC } from 'react';
import { IEpisode } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface EpisAitemProps {
    epis: IEpisode;
}

const EpisAitem: FC<EpisAitemProps> = ({ epis }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/epis/${epis.id}`); 
  };

  return (
    <div 
      className='bg-gray-50 w-60 h-32 rounded-lg bg-center flex flex-col justify-center items-center shadow-lg cursor-pointer text-center'
      onClick={handleClick}
    >
        <h3 className='font-semibold w-40'>{epis.name}</h3>
        <p className='text-sm text-gray-600'>{epis.air_date}</p>   
    </div> 
  );
};

export default EpisAitem