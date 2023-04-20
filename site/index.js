import { Livestream } from "./js/livestream.js";
let apiKey = "";
let livestreamInstance;
let intervalID;
let frameLabel;
let interval = 0;

const form = document.querySelector(".search form");
const input = document.querySelector(".search input");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");
const save = document.querySelector("#save");
const training = document.querySelector("#training");
const label = document.querySelector("#label");
const currentTimeTag = document.querySelector("#current-time");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  training.innerHTML = "";
  livestreamInstance = new Livestream(input.value, apiKey);
  livestreamInstance.player.addEventListener("onReady", () => {
    showData();
  });
});

play.addEventListener("click", () => {
  if (livestreamInstance) {
    var currentTime = new Date().getTime() / 1000;
    var elapsedLiveTime = currentTime - livestreamInstance.data.actualStartTime;
    var mostRecentTime =
      livestreamInstance.data.actualStartTime + Math.min(elapsedLiveTime);
    livestreamInstance.player.seekTo(mostRecentTime);
  }
  startInterval();
  livestreamInstance.player.playVideo();
});

pause.addEventListener("click", () => {
  clearInterval(intervalID);
  livestreamInstance.player.pauseVideo();
});

stop.addEventListener("click", () => {
  clearInterval(intervalID);
  livestreamInstance.player.stopVideo();
  training.value = "";
});

label.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    frameLabel = label.value;
    label.value = "";
  }
});

save.addEventListener("click", () => {
  interval += 1;
  let filename = "training_data_" + interval.toString() + ".txt";
  let blob = document.createElement("a");
  blob.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(training.value)
  );
  blob.setAttribute("download", filename);
  blob.style.display = "none";
  document.body.appendChild(blob);
  blob.click();
  document.body.removeChild(blob);
});

function showData() {
  if (livestreamInstance.data.isLive === "live") {
    document.querySelector("#live").innerHTML = "Live";
    document.querySelector("#viewCount").innerHTML =
      "View Count: " + livestreamInstance.data.statistics;
  }

  document.querySelector("#publishedAt").innerHTML =
    "Published at:" +
    "<br><span>" +
    livestreamInstance.data.publishedAt +
    "</span>";

  document.querySelector("#actualStartTime").innerHTML =
    "Actual Start Time:" +
    "<br><span>" +
    livestreamInstance.data.actualStartTime +
    "</span>";

  document.querySelector("#uploadStatus").innerHTML =
    "Upload Status:" +
    "<br><span>" +
    livestreamInstance.data.uploadStatus +
    "</span>";

  document.querySelector("#channelTitle").innerHTML =
    "Channel Title:" +
    "<br><span>" +
    livestreamInstance.data.channelTitle +
    "</span>";

  document.querySelector("#channelID").innerHTML =
    "Channel ID:" +
    "<br><span>" +
    livestreamInstance.data.channelId +
    "</span>";

  document.querySelector("#title").innerHTML = livestreamInstance.data.title;

  document.querySelector("#license").innerHTML =
    "&copy" + livestreamInstance.data.license;
}

function startInterval() {
  intervalID = setInterval(() => {
    // if livestreamInstance is undefined
    if (livestreamInstance) {
      var currentTime = livestreamInstance.player.getCurrentTime();
      var minutes = Math.floor(currentTime / 60);
      var seconds = Math.floor(currentTime % 60);
      var timeStr =
        "(" +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds +
        ", " +
        frameLabel +
        ")";
      training.value += timeStr + "\n";
      currentTimeTag.innerHTML =
        "Current time: " + "<br><span>" + timeStr + "</span>";
      frameLabel = "";
    }
  }, 1000);
}
