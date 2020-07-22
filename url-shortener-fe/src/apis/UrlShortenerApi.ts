import ShortenedUrl from "../models/ShortenedUrl";
import axios from "axios";
import RequestResults from "../constants/RequestResults";

export default class UrlShortenerApi {
    private readonly BASE_URL: string = "http://localhost:8081";
    private readonly API_VERSION: string = "/v1";
    private readonly GET_ALL_ENDPOINT: string = "/get-all";
    private readonly SHORT_URL: string = "/short-url";

    public getAllShortenedUrls(callback: Function) {
        axios.get(this.BASE_URL + this.API_VERSION + this.GET_ALL_ENDPOINT).then(
            (res) => {
                const shortenedUrls: Array<ShortenedUrl> = new Array<ShortenedUrl>();

                if(res.status == 200) {
                    res.data.map(
                        (e: object) => {
                            shortenedUrls.push(
                                Object.setPrototypeOf(e, ShortenedUrl.prototype)
                            );
                        }
                    );
                }

                callback(shortenedUrls);
            }
        ).catch(
            (err) => {
                console.error(err);

                callback(null);
            }
        );
    }

    public shortUrl(realUrl: string, callback: Function) {
        axios.get(this.BASE_URL + this.API_VERSION + this.SHORT_URL, {
            params: {
                realUrl: encodeURI(realUrl)
            }
        }).then(
            (res) => {
                if(res.status == 200) {
                    callback(Object.setPrototypeOf(res.data, ShortenedUrl.prototype));
                } else {
                    callback(null);
                }
            }
        ).catch(
            (err) => {
                console.error(err);

                callback(null);
            }
        );
    }

    public deleteShortUrl(id: string, callback: Function) {
        axios.delete(this.BASE_URL + this.API_VERSION + this.SHORT_URL, {
            params: {
                id: id
            }
        }).then(
            (res) => {
                if(res.status == 200) {
                    callback(RequestResults.SUCCESS);
                } else {
                    callback(RequestResults.FAIL);
                }
            }
        ).catch(
            (err) => {
                console.error(err);

                callback(RequestResults.FAIL);
            }
        );
    }
}
