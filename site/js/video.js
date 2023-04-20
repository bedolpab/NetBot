export default class Video {
  constructor(
    id,
    channelId,
    channelTitle,
    isLive,
    publishedAt,
    title,
    statistics,
    activeLiveChatId,
    actualStartTime,
    uploadStatus,
    license
  ) {
    this.id = id;
    this.channelId = channelId;
    this.channelTitle = channelTitle;
    this.isLive = isLive;
    this.publishedAt = publishedAt;
    this.title = title;
    this.statistics = statistics;
    this.activeLiveChatId = activeLiveChatId;
    this.actualStartTime = actualStartTime;
    this.uploadStatus = uploadStatus;
    this.license = license;
  }
}
