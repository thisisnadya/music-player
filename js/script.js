const musicContainer = document.querySelector('.music-container');
const progressContainer = document.querySelector('.progress-line');
let playButton = document.querySelector('#play');
let prevButton = document.querySelector('#prev');
let nextButton = document.querySelector('#next');
let audio = document.querySelector('#audio');
let progress = document.querySelector('.progress');
let title = document.querySelector('#title');
let imageCover = document.querySelector('#img-cover');

//Song title
const songs = ['anewbeginning', 'jazzyfrenchy', 'ukulele'];

//keep track of songs
let songIndex = 2;

//initially load song info DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song){
    title.innerText = song;
    audio.src = `audio/${song}.mp3`;
    imageCover.src = `img/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');
    playButton.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function prevSong() {
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length-1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
    
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//event listener
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }
    else {
        playSong();
    }
});

//change song
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

