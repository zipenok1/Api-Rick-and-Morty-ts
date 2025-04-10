import { FC } from 'react';
import CardsAitem from './CardsAitem';
import { useCharacterContext } from '../context/CharacterContext';

const Cards: FC = () => {
  const { filteredCharacters, counter, setCounter, allCardsLoaded } = useCharacterContext();
  
  return (
    <>
      <div className='flex flex-wrap gap-5 py-10 justify-center container mx-auto px-50'>
        {filteredCharacters.slice(0, counter).map(el =>
          <CardsAitem key={el.id} card={el}/>  
        )}
      </div>
        {!allCardsLoaded && filteredCharacters.length > 0 && (
        <div className='container mx-auto px-50 flex justify-center pb-10 pt-4'>
          <button 
            onClick={() => setCounter(prev => prev + 8)} 
            className='w-38 h-9 bg-white text-cyan-400 text-sm shadow-lg uppercase cursor-pointer'
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
};

export default Cards;