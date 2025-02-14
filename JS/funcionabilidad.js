document.addEventListener("DOMContentLoaded", () => {
    const artistas = ["Artista 1", "Artista 2", "Artista 3", "Artista 4"];
    const generos = ["Género 1", "Género 2", "Género 3", "Género 4"];
    
    const artistasDiv = document.querySelector(".artistas");
    const generosDiv = document.querySelector(".generos");
    
    artistas.forEach(artista => {
        let div = document.createElement("div");
        div.textContent = artista;
        artistasDiv.appendChild(div);
    });
    
    generos.forEach(genero => {
        let div = document.createElement("div");
        div.textContent = genero;
        generosDiv.appendChild(div);
    });
});