import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, FC } from 'react';
import axios from 'axios';
import { ICharacterCard, IEpisode } from '../types/types';

interface CharacterContextType {
  characters: ICharacterCard[];
  filteredCharacters: ICharacterCard[];
  counter: number;
  filters: {
    searchTerm: string;
    species: string;
    gender: string;
    status: string;
  };
  setCounter: Dispatch<SetStateAction<number>>;
  setFilters: Dispatch<SetStateAction<CharacterContextType['filters']>>;
  allCardsLoaded: boolean;
  loading: boolean;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider:FC<{children: ReactNode}> = ({ children }) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<ICharacterCard[]>([]);
  const [counter, setCounter] = useState(8);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    searchTerm: '',
    species: '',
    gender: '',
    status: ''
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ results: ICharacterCard[] }>('https://rickandmortyapi.com/api/character/');
        
        const charactersWithEpisodes = await Promise.all(
          response.data.results.map(async (character) => {
            if (character.episode && character.episode.length > 0) {
              try {
                const episodeUrls = character.episode.slice(0, 20);
                const episodesResponse = await Promise.all(
                  episodeUrls.map(url => axios.get<IEpisode>(url))
                );
                character.episodesData = episodesResponse.map(res => res.data);
              } catch (error) {
                console.error('Error fetching episodes:', error);
                character.episodesData = [];
              }
            }
            return character;
          })
        );
        
        setCharacters(charactersWithEpisodes);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCharacters();
  }, []);

  useEffect(() => {
    const filtered = characters.filter(character => (
      character.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      (filters.species === '' || character.species === filters.species) &&
      (filters.gender === '' || character.gender === filters.gender) &&
      (filters.status === '' || character.status === filters.status)
    ));
    setFilteredCharacters(filtered);
    setCounter(8);
  }, [characters, filters]);

  const allCardsLoaded = counter >= filteredCharacters.length;

  return (
    <CharacterContext.Provider value={{
      characters,
      filteredCharacters,
      counter,
      filters,
      setCounter,
      setFilters,
      allCardsLoaded,
      loading
    }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacterContext ehkerer');
  }
  return context;
};