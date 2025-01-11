export function CrearButton({crear} : {crear:string}){


    return (
  <button className="pr-4 pt-1 pl-4 pb-1 border border-black rounded-md bg-blue-900 text-blue-200 content-center"
  type="submit"
  >{crear}</button>
    )
  }