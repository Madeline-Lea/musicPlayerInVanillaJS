
//Container (hold all the html and css classes and elements)
const musicContainer = document.getElementById("music-container");
// Buttons
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// elements on front changes

const title = document.getElementById("title");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

// time steps
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTIme");

//song titles (calling song titles on click after next or prev event)

const songs = ["intoToDust", "you", "videoTape"];

/* song index; music initialize from 0 and the list
 keep up until 2, if a song has been added into "songs array",
 a new song will be added.
 
 ex: 0,1,2,3,4...
 five songs.*/

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

/* Music Audio functions: it makes music play or stop
 and goes next or prev.
 */

// it plays a song and changes the button icon to pause
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// it pauses a song and changes the button icon to play
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.pause();
}

// it change the song to next one

function nextSong() {
    songIndex++;
  
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
  }

// it change the song to previous one

    function prevSong(){
        songIndex--;
        if(songIndex < 0) {
            songIndex = songs.length - 1;
        }
        loadSong(songs[songIndex]);

        playSong();
    }


//updates the progress bar status

//"it catches the duration of song and divide by the current time and duration and the multiplies by 100"

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
// It set the progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//It get the song duration and the current time to get the time of the song

function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};


// Event Listeners

playBtn.addEventListener('click', function (){
    const isPlaying = musicContainer.classList.contains('play');
    
    if(isPlaying){
        pauseSong()
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click',setProgress);

audio.addEventListener('ended', nextSong);





var playPromise = document.querySelector('audio').play();

// In browsers that don’t yet support this functionality,
// playPromise won’t be defined.
if (playPromise !== audio) {
  playPromise.then(function() {
    // Automatic playback started!
  }).catch(function(error) {
    // Automatic playback failed.
    // Show a UI element to let the user manually start playback.
    console.log(error)
});
}


















/* var life = true;
var fun = ["school", "home", "with our friends"];

function loop() {
  if (this.life === true) {
    for (moments in this.fun) {
      this.life = "The best part of life is to be with you all time.";
    }
  }
}

prompt(this.life + "  In " + moments);
 */
