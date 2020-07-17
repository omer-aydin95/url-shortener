import AppDao from "../dao/AppDao";
import AppService from "./AppService";
import ShortenedUrl from "../models/ShortenedUrl";
import AppConstants from "../constants/AppConstants";
import OperationStatus from "../constants/OperationStatus";

export default class AppServiceImpl implements AppService {
    private appDao!: AppDao;
    
    constructor(appDao: AppDao) {
        this.appDao = appDao;
    }

    public getAllShortenedUrls(callback: Function) {
        this.appDao.getAllShortenedUrls(callback);
    }

    saveShortenedUrl(realUrl: string, callback: Function) {
        this.appDao.getShortenedUrl(realUrl, (shortenedUrl: ShortenedUrl, operationStatus: OperationStatus) => {
            
            if(operationStatus == OperationStatus.SUCCESS) {
                if(shortenedUrl != null) {
                    shortenedUrl = Object.setPrototypeOf(shortenedUrl, ShortenedUrl.prototype);
                    shortenedUrl.setShortenedUrl(AppConstants.BASE_URL + shortenedUrl.getShortenedUrl());
                    callback(shortenedUrl, operationStatus);
                } else {
                    const shortenedUrl: ShortenedUrl = new ShortenedUrl();
                    shortenedUrl.setRealUrl(realUrl);
                    shortenedUrl.setShortenedUrl(this.getRandomShort(AppConstants.SHORTENING_SIZE));
                    shortenedUrl.setNumberOfVisit(0);
                    const currentDate: Date = new Date(Date.now());
                    shortenedUrl.setCreateDate(currentDate);
                    const expireDate: Date = new Date(currentDate);
                    expireDate.setDate(currentDate.getDate() + AppConstants.SHORTENED_URL_EXPIRE_DAYS);
                    shortenedUrl.setExpireDate(expireDate);
    
                    this.appDao.saveShortenedUrl(shortenedUrl, callback);
                }
            } else {
                callback(shortenedUrl, operationStatus);
            }
        });
    }

    private getRandomShort(numberOfChar: number): string {
        let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let short = "";
    
        for(let i = 0; i < numberOfChar; i++) {
            let randomIndex = Math.floor(Math.random() * (chars.length + 1));
    
            short += chars.charAt(randomIndex);
        }
    
        return short;
    }
}
