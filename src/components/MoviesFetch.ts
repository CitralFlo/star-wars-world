import axios from 'axios';

export interface Film {
    title: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
}

export interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    url: string;
}

export const getFilms = async (): Promise<Film[]> => {
    try {
        const response = await axios.get<{ results: Film[] }>('https://swapi.dev/api/films/');
        return response.data.results;
    } catch (error) {
        console.error('Error fetching films:', error);
        throw error;
    }
};

export const getCharacter = async (url: string): Promise<Character> => {
    try {
        const response = await axios.get<Character>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
};
