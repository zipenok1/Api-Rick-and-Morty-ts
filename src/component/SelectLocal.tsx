import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';

function SelectLocal() {
  const { filtersLoc, setFiltersLoc } = useCharacterContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltersLoc(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltersLoc(prev => ({ ...prev, type: e.target.value }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltersLoc(prev => ({ ...prev, dimension: e.target.value }));
  };

  return (
    <div className='container mx-auto px-50'>
      <form className='flex justify-center gap-5 flex-wrap'>
        <div className='w-60 h-14 rounded-xl border-1 p-4 flex items-center gap-2'>
          <img src="img/search.svg" alt="search" />
          <input 
            className='outline-0 border-0' 
            type="text" 
            value={filtersLoc.searchTerm}
            onChange={handleSearchChange}
            placeholder="Filter by name..."
          />
        </div>

        <select 
          className='w-60 h-14 rounded-xl border-1 p-4 flex items-center gap-2'
          value={filtersLoc.type}
          onChange={handleSpeciesChange}
        >
          <option value="">Type</option>
          <option value="Planet">Planet</option>
          <option value="Cluster">Cluster</option>
          <option value="Space station">Space station</option>
          <option value="Microverse">Microverse</option>
          <option value="TV">TV</option>
          <option value="Resort">Resort</option>
        </select>

        <select 
          className='w-60 h-14 rounded-xl border-1 p-4 flex items-center gap-2'
          value={filtersLoc.dimension}
          onChange={handleGenderChange}
        >
          <option value="">Dimension</option>
          <option value="Dimension C-137">Dimension C-137</option>
        </select>
      </form> 
    </div>
  );
}

export default SelectLocal;