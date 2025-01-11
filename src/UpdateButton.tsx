export function UpdateButton({ onUpdate } : {onUpdate: () => void}){;
    return (
      <button className="pr-4 pt-1 pl-4 pb-1 border border-black rounded-md bg-blue-900 text-blue-200 content-center"
      onClick={onUpdate} >Update</button>
        );
      }
  