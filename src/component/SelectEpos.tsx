import React from 'react';
import { useEpisodeContext } from '../context/EpisodesContent';

function SelectEpos() {
  const { filtersEpi, setFiltersEpi } = useEpisodeContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltersEpi(prev => ({ ...prev, searchTerm: e.target.value }));
  };
  
  return (
    <div className='container mx-auto px-50'>
      <form className='flex justify-center gap-5'>
        <div className='w-lg h-14 rounded-xl border-1 p-4 flex items-center gap-2'>
          <img src="img/search.svg" alt="search" />
          <input 
            className='outline-0 border-0 w-96' 
            type="text" 
            value={filtersEpi.searchTerm}
            onChange={handleSearchChange}
            placeholder="Filter by name or episode (ex. S01 or S01E02)"
          />
        </div>
      </form> 
    </div>
  );
}

export default SelectEpos;