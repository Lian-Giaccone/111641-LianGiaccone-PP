let series =   JSON.parse(localStorage.getItem("seriesGuardadas"));

if(series === null){
    series = [];
}

function mostrarSeries(){
    const aux = document.getElementById("series");

    aux.innerHTML = "";
    for(let i = 0; i < series.length; i++){
        const nuevaSerie = new Serie(
            series[i].id,
            series[i].url,
            series[i].name,
            series[i].language,
            series[i].generes,
            series[i].image
        );

        const elemento = nuevaSerie.createHtmlElement();
        aux.appendChild(elemento);
    }
}

const btnOrdenarNombre = document.getElementById("ordenarNombre");
btnOrdenarNombre.addEventListener("click", function(){
    series.sort((a,b) => a.name.localeCompare(b.name));
    mostrarSeries();
});

const btnOrdenarID = document.getElementById("ordenarID");
btnOrdenarID.addEventListener("click", function(){
    series.sort((a,b) => a.id - b.id);
    mostrarSeries();
});

mostrarSeries();