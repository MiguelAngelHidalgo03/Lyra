document.addEventListener('DOMContentLoaded', function() {
    const controlButtons = document.querySelectorAll('.control-btn img');

    controlButtons.forEach(button => {
        const originalSrc = button.src;
        const hoverSrc = originalSrc.replace('.png', '-hover.png'); //  '-hover'

        button.addEventListener('mouseover', () => {
            if (!isPlaying || button !== playBtn) {
                button.src = hoverSrc;
            } else if (button === playBtn && isPlaying) {
                button.src = "img/pausa-hover.png";
            }
        });

        button.addEventListener('mouseout', () => {
            if (!isPlaying || button !== playBtn) {
                button.src = originalSrc;
            } else if (button === playBtn && isPlaying) {
                button.src = "img/pausa.png";
            }
        });
    });

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const artistContainer = document.querySelector('.artist-container');
    const genreContainer = document.querySelector('.genre-container');
    const imgWidth = artistContainer.querySelector('img').clientWidth;
    let artistIndex = 0;
    let genreIndex = 0;

    function showArtists(n) {
        const artists = artistContainer.children;
        const totalArtists = artists.length;
        const visibleArtists = 6; // Número de imágenes visibles
        if (n >= totalArtists - visibleArtists + 1) { artistIndex = 0; }
        if (n < 0) { artistIndex = totalArtists - visibleArtists; }
        artistContainer.style.transform = `translateX(${-artistIndex * imgWidth}px)`;
    }

    function showGenres(n) {
        const genres = genreContainer.children;
        const totalGenres = genres.length;
        const visibleGenres = 6; // Número de imágenes visibles
        if (n >= totalGenres - visibleGenres + 1) { genreIndex = 0; }
        if (n < 0) { genreIndex = totalGenres - visibleGenres; }
        genreContainer.style.transform = `translateX(${-genreIndex * imgWidth}px)`;
    }

    prevButton.addEventListener('click', function() {
         showArtists(--artistIndex);
        showGenres(--genreIndex);
    });

    nextButton.addEventListener('click', function() {
        showArtists(++artistIndex);
        showGenres(++genreIndex);
    });

    // Initialize the display
    showArtists(artistIndex);
    showGenres(genreIndex);
});




// Array of canciones
const songs = [
    {
        name: "La ultima ultima vez",
        artist: "Alvaro Díaz",
        duration: 210,
        albumArt: "img/hqdefault.jpg"
    },
    {
        name: "My jinji",
        artist: "Sunset Rollercoaster",
        duration: 401,
        albumArt: "img/myjinji.jpg"
    },
    {
        name: "Shirushi",
        artist: "Lisa",
        duration: 287,
        albumArt: "img/lisa.jpg"
    },
    {
        name: "Supernova",
        artist: "Ralphie Choo, ABHIR",
        duration: 164,
        albumArt: "img/ralphie.jpg"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let currentTime = 0;
let interval;

const albumArt = document.querySelector('.album-art img');
const trackName = document.querySelector('.track-name');
const artistName = document.querySelector('.artist-name');
const playBtn = document.querySelector('.play-btn img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressBar = document.querySelector('.progress-bar');
const currentTimeElem = document.querySelector('.current-time');
const totalTimeElem = document.querySelector('.total-time');

function loadSong(index) {
    const song = songs[index];
    albumArt.src = song.albumArt;
    trackName.textContent = song.name;
    artistName.textContent = song.artist;
    totalTimeElem.textContent = formatTime(song.duration);
    progressBar.max = song.duration;
    currentTime = 0;
    updateProgress();
}

function playSong() {
    isPlaying = true;
    playBtn.src = "img/pausa.png";
    clearInterval(interval);
    interval = setInterval(updateTime, 1000);
}

function pauseSong() {
    isPlaying = false;
    playBtn.src = "img/play.png";
    clearInterval(interval);
}

function updateTime() {
    if (currentTime < songs[currentSongIndex].duration) {
        currentTime++;
        updateProgress();
    } else {
        nextSong();
    }
}

function updateProgress() {
    progressBar.value = currentTime;
    currentTimeElem.textContent = formatTime(currentTime);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

progressBar.addEventListener('input', () => {
    currentTime = progressBar.value;
    updateProgress();
});

progressBar.addEventListener('change', () => {
    currentTime = progressBar.value;
    updateProgress();
    if (isPlaying) {
        clearInterval(interval);
        interval = setInterval(updateTime, 1000);
    }
});

loadSong(currentSongIndex);