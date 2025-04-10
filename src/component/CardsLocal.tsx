import { FC } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import LocalAitem from './LocalAitem';

const CardsLocal: FC = () => {
  const { setCounterLocal, counterLocal, allLocalLoaded, filteredLocations } = useCharacterContext();
  
  return (
    <>
      <div className='flex flex-wrap gap-5 py-10 justify-center container mx-auto px-50'>
        {filteredLocations.slice(0, counterLocal).map(el =>
           <LocalAitem  key={el.id} local={el}/>
        )}
      </div>
        
      {!allLocalLoaded && filteredLocations.length > 0 && (
        <div className='container mx-auto px-50 flex justify-center pb-26 pt-8'>
        <button 
          onClick={() => setCounterLocal(prev => prev + 8)} 
          className='w-38 h-9 bg-white text-cyan-400 text-sm shadow-lg uppercase cursor-pointer'
        >
          LOAD MORE
        </button>
      </div>
      )}

    </>
  );
};

export default CardsLocal;