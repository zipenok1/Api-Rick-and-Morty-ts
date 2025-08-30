import SelectEpos from '../component/SelectEpos'
import CardsEpos from '../component/CardsEpos'

function Episodes() {
  return (
    <div>
      <div className='flex justify-center p-5'>
            <img src="img/episodes.svg" alt="episodes" />
      </div>
      <SelectEpos/>
      <CardsEpos/>
    </div>
  )
}

export default Episodes