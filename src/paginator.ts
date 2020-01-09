import api from "./api";

export interface Iterator {
    next: () => Promise<IterationResult>;
}

export interface Iterable {
    [Symbol.asyncIterator](): Iterator;
}

export interface IterationResult {
    done: boolean;
    value?: any;
}

/**
 * Paginate over YouTube API pages.
 */
export default class Paginator implements Iterator, Iterable {
    private end = false;
    private nextPageToken: string;

    constructor(private endpoint: string, private params: { [s : string]: string }) {}

    async next(): Promise<IterationResult> {
        const _params = Object.assign({}, this.params, this.nextPageToken ? { pageToken: this.nextPageToken } : null);
        const body = await api(this.endpoint, _params);

        if ("nextPageToken" in body) this.nextPageToken = body.nextPageToken;
        else this.end = true;

        if (this.end) {
            return { done: true };
        } else {
            return { done: false, value: body.items };
        }
    }

    [Symbol.asyncIterator](): Iterator {
        return {
            next: this.next.bind(this),
        }
    }
}
