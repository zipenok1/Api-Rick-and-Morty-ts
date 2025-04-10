export interface ICharacterCard{
    id: number;
    image: string,
    name: string,
    gender:string,
    status:string,
    species:string,
    origin?: {
        name: string,
        url: string,
      },
    type:string,
    location?:{
        id: number
        name:string, 
        url: string,
    }
    episode?: string[],
    episodesData?: IEpisode[],
}
export interface IEpisode {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    created:string,
    url: string,
    characters: string[], 
    charactersData: ICharacterCard[], 
}
export interface ILocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[],
    residentsData: IResidents[];
    url: string;
    created: string;
}
export interface IResidents{
    id: number;
    image: string,
    name: string,
    gender:string,
    status:string,
    species:string,
}