const musicContainer = document.querySelector('.music-container');
const progressContainer = document.querySelector('.progress-line');
const addToPlaylist = document.getElementById('add-to-playlist');
const playlistWrapper = document.querySelector('.playlist-wrapper');
const playPlaylist = document.querySelector('#play-playlist');
let playButton = document.querySelectorAll('#play');
let prevButton = document.querySelector('#prev');
let nextButton = document.querySelector('#next');
let audio = document.querySelector('#audio');
let progress = document.querySelector('.progress');
let title = document.querySelector('#title');
let singer = document.querySelector('#singer');
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

function playSong(e){
    musicContainer.classList.add('play');
    const target = e.target;
    if(target.classList[1] !== 'fa-forward' && target.classList[1] !== 'fa-backward'){
        target.classList.remove('fa-play');
        target.classList.add('fa-pause');
    }
    audio.play();

    console.log(target.classList[1]);
}

function pauseSong(e){
    musicContainer.classList.remove('play');
    const target = e.target;
    target.classList.remove('fa-pause');
    target.classList.add('fa-play');
    audio.pause();
    console.log(target);
}

function prevSong(e) {
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong(e);
}

function nextSong(e) {
    songIndex++;

    if(songIndex > songs.length-1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong(e);
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

function addSongToPlaylist(){
    const playlistItem = document.createElement('div');
    playlistItem.classList.add('playlist');
    playlistItem.classList.add('container');
    playlistItem.classList.add('my-2');
    playlistWrapper.appendChild(playlistItem);

    const songTitle = document.createElement('h5');
    songTitle.innerText = title.innerText;
    playlistItem.appendChild(songTitle);

    const theSinger = document.createElement('p');
    theSinger.innerText = singer.innerText;
    playlistItem.appendChild(theSinger);
}

function checkPlay(e) {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong(e);
    }
    else {
        playSong(e);
    }
}

//event listener
playButton.forEach(item => {
    item.addEventListener('click', checkPlay);
});

//change song
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
addToPlaylist.addEventListener('click', addSongToPlaylist);



