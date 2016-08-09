// if detects a new video, calls stops and calls loadVideo();
const pollVideos = () => {
  console.log('polling');
  getVideoList(channelID)
    .then(function(response) {
      console.log("loaded video list successfully", response);
    var videos = $.map(response.items, (e,i) => {
      return {
        id: e.id.videoId,
        title: e.snippet.title,
        description: e.snippet.description,
        img: e.thumbnails.high
      }
    });
    
    if($.inArray(videos[0].id, videoIndex) == -1){
      // play latest video if new
      loadVideo(videos[0].id);
      populateTray(videos);
    } else {
      // continue polling
      setTimeout(pollVideos, 60000*pollInterval);
    }
    
    // make sure old videos are marked and not played
    $.each(videos, (i, e) =>{
      if($.inArray(e.id, videoIndex) == -1){
        videoIndex.push(e.id);
      }
    });

    }, function(error) {
      console.error("failed loading video list", error);
    });
}