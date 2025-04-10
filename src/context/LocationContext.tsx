import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, FC } from 'react';
import axios from 'axios';
import { ILocation, IResidents } from '../types/types';

interface LocationContextType {
  locations: ILocation[];
  filteredLocations: ILocation[];
  counterLocal: number;
  filtersLoc: {
    searchTerm: string;
    type: string;
    dimension: string;
  };
  setCounterLocal: Dispatch<SetStateAction<number>>;
  setFiltersLoc: Dispatch<SetStateAction<LocationContextType['filtersLoc']>>;
  allLocalLoaded: boolean;
  loading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider:FC<{children: ReactNode}> = ({ children }) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<ILocation[]>([]);
  const [counterLocal, setCounterLocal] = useState(8);
  const [loading, setLoading] = useState(true);

  const [filtersLoc, setFiltersLoc] = useState({
    searchTerm: '',
    type: '',
    dimension: ''
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ results: ILocation[] }>('https://rickandmortyapi.com/api/location/');
        
        const locationsWithcharacters = await Promise.all(
            response.data.results.map(async (location) => {
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
        }));
        
        setLocations(locationsWithcharacters);
        } catch (error) {
        console.error('Error fetching locations:', error);
        } finally {
        setLoading(false);
        }
    };
    
    fetchLocations();
  }, []);

  useEffect(() => {
    const filtered = locations.filter(location => (
      location.name.toLowerCase().includes(filtersLoc.searchTerm.toLowerCase()) &&
      (filtersLoc.type === '' || location.type === filtersLoc.type) &&
      (filtersLoc.dimension === '' || location.dimension === filtersLoc.dimension)
    ));
    setFilteredLocations(filtered);
    setCounterLocal(8);
  }, [locations, filtersLoc]);

  const allLocalLoaded = counterLocal >= filteredLocations.length;

  return (
    <LocationContext.Provider value={{
      locations,
      filteredLocations,
      counterLocal,
      filtersLoc,
      setCounterLocal,
      setFiltersLoc,
      allLocalLoaded,
      loading
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext ehkerer');
  }
  return context;
};