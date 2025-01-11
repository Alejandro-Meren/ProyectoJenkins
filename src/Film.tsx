import { EliminarButton } from "./EliminarButton";
import { UpdateButton } from "./UpdateButton";


export function Film({handleEliminar,handleUpdate , id, image, name, year} : {handleEliminar: (id:number) => void, id:number, handleUpdate: (id:number) => void, image:string, name:string, year:number}) {



  return (
  <div className="container border border-blue-600 h-80 w-40 m-5 bg-indigo-950 rounded-md shadow-md shadow-slate-500">
    <div className="flex flex-row justify-end pr-2 pt-1">
      <EliminarButton onEliminar={() => handleEliminar(id)}/> 
    </div>

    <img
    src={image}
    alt="Movie cover" 
    className="h-36 w-24 mt-3 mx-auto rounded-lg border border-blue-600"/>

  <div className="text-white flex flex-row flex-wrap justify-evenly align-middle text-center">
    <p>{name}</p>
  </div>

  <div className="text-white flex flex-row flex-wrap justify-evenly">
    <p>{year}</p>
  </div>

  <div className="flex flex-row justify-center mt-4">
  <UpdateButton onUpdate={() => handleUpdate(id)}/>
  </div>

  </div>
  );
}
