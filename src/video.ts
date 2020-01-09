interface VideoContentDetails {
    videoId: string;
    videoPublishedAt: string;
}

export default class Video {
    constructor(public id: string, public date: Date, public channelId: string) {}

    static fromContentDetails(contentDetails: VideoContentDetails, channelId: string): Video {
        return new Video(contentDetails.videoId, new Date(contentDetails.videoPublishedAt), channelId)
    }
}
