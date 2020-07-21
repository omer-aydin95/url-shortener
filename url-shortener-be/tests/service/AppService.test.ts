import DBClient from "../../src/db/DBClient";
import MongoDBClient from "../../src/db/MongoDBClient";
import AppDao from "../../src/dao/AppDao";
import AppDaoImpl from "../../src/dao/AppDaoImpl";
import AppService from "../../src/services/AppService";
import AppServiceImpl from "../../src/services/AppServiceImpl";
import ShortenedUrl from "../../src/models/ShortenedUrl";
import OperationStatus from "../../src/constants/OperationStatus";

describe("App Service Tests", () => {
    const dbClient: DBClient = new MongoDBClient();
    const appDao: AppDao = new AppDaoImpl(dbClient);
    const appService: AppService = new AppServiceImpl(appDao);

    const realUrl: string = "http://123456qwerty.com";
    let shortenedUrl: ShortenedUrl = new ShortenedUrl();

    test("Save shortened url", () => {
        appService.saveShortenedUrl(realUrl, (shortenedUrlInsert: ShortenedUrl, operationStatus: OperationStatus) => {
            shortenedUrl.setId(shortenedUrlInsert.getId());
            shortenedUrl.setRealUrl(shortenedUrlInsert.getRealUrl());
            shortenedUrl.setShortenedUrl(shortenedUrlInsert.getShortenedUrl());
            shortenedUrl.setNumberOfVisit(shortenedUrlInsert.getNumberOfVisit());
            shortenedUrl.setExpireDate(shortenedUrlInsert.getExpireDate());
            shortenedUrl.setCreateDate(shortenedUrlInsert.getCreateDate());

            expect(operationStatus).toBe(OperationStatus.SUCCESS);
            expect(shortenedUrlInsert.getId()).toBeTruthy();
        });
    });

    test("Retrieve all shortened urls", () => {
        appService.getAllShortenedUrls((shortenedUrls: Array<ShortenedUrl>, operationStatus: OperationStatus) => {
            expect(operationStatus).toBe(OperationStatus.SUCCESS);
            expect(shortenedUrls.length).toBeGreaterThan(0);
        });
    });

    test("Delete shortened url", () => {
        appService.deleteShortenedUrl(shortenedUrl.getId(), (operationStatus: OperationStatus) => {
            expect(operationStatus).toBe(OperationStatus.SUCCESS);
        });
    });
});
