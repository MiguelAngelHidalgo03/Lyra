document.addEventListener('DOMContentLoaded', function () {
    const controlButtons = document.querySelectorAll('.control-btn img');

    controlButtons.forEach(button => {
        const originalSrc = button.src;
        const hoverSrc = originalSrc.replace('.png', '-hover.png'); //  '-hover'

        button.addEventListener('mouseover', () => {
            if (!isPlaying || button !== playBtn) {
                button.src = hoverSrc;
            } else if (button === playBtn && isPlaying) {
                button.src = "img/music-control/pause-hover.png";
            }
        });

        button.addEventListener('mouseout', () => {
            if (!isPlaying || button !== playBtn) {
                button.src = originalSrc;
            } else if (button === playBtn && isPlaying) {
                button.src = "img/music-control/pause.png";
            }
        });
    });
});

// Scroll functionality for artist, genre, and album containers
document.addEventListener('DOMContentLoaded', function () {
    const artistContainer = document.getElementById('artistContainer');
    const genreContainer = document.getElementById('genreContainer');
    const albumContainer = document.getElementById('albumContainer');

    // Botones de desplazamiento para artistas
    document.querySelector('.popular-artists .prev').addEventListener('click', () => {
        artistContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });

    document.querySelector('.popular-artists .next').addEventListener('click', () => {
        artistContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });

    // Botones de desplazamiento para géneros
    document.querySelector('.explore-genres .prev').addEventListener('click', () => {
        genreContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });

    document.querySelector('.explore-genres .next').addEventListener('click', () => {
        genreContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });

    // Botones de desplazamiento para álbumes
    document.querySelector('.trending-albums .prev').addEventListener('click', () => {
        albumContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });

    document.querySelector('.trending-albums .next').addEventListener('click', () => {
        albumContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });
});

// Array of canciones
const songs = [
    {
        name: "La ultima ultima vez",
        artist: "Alvaro Díaz",
        duration: 210,
        albumArt: "img/playingSongs/default.jpg"
    },
    {
        name: "My jinji",
        artist: "Sunset Rollercoaster",
        duration: 401,
        albumArt: "img/playingSongs/myjinji.jpg"
    },
    {
        name: "Shirushi",
        artist: "Lisa",
        duration: 287,
        albumArt: "img/playingSongs/lisa.jpg"
    },
    {
        name: "Supernova",
        artist: "Ralphie Choo, ABHIR",
        duration: 164,
        albumArt: "img/playingSongs/ralphie.jpg"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let currentTime = 0;
let interval;

const albumArt = document.querySelector('.album-art img');
const trackName = document.querySelector('.track-name');
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
    totalTimeElem.textContent = formatTime(song.duration);
    progressBar.max = song.duration;
    currentTime = 0;
    updateProgress();
}

function playSong() {
    isPlaying = true;
    playBtn.src = "img/music-control/pause.png";
    clearInterval(interval);
    interval = setInterval(updateTime, 1000);
}

function pauseSong() {
    isPlaying = false;
    playBtn.src = "img/music-control/play.png";
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