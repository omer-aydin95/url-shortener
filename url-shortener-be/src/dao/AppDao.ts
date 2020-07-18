import ShortenedUrl from "../models/ShortenedUrl";

export default interface AppDao {
    getAllShortenedUrls(callback: Function);

    getShortenedUrl(realUrl: string, callback: Function);

    saveShortenedUrl(shortenedUrl: ShortenedUrl, callback: Function);

    deleteShortenedUrl(id: string, callback: Function);
}
