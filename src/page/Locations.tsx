import SelectLocal from '../component/SelectLocal'
import CardsLocal from '../component/CardsLocal'

function Locations() {
  return (
    <div>
      <div className='flex justify-center p-5'>
        <img src="img/locations.svg" alt="locations" />
      </div>
      <SelectLocal/>
      <CardsLocal/>
    </div>
  )
}

export default Locations