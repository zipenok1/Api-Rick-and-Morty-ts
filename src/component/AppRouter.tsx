import {Routes, Route, Navigate} from "react-router-dom"
import {characterRoutes, localRoutes, EpisodeRoutes} from "../router";
import { CharacterProvider } from '../context/CharacterContext';
import { LocationProvider } from '../context/LocationContext';
import { EpisodeProvider } from '../context/EpisodesContent';
import {HOME_ROUTE} from '../utils/const'

function AppRouter() {
  return (
    <div>
        <Routes>
          {characterRoutes.map(({ path, Component }) => (
            <Route 
              key={path} 
              path={path} 
              element={
              <CharacterProvider>
                <Component/>
              </CharacterProvider>
              }
            />
          ))}
            {localRoutes.map(({ path, Component }) => (
              <Route 
                key={path} 
                path={path} 
                element={
                <LocationProvider>
                  <Component/>
                </LocationProvider>
                }
              />
            ))}
            {EpisodeRoutes.map(({ path, Component }) => (
              <Route 
                key={path} 
                path={path} 
                element={
                <EpisodeProvider>
                  <Component/>
                </EpisodeProvider>
                }
              />
            ))}
            <Route path="*" element={< Navigate to={HOME_ROUTE} replace />}/>
        </Routes>
    </div>
  )
}

export default AppRouter