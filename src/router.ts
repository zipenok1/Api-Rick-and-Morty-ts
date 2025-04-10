import CharacterDetail from './page/CharacterDetail'
import Episodes from './page/Episodes'
import EpisodesDetail from './page/EpisodesDetail'
import Home from './page/Home'
import Locations from './page/Locations'
import LocationsDetail from './page/LocationsDetail'
import {HOME_ROUTE, LOCATION_ROUTER, EPISODES_ROUTER, CHARACTERDET_ROUTER, LOCATIONDET_ROUTER, EPISODESDET_ROUTER} from './utils/const'



export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: CHARACTERDET_ROUTER,
        Component: CharacterDetail
    },
    {
        path: LOCATION_ROUTER,
        Component: Locations
    },
    {
        path: EPISODES_ROUTER,
        Component: Episodes
    },
    {
        path: EPISODESDET_ROUTER,
        Component: EpisodesDetail
    },
    {
        path: LOCATIONDET_ROUTER,
        Component: LocationsDetail
    },
    
]