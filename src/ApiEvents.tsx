export async function eliminarPelicula(id:number){

    try {
        await fetch(`https://halved-spotless-brush.glitch.me/peliculas/${id}`, { method: "DELETE" });
        return true;
    } catch (error) {
        console.error("Error al eliminar la película:", error);
        return false;
    }

}

export async function fetchPeliculas(){

    const response = await fetch('https://halved-spotless-brush.glitch.me/peliculas');
        const data = await response.json();
        return data;
}

export async function fetchPelicula(id:number){

    const response = await fetch(`https://halved-spotless-brush.glitch.me/peliculas/${id}`);
        const data = await response.json();
        return data;
}

export async function postPelicula( id?:number|null, name?:string, image?:string, year?:string|number, generos?:string[]){
    if(id){
        try {
            await fetch(`https://halved-spotless-brush.glitch.me/peliculas/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name,
                  year: year,
                  generos: generos,
                  image: image
                }),
              }
            ); 
        return true  
        } catch (error) {
            console.error("Error al actualizar la película:", error);
            return false
        } 
    } else {

        try{
        await fetch(`https://halved-spotless-brush.glitch.me/peliculas`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              year: year,
              generos: generos,
              image: image
            }),
          });
          return true
        }
          catch (error) {
            console.error("Error al actualizar la película:", error);
            return false
        }
    }
}
export async function fetchGeneros(){

    const response = await fetch('https://halved-spotless-brush.glitch.me/listaGeneros');
        const data = await response.json();
        return data;
}

export async function eliminarGeneros(id:number){

  try {
    await fetch(`https://halved-spotless-brush.glitch.me/listaGeneros/${id}`, { method: "DELETE" });
    return true;
} catch (error) {
    console.error("Error al eliminar la película:", error);
    return false;
}
}

export async function postGenero(genre:string){
  try{
    await fetch(`https://halved-spotless-brush.glitch.me/listaGeneros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre:genre
        }),
      });
      return true
    }
      catch (error) {
        console.error("Error al actualizar la película:", error);
        return false
    }
}