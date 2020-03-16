const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //Get length of the outline
    const outlineLength = outline.getTotalLength();
    //console.log(outlineLength);

    //Duration
    let songDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;    

    //Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //Play sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    //Select sound
    timeSelect.forEach(option => {
        option.addEventListener("click", function(){
            songDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(songDuration / 60)}:${('0' + Math.floor(songDuration) % 60).slice(-2)}`
        });
    });        

    //Create a function to stop and play sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //We can animate the circle
    song.ontimeupdate = () => {
       let currentTime = song.currentTime;
       let elapsed = songDuration - currentTime;
       let seconds = ('0' + Math.floor(elapsed % 60)).slice(-2);
       let minutes = Math.floor(elapsed / 60);

       //Animate the circle
       let progress = outlineLength - (currentTime / songDuration) * outlineLength;
       outline.style.strokeDashoffset = progress;

       //Animate the text
       timeDisplay.textContent = `${minutes}:${seconds}`;

       if(currentTime >= songDuration) {
           song.pause();
           song.currentTime = 0;
           play.src = './svg/play.svg';
           video.pause();
       }
    };

};

app();