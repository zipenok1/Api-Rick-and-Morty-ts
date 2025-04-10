import CharacterDetail from './page/CharacterDetail'
import Episodes from './page/Episodes'
import EpisodesDetail from './page/EpisodesDetail'
import Home from './page/Home'
import Locations from './page/Locations'
import LocationsDetail from './page/LocationsDetail'
import {HOME_ROUTE, LOCATION_ROUTER, EPISODES_ROUTER, CHARACTERDET_ROUTER, LOCATIONDET_ROUTER, EPISODESDET_ROUTER} from './utils/const'


export const characterRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: CHARACTERDET_ROUTER,
        Component: CharacterDetail
    },
]
export const localRoutes = [
    {
        path: LOCATION_ROUTER,
        Component: Locations
    },
    {
        path: LOCATIONDET_ROUTER,
        Component: LocationsDetail
    },
]

export const EpisodeRoutes = [
    {
        path: EPISODES_ROUTER,
        Component: Episodes
    },
    {
        path: EPISODESDET_ROUTER,
        Component: EpisodesDetail
    }, 
]