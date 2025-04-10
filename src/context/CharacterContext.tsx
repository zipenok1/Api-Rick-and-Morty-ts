import React, { createContext, useContext, useState, useEffect } from 'react';
import { ICharacterCard, IEpisode, ILocation, IResidents } from '../types/types';
import axios from 'axios';

interface CharacterContextType {
  characters: ICharacterCard[],
  filteredCharacters: ICharacterCard[],
  filteredLocations: ILocation[],
  filteredEpisode: IEpisode[],
  locations: ILocation[],
  episode: IEpisode[],
  counter: number,
  counterLocal: number,
  counterEpi: number,
  filters: {
    searchTerm: string,
    species: string,
    gender: string,
    status: string,
  };
  filtersLoc: {
    searchTerm: string,
    type: string,
    dimension: string,
  };
  filtersEpi: {
    searchTerm: string,
  }
  
  setCounter: React.Dispatch<React.SetStateAction<number>>
  setCounterLocal: React.Dispatch<React.SetStateAction<number>>
  setCounterEpi: React.Dispatch<React.SetStateAction<number>>
  setFilters: React.Dispatch<React.SetStateAction<CharacterContextType['filters']>>
  setFiltersLoc: React.Dispatch<React.SetStateAction<CharacterContextType['filtersLoc']>>
  setFiltersEpi: React.Dispatch<React.SetStateAction<CharacterContextType['filtersEpi']>>
  allCardsLoaded: boolean
  allLocalLoaded: boolean
  allEpiLoaded: boolean
  loading: boolean
}
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [episode, setEpisode] = useState<IEpisode[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<ICharacterCard[]>([]);
  const [filteredLocations, setfilteredLocations] = useState<ILocation[]>([]);
  const [filteredEpisode, setfilteredEpisode] = useState<IEpisode[]>([]);

  const [counter, setCounter] = useState(8);
  const [counterLocal, setCounterLocal] = useState(8);
  const [counterEpi, setCounterEpi] = useState(8);

  const [filters, setFilters] = useState({
    searchTerm: '',
    species: '',
    gender: '',
    status: ''
  });

  const [filtersLoc, setFiltersLoc] = useState({
    searchTerm: '',
    type: '',
    dimension: ''
  });

  const [filtersEpi, setFiltersEpi] = useState({
    searchTerm: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCharacters = async () => {
      try {
        setLoading(true);
        
        const [response, responseLocal,responseEpisode ] = await Promise.all([
          axios.get<{ results: ICharacterCard[] }>('https://rickandmortyapi.com/api/character/'),
          axios.get<{ results: ILocation[] }>('https://rickandmortyapi.com/api/location/'),
          axios.get<{ results: IEpisode[] }>('https://rickandmortyapi.com/api/episode/')
        ]);
        
        const episodesWithCharacters = await Promise.all(
          responseEpisode.data.results.map(async (episode) => {
            if (episode.characters && episode.characters.length > 0) {
              try {
                const characterUrls = episode.characters.slice(0, 20);
                const charactersResponse = await Promise.all(
                  characterUrls.map(url => axios.get<ICharacterCard>(url))
                );
                episode.charactersData = charactersResponse.map(res => res.data);
              } catch (error) {
                console.error('Error fetching characters for episode:', error);
                episode.charactersData = [];
              }
            }
            return episode;
          })
        );
        
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
        
        const locationsWithcharacters = await Promise.all(
        responseLocal.data.results.map(async (location) => {
          if (location.residents && location.residents.length > 0) {
            try {
              const episodeUrls = location.residents.slice(0, 20);
              const episodesResponse = await Promise.all(
                episodeUrls.map(url => axios.get<IResidents>(url))
              );
              location.residentsData = episodesResponse.map(res => res.data);
            } catch (error) {
              console.error('Error fetching episodes:', error);
              location.residentsData = [];
            }
          }
          return location;
        })
      );
        setEpisode(episodesWithCharacters)
        setLocations(locationsWithcharacters)
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
    const filtered = characters.filter(character => {
      return (
        character.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        (filters.species === '' || character.species === filters.species) &&
        (filters.gender === '' || character.gender === filters.gender) &&
        (filters.status === '' || character.status === filters.status)
      )
    })

    setFilteredCharacters(filtered)
    setCounter(8)
  }, [characters, filters])


  useEffect(() => {
    const filterEpi = episode.filter(epis => {
      return (
        epis.name.toLowerCase().includes(filtersEpi.searchTerm.toLowerCase())
      )
    })

    setfilteredEpisode(filterEpi)
    setCounterEpi(8)
  }, [episode, filtersEpi])

  useEffect(() => {
    const filterLoc = locations.filter(local=> {
      return (
        local.name.toLowerCase().includes(filtersLoc.searchTerm.toLowerCase()) &&
        (filtersLoc.type === '' || local.type == filtersLoc.type) &&
        (filtersLoc.dimension === '' || local.dimension == filtersLoc.dimension)
      )
    })

    setfilteredLocations(filterLoc)
    setCounterLocal(8)
  }, [locations, filtersLoc])
  
  const allEpiLoaded = counterEpi >= filteredEpisode.length
  const allCardsLoaded = counter >= filteredCharacters.length
  const allLocalLoaded = counterLocal >= filteredLocations.length
   
  return (
    <CharacterContext.Provider value={{
      characters,
      episode,
      locations,
      filters,
      filtersLoc,
      filtersEpi,
      filteredCharacters,
      filteredEpisode,
      filteredLocations,
      setCounter,
      setCounterEpi,
      setCounterLocal,
      setFilters,
      setFiltersEpi,
      setFiltersLoc,
      allCardsLoaded,
      allLocalLoaded,
      allEpiLoaded,
      loading,
      counter,
      counterEpi,
      counterLocal
    }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext)
  if (context === undefined) {
    throw new Error('ehkere');
  }
  return context;
};