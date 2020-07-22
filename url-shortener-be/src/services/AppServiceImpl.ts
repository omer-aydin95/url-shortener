import AppDao from "../dao/AppDao";
import AppService from "./AppService";
import ShortenedUrl from "../models/ShortenedUrl";
import AppConstants from "../constants/AppConstants";
import OperationStatus from "../constants/OperationStatus";
import AppUtils from "../utils/AppUtils";

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
            const pattern = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i;

            if(!pattern.test(realUrl)) {
                callback(new ShortenedUrl(), OperationStatus.FAIL);
            } else {
                if(operationStatus == OperationStatus.SUCCESS) {
                    if(shortenedUrl != null) {
                        shortenedUrl = Object.setPrototypeOf(shortenedUrl, ShortenedUrl.prototype);
                        shortenedUrl.setShortenedUrl(AppConstants.BASE_URL + shortenedUrl.getShortenedUrl());
                        callback(shortenedUrl, operationStatus);
                    } else {
                        const shortenedUrl: ShortenedUrl = new ShortenedUrl();
                        shortenedUrl.setRealUrl(realUrl);
                        shortenedUrl.setShortenedUrl(AppUtils.getRandomShort(AppConstants.SHORTENING_SIZE));
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
            }
        });
    }

    deleteShortenedUrl(id: string, callback: Function) {
        this.appDao.deleteShortenedUrl(id, callback);
    }
}
