document.addEventListener('scroll', function () {
    const hiddenElements = document.querySelectorAll('.hidden');

    hiddenElements.forEach(element => {
        const sectionTop = element.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight * 0.75) {
            element.classList.add('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.querySelector('.anounce').classList.add('show');
    }, 80);
});

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

document.addEventListener('DOMContentLoaded', function () {
    const navBtn = document.querySelectorAll('.nav-lib img');

    navBtn.forEach(button => {
        const originalSrc = button.src;
        const hoverSrc = originalSrc.replace('.png', '-hover.png');

        button.addEventListener('mouseover', () => {
            button.src = hoverSrc;
        });

        button.addEventListener('mouseout', () => {
            button.src = originalSrc;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const viewPlansButton = document.getElementById('viewPlansButton');
    const choosePlanSection = document.getElementById('choosePlan-1');

    viewPlansButton.addEventListener('click', function () {
        choosePlanSection.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const questionHeaders = document.querySelectorAll('.question-header');

    questionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.dropdown-icon');

            if (content.style.display === 'block') {
                content.style.display = 'none';
                // content.style.visibility = 'hidden';

                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.display = 'block';
                // content.style.visibility = 'visible';

                icon.style.transform = 'rotate(180deg)';
            }
        });
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