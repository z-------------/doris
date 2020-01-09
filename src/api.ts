import { YOUTUBE_API_KEY } from "../keys.json";

/* consts */

const BASE = "https://www.googleapis.com/youtube/v3";
const headers = {
    "Accept": "application/json"
};

/* private */

function makeQueryString(params: { [key: string]: string }) {
    return Object.keys(params || {}).map(key => `${key}=${params[key]}`).join("&");
};

/* public */

export default function api(endpoint: string, params: { [s: string]: string }): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
        fetch(`${BASE}/${endpoint}?key=${YOUTUBE_API_KEY}&${makeQueryString(params)}`, { headers })
            .then(body => body.json())
            .then(body => {
                if (body.error) reject(body.error);
                else resolve(body);
            })
            .catch(err => reject(err));
    });
};
