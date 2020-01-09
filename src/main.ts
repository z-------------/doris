import Channel from "./channel";
import Video from "./video";

(async () => {
    const c = new Channel("UC-lHJZR3Gqxm24_Vd_AJ5Yw");
    const lastV = new Video("xdjj5sAOfBg", new Date(1577902501000), c.id);
    
    const items: Video[] = [];
    for await (const item of await c.getUploads()) {
        const v = Video.fromContentDetails(item.contentDetails, c.id);
        if (v.id === lastV.id || v.date < lastV.date) break;
        else items.push(v);
    }
    console.log(items);
})();
