class Serie {
    constructor(id, url, name, language, generes, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.generes = generes;
        this.image = image;
    }

    toJsonString(){
        return JSON.stringify(this);
    }

    static createFromJsonString(json){
        const datos = JSON.parse(json);

        return new Serie(
            datos.id,
            datos.url,
            datos.name,
            datos.language,
            datos.generes,
            datos.image
        );
    }
    
    createHtmlElement(){
        const serieAux = document.createElement('div');

        serieAux.innerHTML = `
            <a href="${this.url}" target="_blank">
                <img src="${this.image}" class="serie-img"/>
            </a>
            <p>Nombre: ${this.name}</p>
            <p>Lenguaje: ${this.language}</p>
            <p>Géneros: ${this.generes}</p>
            <button class="guardar">Guardar</button>
        `;

        serieAux.classList.add("serie");

        const btnGuardar = serieAux.querySelector(".guardar");

        btnGuardar.addEventListener("click", () => {
            Serie.guardarSerie(this);
        });

        return serieAux;      
    }

    static guardarSerie(serie){
        let seriesGuardadas = JSON.parse(
            localStorage.getItem("seriesGuardadas")
        );

        if(seriesGuardadas === null){
            seriesGuardadas = [];
        }

        const serieRepetida = seriesGuardadas.some(serieGuardada => serieGuardada.id === serie.id);

        if(!serieRepetida){
            seriesGuardadas.push(serie);

            localStorage.setItem(
                "seriesGuardadas",
                JSON.stringify(seriesGuardadas)
            );
        }
    }
}