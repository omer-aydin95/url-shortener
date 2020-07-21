import DBClient from "../../src/db/DBClient";
import MongoDBClient from "../../src/db/MongoDBClient";
import AppDao from "../../src/dao/AppDao";
import AppDaoImpl from "../../src/dao/AppDaoImpl";
import ShortenedUrl from "../../src/models/ShortenedUrl";
import OperationStatus from "../../src/constants/OperationStatus";

describe("App DAO Tests", () => {
    const dbClient: DBClient = new MongoDBClient();
    const appDao: AppDao = new AppDaoImpl(dbClient);

    const shortenedUrl: ShortenedUrl = new ShortenedUrl();
    shortenedUrl.setRealUrl("http://qwerty123456.com");
    shortenedUrl.setShortenedUrl("qwerty123456");
    shortenedUrl.setNumberOfVisit(0);
    const currentDate: Date = new Date(Date.now());
    shortenedUrl.setExpireDate(currentDate);
    shortenedUrl.setCreateDate(currentDate);

    test("Save shortened url", () => {
        appDao.saveShortenedUrl(shortenedUrl, (shortenedUrlInsert: ShortenedUrl, operationStatus: OperationStatus) => {
            shortenedUrl.setId(shortenedUrlInsert.getId());

            expect(operationStatus).toBe(OperationStatus.SUCCESS);
        });
    });

    test("Retrieve all shortened urls", () => {
        appDao.getAllShortenedUrls((shortenedUrls: Array<ShortenedUrl>, operationStatus: OperationStatus) => {
            expect(operationStatus).toBe(OperationStatus.SUCCESS);
            expect(shortenedUrls.length).toBeGreaterThan(0);
        });
    });

    test("Retrieve shortened url", () => {
        appDao.getShortenedUrl(shortenedUrl.getRealUrl(), (shortenedUrl: ShortenedUrl, operationStatus: OperationStatus) => {
            expect(operationStatus).toBe(OperationStatus.SUCCESS);
            expect(shortenedUrl).not.toBe(null);

            const temp = Object.setPrototypeOf(shortenedUrl, ShortenedUrl.prototype);

            expect(temp.getId()).toBe(shortenedUrl.getId());
        });
    });

    test("Delete shortened url", () => {
        appDao.deleteShortenedUrl(shortenedUrl.getId(), (operationStatus: OperationStatus) => {
            expect(operationStatus).toBe(OperationStatus.SUCCESS);
        });
    });
});
