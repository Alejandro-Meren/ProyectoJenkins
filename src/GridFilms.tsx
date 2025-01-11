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
            <div className="container mx-auto p-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            </div>
        );
}