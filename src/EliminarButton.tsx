export function EliminarButton( {onEliminar} : {onEliminar: () => void} ){
  

    return (
      <span className="hover:cursor-pointer text-zinc-800"
      onClick={onEliminar}>
        X</span>
    )
  }