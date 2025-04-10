import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, FC } from 'react';
import axios from 'axios';
import { IEpisode, ICharacterCard } from '../types/types';

interface EpisodeContextType {
  episodes: IEpisode[];
  filteredEpisodes: IEpisode[];
  counterEpi: number;
  filtersEpi: {
    searchTerm: string;
  };
  setCounterEpi: Dispatch<SetStateAction<number>>;
  setFiltersEpi: Dispatch<SetStateAction<EpisodeContextType['filtersEpi']>>;
  allEpiLoaded: boolean;
  loading: boolean;
}

const EpisodeContext = createContext<EpisodeContextType | undefined>(undefined);

export const EpisodeProvider:FC<{children: ReactNode}> = ({ children }) => {
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<IEpisode[]>([]);
  const [counterEpi, setCounterEpi] = useState(8);
  const [loading, setLoading] = useState(true);

  const [filtersEpi, setFiltersEpi] = useState({
    searchTerm: ''
  });

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ results: IEpisode[] }>('https://rickandmortyapi.com/api/episode/');
        
        const episodesWithCharacters = await Promise.all(
            response.data.results.map(async (episode) => {
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
            }));
        
        setEpisodes(episodesWithCharacters);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEpisodes();
  }, []);

  useEffect(() => {
    const filtered = episodes.filter(episode => (
      episode.name.toLowerCase().includes(filtersEpi.searchTerm.toLowerCase())
    ));
    setFilteredEpisodes(filtered);
    setCounterEpi(8);
  }, [episodes, filtersEpi]);

  const allEpiLoaded = counterEpi >= filteredEpisodes.length;

  return (
    <EpisodeContext.Provider value={{
      episodes,
      filteredEpisodes,
      counterEpi,
      filtersEpi,
      setCounterEpi,
      setFiltersEpi,
      allEpiLoaded,
      loading
    }}>
      {children}
    </EpisodeContext.Provider>
  );
};

export const useEpisodeContext = () => {
  const context = useContext(EpisodeContext);
  if (context === undefined) {
    throw new Error('useEpisodeContext ehkerer');
  }
  return context;
};