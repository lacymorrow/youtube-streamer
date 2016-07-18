// if detects a new video, calls stops and calls loadVideo();
const pollVideos = () => {
  console.log('polling');
  getVideoList(channelID)
    .then(function(response) {
      console.log("loaded video list successfully", response);
    var videoIds = $.map(response.items, (e,i) => {
      return e.id.videoId
    });
    
    if($.inArray(videoIds[0], videoIndex) == -1){
      // play latest video if new
      loadVideo(videoIds[0]);
    } else {
      // continue polling
      setTimeout(pollVideos, 60000*pollInterval);
    }
    
    // make sure old videos are marked and not played
    $.each(videoIds, (i, e) =>{
      if($.inArray(e, videoIndex) == -1){
        videoIndex.push(e);
      }
    });
    }, function(error) {
      console.error("failed loading video list", error);
    });
}