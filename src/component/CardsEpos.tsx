import { FC } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import EpisAitem from './EpisAitem';

const CardsEpos: FC = () => {
  const { setCounterEpi, counterEpi, allLocalLoaded, filteredEpisode } = useCharacterContext();
  
  return (
    <>
      <div className='flex flex-wrap gap-5 py-10 justify-center container mx-auto px-50'>
        {filteredEpisode.slice(0, counterEpi).map(el =>
           <EpisAitem key={el.id} epis={el} />
        )}
      </div>
        
      {!allLocalLoaded && filteredEpisode.length > 0 && (
        <div className='container mx-auto px-50 flex justify-center pb-24 pt-8'>
        <button 
          onClick={() => setCounterEpi(prev => prev + 8)} 
          className='w-38 h-9 bg-white text-cyan-400 text-sm shadow-lg uppercase cursor-pointer'
        >
          LOAD MORE
        </button>
      </div>
      )}

    </>
  );
};
export default CardsEpos