import { useEffect } from "react";
import { EliminarButton } from "./EliminarButton";

export function Genre({ handleEliminar, selected, id, genre, handleSelected }: { handleEliminar: (id: number) => void; selected: number[]; id: number; genre: string; handleSelected: (id: number) => void }) {

  useEffect(() => {
  }, [selected]);

  const isSelected = selected.includes(id);

  const onClick = () => {
    handleSelected(id);
  };

  return (
    <div
      className={`p-1 m-5 ${isSelected ? "bg-indigo-500" : "bg-gray-500"} rounded-md`}
      onClick={onClick}>
      <div>
        <div className="text-white flex flex-row flex-wrap justify-evenly text-center align-middle">
            <p>{genre} <EliminarButton onEliminar={() => handleEliminar(id)}/></p>

        </div>
        <div className="flex flex-row justify-end pr-2 pt-1"></div>
      </div>
    </div>
  );
}