import { useContext } from "react";
import { Genre } from "./Genre";
import { eliminarGeneros } from "./ApiEvents";
import { ApiContext } from "./ApiContext";

interface Genre {
    id: number;
    genre: string;
}

export function GridGeneros({ selected, handleSelected }: { selected: number[]; handleSelected: (id: number) => void }) {
    const { genreEntries, getGenreEntries } = useContext(ApiContext);

    const handleEliminar = async (id: number) => {
        const success = await eliminarGeneros(id);
        if (success) {
            getGenreEntries();
        }
    };

    return (
        <ul className="flex flex-row ">
            {genreEntries.map(genero => (
                <Genre
                    key={genero.id}
                    id={genero.id}
                    genre={genero.genre}
                    handleEliminar={handleEliminar}
                    selected={selected}
                    handleSelected={handleSelected}
                />
            ))}
        </ul>
    );
}