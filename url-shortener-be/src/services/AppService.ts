import ShortenedUrl from "../models/ShortenedUrl";

export default interface AppService {
    getAllShortenedUrls(callback: Function);

    saveShortenedUrl(realUrl: string, callback: Function);
}
