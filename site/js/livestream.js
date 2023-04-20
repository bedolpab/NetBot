import getYouTubeVideoData from "./api.js";

function onReady(e) {
  e.target.playVideo();
}

function onPlayerStateChange(e) {
  if (e.data == YT.PlayerState.PLAYING) {
    console.log("video is playing");
  } else if (e.data == YT.PlayerState.PAUSED) {
    console.log("video is paused");
  } else if (e.data == YT.PlayerState.ENDED) {
    console.log("video is ended");
  }
}

export class Livestream {
  player;
  data;
  #apiKey;
  constructor(id, apiKey) {
    this.id = id;
    this.#apiKey = apiKey;
    getYouTubeVideoData(id, this.#apiKey).then((data) => {
      this.data = data;
    });
    this.player = this.#createPlayer();
  }

  #createPlayer() {
    return new YT.Player("player", {
      height: "390",
      width: "640",
      videoId: this.id,
      playerVars: {
        playsinline: 1,
        autoplay: 1,
        color: "white",
        controls: 0,
        enablejsapi: 1,
        modestbranding: 1,
      },
      events: {
        onReady: onReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
}
