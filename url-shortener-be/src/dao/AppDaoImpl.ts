import DBClient from "../db/DBClient";
import AppDao from "./AppDao";
import ShortenedUrl from "../models/ShortenedUrl";
import AppConstants from "../constants/AppConstants";
import OperationStatus from "../constants/OperationStatus";
import CollectionConstants from "../constants/CollectionConstants";
import sanitize from "mongo-sanitize";
import {ObjectId} from "mongodb";

export default class AppDaoImpl implements AppDao {
    private dbClient!: DBClient;

    constructor(dbClient: DBClient) {
        this.dbClient = dbClient;
    }

    public getAllShortenedUrls(callback: Function) {
        let shortenedUrls = new Array<ShortenedUrl>();

        this.dbClient.getClient().connect().then(
            (client) => {
                const coll = client.db(this.dbClient.getConnectedDB()).collection(CollectionConstants.SHORTENED_URLS);

                coll.find({}).toArray().then(
                    (docs) => {
                        docs.map(
                            e => {
                                let shortenedUrl: ShortenedUrl = new ShortenedUrl();
                                shortenedUrl.setId(e._id);
                                shortenedUrl.setRealUrl(e.realUrl);
                                shortenedUrl.setShortenedUrl(AppConstants.BASE_URL + e.shortenedUrl);
                                shortenedUrl.setNumberOfVisit(e.numberOfVisit);
                                shortenedUrl.setExpireDate(e.expireDate);
                                shortenedUrl.setCreateDate(e.createDate);
                                shortenedUrls.push(shortenedUrl);
                            }
                        );

                        callback(shortenedUrls, OperationStatus.SUCCESS);
                    }
                ).catch(
                    (err) => {
                        console.error(err);

                        callback(shortenedUrls, OperationStatus.FAIL);
                    }
                );
            }
        ).catch(
            (err) => {
                console.error(err);

                callback(shortenedUrls, OperationStatus.FAIL);
            }
        );
    }

    public getShortenedUrl(realUrl: string, callback: Function) {
        this.dbClient.getClient().connect().then(
            (client) => {
                const coll = client.db(this.dbClient.getConnectedDB()).collection(CollectionConstants.SHORTENED_URLS);

                coll.findOne({realUrl: sanitize(realUrl)}).then(
                    (doc) => {
                        callback(doc, OperationStatus.SUCCESS);
                    }
                ).catch(
                    (err) => {
                        console.error(err);

                        callback(new ShortenedUrl(), OperationStatus.FAIL);
                    }
                );
            }
        ).catch(
            (err) => {
                console.error(err);

                callback(new ShortenedUrl(), OperationStatus.FAIL);
            }
        );
    }

    public saveShortenedUrl(shortenedUrl: ShortenedUrl, callback: Function) {
        this.dbClient.getClient().connect().then(
            (client) => {
                const coll = client.db(this.dbClient.getConnectedDB()).collection(CollectionConstants.SHORTENED_URLS);

                const shortenedUrlInsert: ShortenedUrl = Object.setPrototypeOf(
                    JSON.parse(JSON.stringify(shortenedUrl)), ShortenedUrl.prototype
                );
                shortenedUrlInsert.setRealUrl(sanitize(shortenedUrlInsert.getRealUrl()));

                coll.insertOne(shortenedUrlInsert).then(
                    (res) => {
                        shortenedUrlInsert.setShortenedUrl(AppConstants.BASE_URL + shortenedUrlInsert.getShortenedUrl());

                        callback(shortenedUrlInsert, OperationStatus.SUCCESS);
                    }
                ).catch(
                    (err) => {
                        console.error(err);

                        callback(new ShortenedUrl(), OperationStatus.FAIL);
                    }
                );
            }
        ).catch(
            (err) => {
                console.error(err);

                callback(new ShortenedUrl(), OperationStatus.FAIL);
            }
        );
    }

    deleteShortenedUrl(id: string, callback: Function) {
        this.dbClient.getClient().connect().then(
            (client) => {
                const coll = client.db(this.dbClient.getConnectedDB()).collection(CollectionConstants.SHORTENED_URLS);

                coll.deleteOne({_id: new ObjectId(sanitize(id))}).then(
                    (res) => {
                        callback(OperationStatus.SUCCESS);
                    }
                ).catch(
                    (err) => {
                        console.error(err);

                        callback(OperationStatus.FAIL);
                    }
                );
            }
        ).catch(
            (err) => {
                console.error(err);

                callback(OperationStatus.FAIL);
            }
        );
    }
}
