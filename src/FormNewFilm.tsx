import { CrearButton } from "./CrearButton";
import { useEffect, useState } from "react";
import { fetchPelicula, postPelicula, postGenero } from "./ApiEvents";
import { GridGeneros } from "./GridGeneros";

interface Genre {
    id: number;
    genre: string;
}

export function FormNewFilm({ generos, id, obtenerPeliculas, obtenerGeneros }: { generos: Genre[]; id: number | null; obtenerPeliculas: () => void; obtenerGeneros: () => void }) {
    const [peli, setPeliculaActual] = useState<{ id: number | null; name: string; image: string; year: number | string } | null>(null);
    const [genre, setGenero] = useState<{ genero: string }>({ genero: "" });
    const [selected, setSelectedGenres] = useState<number[]>([]);
    const [crear, setCrear] = useState<string>('Crear');

    useEffect(() => {
        obtenerPeli();
        obtenerGenerosPeli();
    }, [id]);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const obtenerGenerosPeli = async () => {
        if (id !== null) {
            const peli = await fetchPelicula(id);
        if (peli.generos) {
            const selectedGenresId = peli.generos.map((nombre: string) => {
                const genre = generos.find(g => g.genre === nombre);
                return genre ? genre.id : null;
            });
            setSelectedGenres(selectedGenresId);
        }
    }
    };

    const obtenerPeli = async () => {
        if (id !== null) {
            const peli = await fetchPelicula(id);
            if (peli.id != null) {
                setCrear('Update');
            } else {
                setCrear('Crear');
            }
            setPeliculaActual(peli);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (peli) {
            setPeliculaActual({ ...peli, [name]: value });
        }
    };

    const generoHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (genre) {
            setGenero({ ...genre, [name]: value });
        }
    };

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedGenresNames = selected.map((id) => {
            const genre = generos.find((g) => g.id === id);
            return genre ? genre.genre : '';
        });
        const success = await postPelicula(peli?.id, peli?.name, peli?.image, peli?.year, selectedGenresNames);
        if (success) {
            obtenerPeliculas();
            setCrear('Crear');
            setPeliculaActual({ id: null, name: "", image: "", year: '' });
        }
    };

    const handleGenrePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await postGenero(genre.genero);
        if (success) {
            obtenerGeneros();
            setGenero({ genero: "" });
        }
    };

    const handleSelected = (id: number) => {
        setSelectedGenres((selected) =>
            selected.includes(id)
                ? selected.filter((selectedId) => selectedId !== id)
                : [...selected, id]
        );
    };

    return (
        <div className="gap-8 columns-3xl container mx-auto border border-slate-500 rounded-lg bg-slate-900">
            <form className="grid grid-rows-2 grid-cols-2 gap-6 mb-0 m-4" onSubmit={handlePost}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Film Name"
                            value={peli ? peli.name : ""}
                            onChange={handleChange}
                            className="border border-slate-500 bg-slate-700 p-2 rounded-md w-full"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="year" className="block text-sm font-medium">Year</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            id="year"
                            name="year"
                            placeholder="Year"
                            value={peli ? peli.year : ""}
                            onChange={handleChange}
                            className="border border-slate-500 bg-slate-700 p-2 rounded-md w-full"
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="image" className="block text-sm font-medium">Film Poster</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            id="image"
                            name="image"
                            placeholder="Film Poster"
                            value={peli ? peli.image : ""}
                            onChange={handleChange}
                            className="border border-slate-500 bg-slate-700 rounded-md w-full p-2"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="genero" className="block text-sm font-medium">Genero</label>
                    <div className="flex mt-1">
                        <input
                            type="text"
                            id="genero"
                            name="genero"
                            placeholder="Genero"
                            value={genre.genero}
                            onChange={generoHandleChange}
                            className="border border-slate-500 bg-slate-700 p-2 rounded-tl-md rounded-bl-md w-full"
                        />
                        <button className="pr-4 pt-1 pl-4 pb-1 rounded-tr-md rounded-br-md bg-blue-900 text-blue-200 content-center"
                            type="button" onClick={handleGenrePost}> + </button>
                    </div>
                </div>
                <div className="flex mt-1">
                    <GridGeneros selected={selected} handleSelected={handleSelected} />
                </div>
                <div className="flex justify-center col-span-2 mb-5">
                    <CrearButton crear={crear} />
                </div>
            </form>
        </div>
    );
}