import { FC } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCharacterContext } from '../context/CharacterContext';

const CharacterDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { characters } = useCharacterContext();
  const navigate = useNavigate();

  const extractIdFromUrl = (url: string | undefined): number | null => {
    if (!url) return null;
    const matches = url.match(/\/(\d+)$/);
    return matches ? parseInt(matches[1], 10) : null;
  };

  const character = characters.find(char => char.id === Number(id));

  if (!character) {
    return <div>Character not found</div>;
  }

  const locationId = extractIdFromUrl(character.location?.url);
  console.log(character.episodesData);
  
  return (
    <div className="container mx-auto px-50">
      <div className='flex justify-start gap-[28%] py-5'>
        <button 
            onClick={() => navigate(-1)}
            className="h-8 cursor-pointer"
        >
            GO BACK
        </button>
        <div className="text-center text-5xl font-roboto">
            <img 
                src={character.image} 
                alt={character.name} 
                className="w-75 h-75 rounded-full mb-5"
            />
            <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
        </div>
      </div>
      <div className='py-10 flex justify-center gap-10'>

        <div>
            <h2 className="font-semibold text-gray-600">Informations</h2>
            <div className="w-96 ml-5 mt-2.5 border-b border-gray-200 mb-5">
              <h2 className="font-semibold text-gray-600">Gender</h2>
              <p>{character.gender}</p>
            </div>

            <div className="w-96 ml-5 mt-2.5 border-b border-gray-200 mb-5">
              <h2 className="font-semibold text-gray-600">Status</h2>
              <p>{character.status}</p>
            </div>

            <div className="w-96 ml-5 mt-2.5 border-b border-gray-200 mb-5">
              <h2 className="font-semibold text-gray-600">Species</h2>
              <p>{character.species}</p>
            </div>

            <div className="w-96 ml-5 mt-2.5 border-b border-gray-200 mb-5">
              <h2 className="font-semibold text-gray-600">Origin</h2>
              <p>{character.origin?.name}</p>
            </div>

            <div className="w-96 ml-5 mt-2.5 border-b border-gray-200 mb-5">
              <h2 className="font-semibold text-gray-600">Type</h2>
              <p>{character.type}</p>
            </div>

            {locationId && (
              <Link to={`/local/${locationId}`}>
                <div className="w-96 ml-5 mt-2.5 border-b border-gray-200 mb-5">
                  <h2 className="font-semibold text-gray-600">Location</h2>
                  <p>{character.location?.name}</p>
                </div>
              </Link>
            )}

        </div>

        <div>
            <div>
              <h2 className="font-semibold text-gray-600">Episodes</h2>
              {character.episodesData ? (
                <div>
                  {character.episodesData.map(episode => (
                    <Link to={`/epis/${episode.id}`}>
                      <div className="w-96 ml-5 mt-2.5 border-b border-gray-200 mb-5" key={episode.id}>
                        <h2 className="font-semibold text-gray-600">{episode.episode} </h2>
                        <p>{episode.name}</p>
                        <p>{episode.air_date}</p>
                      </div>
                    </Link>
                    
                  ))}
                </div>
              ) : (
                <p>No episode data available</p>
              )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default CharacterDetail;

