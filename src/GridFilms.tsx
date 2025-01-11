import { useContext } from "react";
import { Film } from "./Film";
import { eliminarPelicula} from "./ApiEvents";
import { ApiContext } from "./ApiContext";

export const handleUpdate = async (id:number) => {
    
    return id
}

export function GridFilms({ handleUpdate} : { handleUpdate:(id:number)=>void}) {

   const {filmEntries, getFilmEntries} = useContext(ApiContext)

   

        const handleEliminar = async (id: number) => {
            const success = await eliminarPelicula(id);
            if (success) {
              getFilmEntries();
            }
          };

    return (

        <ul className="flex flex-row justify-center">
            {filmEntries.map(pelicula => (
                <Film 
                key={pelicula.id} 
                id={pelicula.id}
                image={pelicula.image} 
                name={pelicula.name} 
                year={pelicula.year}
                handleEliminar={handleEliminar}
                handleUpdate={handleUpdate}
                />
            ))}
        </ul>
    )
}