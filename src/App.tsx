import { useState, useContext } from "react";
import { FormNewFilm } from "./FormNewFilm";
import { GridFilms } from "./GridFilms"; 
import { fetchPelicula } from "./ApiEvents";
import { ApiContext } from "./ApiContext";

function App() {
    const { getFilmEntries, genreEntries, getGenreEntries } = useContext(ApiContext);

    const [peli, setPeliculaActual] = useState<{ id: number; image: string; name: string; year: number } | null>(null);

    const handleUpdate = async (id: number) => {
        const pelicula = await fetchPelicula(id);
        console.log(pelicula);
        setPeliculaActual(pelicula);
    };

    return (
        <main className="container flex flex-col items-center gap-8 py-16 max-w-[1920px] size-auto mx-auto bg-black">
            <h1 className="text-4xl font-bold text-slate-700">Filmography</h1>
            <div className="flex flex-row items-center gap-6">
                <FormNewFilm generos={genreEntries} id={peli ? peli.id : null} obtenerPeliculas={getFilmEntries} obtenerGeneros={getGenreEntries} />
            </div>
            <div className="container">
                <GridFilms handleUpdate={handleUpdate} />
            </div>
        </main>
    );
}

export default App;