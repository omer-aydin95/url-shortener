export default interface AppService {
    getAllShortenedUrls(callback: Function);

    saveShortenedUrl(realUrl: string, callback: Function);

    deleteShortenedUrl(id: string, callback: Function);
}
