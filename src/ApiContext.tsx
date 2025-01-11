import { createContext, useCallback, useEffect, useState, ReactNode } from "react";

interface Film {
    id: number;
    image: string;
    name: string;
    year: number;
}

interface Genre {
    id: number;
    genre: string;
}

interface ApiContextType {
    filmEntries: Film[];
    genreEntries: Genre[];
    getFilmEntries: () => void;
    getGenreEntries: () => void;
}

export const ApiContext = createContext<ApiContextType>({
    filmEntries: [],
    genreEntries: [],
    getFilmEntries: () => {},
    getGenreEntries: () => {},
});

export const ApiProvider = ({ children }: { children: ReactNode }) => {
    const [filmEntries, setFilmEntries] = useState<Film[]>([]);
    const [genreEntries, setGenreEntries] = useState<Genre[]>([]);

    useEffect(() => {
        getFilmEntries();
    }, []);

    useEffect(() => {
        getGenreEntries();
    }, []);

    const getFilmEntries = useCallback(async () => {
        const response = await fetch('https://halved-spotless-brush.glitch.me/peliculas');
        const data = await response.json();
        setFilmEntries(data);
    }, []);

    const getGenreEntries = useCallback(async () => {
        const response = await fetch('https://halved-spotless-brush.glitch.me/listaGeneros');
        const data = await response.json();
        setGenreEntries(data);
    }, []);

    return (
        <ApiContext.Provider value={{ filmEntries, genreEntries, getFilmEntries, getGenreEntries }}>
            {children}
        </ApiContext.Provider>
    );
};