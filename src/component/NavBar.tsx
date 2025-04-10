import {HOME_ROUTE, LOCATION_ROUTER, EPISODES_ROUTER} from '../utils/const'
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
        <div className='shadow-lg'>
            <div className='flex  justify-between items-center p-2.5 container mx-auto px-50 flex-wrap gap-5 ' >
                <img src="img/logoHeader.svg" alt="logo" />
                <nav>
                    <ul className='flex gap-5'>
                        <Link to={HOME_ROUTE}>
                            Characters
                        </Link>
                        <Link to={LOCATION_ROUTER}>
                            Locations
                        </Link>
                        <Link to={EPISODES_ROUTER}>
                            Episodes
                        </Link>
                    </ul>
                </nav>  
            </div>
        </div>
    </div>
  )
}

export default NavBar