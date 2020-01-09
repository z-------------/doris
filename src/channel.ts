import api from "./api";
import Paginator, { Iterable } from "./paginator";

export default class Channel {
    constructor(public id: string) {}

    private async getUploadsPlaylistId(): Promise<string> {
        const listResponse = await api("channels", {
            part: "contentDetails",
            id: this.id,
        });
        if (listResponse.pageInfo.totalResults === 0) throw "Channel not found.";
        return listResponse.items[0].contentDetails.relatedPlaylists.uploads;
    }

    async paginateUploads(): Promise<Paginator> {
        const uploadsPlaylistId = await this.getUploadsPlaylistId();
        return new Paginator("playlistItems", {
            part: "contentDetails",
            playlistId: uploadsPlaylistId,
        });
    }

    async getUploads(): Promise<Iterable> {
        const uploadsPlaylistId = await this.getUploadsPlaylistId();
        const p = new Paginator("playlistItems", {
            part: "contentDetails",
            playlistId: uploadsPlaylistId,
        });

        let items: any[];
        let itemsLeft = 0;

        return {
            [Symbol.asyncIterator]: () => {
                return {
                    next: async function() {
                        if (itemsLeft > 0) {
                            return {
                                done: false,
                                value: items[items.length - itemsLeft--],
                            }
                        } else {
                            const itRes = await p.next();
                            if (itRes.done) {
                                return {
                                    done: true,
                                }
                            } else {
                                items = itRes.value;
                                itemsLeft = items.length - 1;
                                return {
                                    done: false,
                                    value: itRes.value[0],
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
