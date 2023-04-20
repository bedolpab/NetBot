import Video from "./video.js";

async function getYouTubeVideoData(id, apiKey) {
  return fetch(
    "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
      id +
      "&key=" +
      apiKey +
      "&part=snippet,contentDetails,statistics,liveStreamingDetails,status,recordingDetails"
  )
    .then((response) => response.json())
    .then((data) => {
      return new Video(
        data.items[0].id,
        data.items[0].snippet.channelId,
        data.items[0].snippet.channelTitle,
        data.items[0].snippet.liveBroadcastContent,
        data.items[0].snippet.publishedAt,
        data.items[0].snippet.title,
        data.items[0].statistics.viewCount,
        data.items[0].liveStreamingDetails.activeLiveChatId,
        data.items[0].liveStreamingDetails.actualStartTime,
        data.items[0].status.uploadStatus,
        data.items[0].status.license
      );
    });
}

export default getYouTubeVideoData;
