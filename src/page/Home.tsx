import SelectForm from '../component/SelectForm'
import Cards from '../component/Cards'


function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className='flex justify-center p-4 md:p-6 lg:p-8'>
        <img 
          src="img/coverCharacters.svg" 
          alt="characters" 
          className="w-full max-w-96" 
        />
      </div>

        <SelectForm />
        <Cards />
      
    </div>
  )
}

export default Home