// Load YouTube IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var mainplayer;   // For the "No" button video (Maroon 5)
var songplayer;   // For the "Yes" button song (Everything)
var isYouTubeReady = false;

function onYouTubeIframeAPIReady() {
  mainplayer = new YT.Player('youtube-player', {
    height: '100%',
    width: '100%',
    videoId: 'nODwI0ogvuo', // Maroon 5 - Sugar
    playerVars: {
      'start': 45,
      'controls': 0,
      'autoplay': 1,
      'mute': 1, // Start muted to allow autoplay
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onError': onPlayerError,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  isYouTubeReady = true;
}

function onPlayerStateChange(event) {
  // If unmuted and playing, great. 
}

function onPlayerError(event) {
  console.log("YouTube Player Error: ", event.data);
}

function showMessage(response) {
  let videoPlayed = false;
  if (response === "No") {
    const noButton = document.getElementById("no-button");
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;

    // Set the button position to absolute
    noButton.style.position = "absolute";

    // Change the image source to "gun.gif"
    document.getElementsByClassName("image")[0].src = "images/areusure.jfif";

    // Generate random coordinates within the visible container
    const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

    // Apply the new coordinates to the button
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";

    // Update text content and hide the name message
    document.getElementById("question").textContent =
      "Choose wisely";
    document.getElementById("name").style.display = "none";

    // Add a mouseover event listener to the "No" button
    noButton.addEventListener("touchstart", () => {
      if (!videoPlayed) {
        if (isYouTubeReady && mainplayer) {
          document.getElementById('youtube-player-container').style.display = 'block';
          try {
            mainplayer.unMute();
            mainplayer.playVideo();
          } catch (e) {
            console.log("Autoplay blocked, user interaction needed");
          }
        }

        // Set the flag to true after playing the video
        videoPlayed = true;
      }

      // Generate new random coordinates when the button is hovered
      const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
      const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

      noButton.style.zIndex = "100";
      // Apply new coordinates to the button, causing it to move
      noButton.style.left = randomX + "px";
      noButton.style.top = randomY + "px";
    });
  }

  if (response === "Yes") {
  // Remove the name message and the "No" button
  document.getElementById("name").remove();
  document.getElementById("no-button").remove();

  // Stop and remove video player
  const playerContainer = document.getElementById('youtube-player-container');
  if (playerContainer) {
    playerContainer.remove();
  }
  if (mainplayer && mainplayer.stopVideo) {
    mainplayer.stopVideo();
    mainplayer.destroy();
  }
 var songContainer = document.createElement("div");
  songContainer.id = "youtube-song-container";
  songContainer.style.width = "1px";
  songContainer.style.height = "1px";
  songContainer.style.position = "fixed";
  songContainer.style.top = "-9999px";
  document.body.appendChild(songContainer);

  // Create the YouTube player for your song
 songplayer = new YT.Player('youtube-song-container', {
    videoId: 'HXV5aZaBLDo', // <-- put your YouTube song ID here
    playerVars: {
      start: 10,
      autoplay: 1,
      controls: 0,
      rel: 0,
      mute: 0
    },
    events: {
      'onReady': function(event) {
        event.target.playVideo(); // play immediately
      }
    }
  });


  // Update the text content and image
  const yesMessage = document.getElementById("question");
  yesMessage.textContent = "See you on the 14th my princess";
  yesMessage.style.display = "block";
  yesMessage.style.fontStyle = "normal";

  document.getElementsByClassName("image")[0].src = "images/yey.jfif";

  // Remove the "Yes" button
  document.getElementById("yesButton").remove();
}

}
