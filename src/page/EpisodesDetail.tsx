import { FC } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEpisodeContext } from '../context/EpisodesContent';

const EpisodesDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { episodes } = useEpisodeContext();
  const navigate = useNavigate();

  const epis = episodes.find(char => char.id === Number(id));
    
  if (!epis) {
    return <div>Character not found</div>
  }
  console.log(epis.charactersData);
  
  return (
    <div className="container mx-auto px-50">
      <div className='flex justify-start gap-[28%] py-5'>
        <button 
            onClick={() => navigate(-1)}
            className="h-8 cursor-pointer"
        >
            GO BACK
        </button>
        <div className='text-left'>
            <h2 className='text-5xl'>{epis.name}</h2>
            <div className='flex text-left gap-50 mt-10'>
                <p>Episode <br /> {epis.episode}</p>
                <p>Date <br /> {epis.air_date}</p>
            </div>
        </div>
      </div>
      <div className='py-10 flex justify-center gap-10'></div>
        <div className='flex gap-5 flex-wrap pb-8'>
          {epis.charactersData.map((el) => (
            <Link to={`/character/${el.id}`}>
              <div 
                    className='w-60 h-60 rounded-lg bg-center flex items-end shadow-lg cursor-pointer hover:shadow-2xl transition-shadow'
                    style={{ backgroundImage: `url(${el.image})` }}
                >
                    <div className='bg-white w-60 h-18 rounded-b-lg py-2 px-4'>
                        <h3 className='font-semibold truncate'>{el.name}</h3>
                        <p className='text-sm text-gray-600'>{el.species}</p>
                    </div> 
                </div>
            </Link>
              
          ))}
        </div>
    </div>
  );
};

export default EpisodesDetail;

