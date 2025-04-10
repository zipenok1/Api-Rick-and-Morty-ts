import { FC } from 'react';
import { ICharacterCard } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface CardsAitemProps {
    card: ICharacterCard,
}

const CardsAitem: FC<CardsAitemProps> = ({ card }) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${card.id}`); 
  };

  return (
    <div 
      className='w-60 h-60 rounded-lg bg-center flex items-end shadow-lg cursor-pointer hover:shadow-2xl transition-shadow'
      style={{ backgroundImage: `url(${card.image})` }}
      onClick={handleClick}
    >
      <div className='bg-white w-60 h-18 rounded-b-lg py-2 px-4'>
        <h3 className='font-semibold'>{card.name}</h3>
        <p className='text-sm text-gray-600'>{card.species}</p>
      </div>       
    </div> 
  );
};

export default CardsAitem;