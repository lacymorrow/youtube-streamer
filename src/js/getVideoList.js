const getVideoList = channelID => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&maxResults=50&channelId=' + channelID + '&key=' + YT_KEY,
      cache: false
    })
      .fail(()=>{
        reject(Error("It broke"));
    })
      .done((res)=>{
        resolve(res);
    });
  });
}
