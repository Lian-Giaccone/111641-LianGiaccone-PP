const URL_API = "https://api.tvmaze.com/shows/"

let contador = 0;

async function cargarSeries() {
    try{
        const aux = document.getElementById("series");
        aux.innerHTML = "";

        const paginaInicio = contador * 6 + 1;
        const paginaFin = paginaInicio + 5;

        for(let i = paginaInicio; i <= paginaFin; i++) {
            const respuesta = await fetch(URL_API + i);
            if(respuesta.status !== 200) {
                throw new Error("No se pudieron obtener las series");
            }
            const datos = await respuesta.json();

            const nuevaSerie = new Serie(
                datos.id,
                datos.url,
                datos.name,
                datos.language,
                datos.genres,
                datos.image ? datos.image.medium : ""
            );
            const nuevoElemento = nuevaSerie.createHtmlElement();
            aux.appendChild(nuevoElemento);
        }

    }catch(error){
        alert("No se pudo cargar las series");
    }
}

function paginaSiguiente(){
    contador ++;
    cargarSeries();
}

function paginaAnterior(){
    contador --;
    cargarSeries();
}

const btnSiguiente = document.getElementById("siguiente");
btnSiguiente.addEventListener("click", paginaSiguiente);


const btnAnterior = document.getElementById("anterior");
btnAnterior.addEventListener("click", paginaAnterior);

cargarSeries();