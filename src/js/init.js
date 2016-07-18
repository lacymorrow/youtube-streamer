'use strict';

var player;
var streamID = "614op8uTsY8";
var channelID = "UC_rTKZjMrtXJSOfhwLzJAPw";
var pollInterval = 3;
var playingHD = false;
var videoIndex = [];

const loadVideo = (videoId) => {
    console.log('loadVideo', videoId);
    player.loadVideoById({
        videoId: videoId
    });
}

const loadStream = () => {
    console.log('loadStream');
    player.loadVideoById({
        videoId: streamID
    });
}


// create youtube player
function onYouTubePlayerAPIReady() {
    console.log('onYouTubePlayerAPIReady');
    // API Ready. Fire loading
    player = new YT.Player('video', {
        height: '720',
        width: '1280',
        // videoId: '58HGNft4uIY',
        playerVars: {
            controls: false,
            rel: false,
            showinfo: false,
            autohide: true,
            autoplay: true,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onError
        }
    });
}

// initial play
function onPlayerReady(event) {
    console.log('onPlayerReady');
    event.target.setVolume(100);
    //pollVideos();
}

// when video ends
function onPlayerStateChange(event) {
    if (event.data === 0) {
        // video ended
        loadStream();
        pollVideos();
    }
}

function onError(event) {
    console.log('onError', event);
    onYouTubePlayerAPIReady();
}


//http://stackoverflow.com/questions/30393289/youtube-api-3-get-last-videos-from-specific-user
