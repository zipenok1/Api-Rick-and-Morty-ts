import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';

function SelectForm() {
  const { filters, setFilters } = useCharacterContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, species: e.target.value }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, gender: e.target.value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, status: e.target.value }));
  };

  return (
    <div className='lg:container mx-auto px-50 md:container'>
      <form className='flex justify-center gap-5 flex-wrap'>
        <div className='w-60 h-14 rounded-xl border-1 p-4 flex items-center gap-2'>
          <img src="img/search.svg" alt="search" />
          <input 
            className='outline-0 border-0' 
            type="text" 
            value={filters.searchTerm}
            onChange={handleSearchChange}
            placeholder="Filter by name..."
          />
        </div>

        <select 
          className='w-60 h-14 rounded-xl border-1 p-4 flex items-center gap-2'
          value={filters.species}
          onChange={handleSpeciesChange}
        >
          <option value="">Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>

        <select 
          className='w-60 h-14 rounded-xl border-1 p-4 flex items-center gap-2'
          value={filters.gender}
          onChange={handleGenderChange}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="unknown">Unknown</option>
        </select>

        <select 
          className='w-60 h-14 rounded-xl border-1 p-4 flex items-center gap-2'
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option value="">Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </form> 
    </div>
  );
}

export default SelectForm;