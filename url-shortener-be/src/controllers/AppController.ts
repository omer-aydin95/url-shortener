import {Router} from "express";
import AppDaoImpl from "../dao/AppDaoImpl";
import MongoDBClient from "../db/MongoDBClient";
import AppServiceImpl from "../services/AppServiceImpl";
import ShortenedUrl from "../models/ShortenedUrl";
import DBClient from "../db/DBClient";
import AppDao from "../dao/AppDao";
import AppService from "../services/AppService";
import OperationStatus from "../constants/OperationStatus";

const APP_CONTROLLER = Router();
const MONGODB_CLIENT: DBClient = new MongoDBClient();
const APP_DAO: AppDao = new AppDaoImpl(MONGODB_CLIENT);
const APP_SERVICE: AppService = new AppServiceImpl(APP_DAO);

APP_CONTROLLER.get(
    "/get-all", (req, res) => {
        APP_SERVICE.getAllShortenedUrls(
            (shortenedUrls: Array<ShortenedUrl>, operationStatus: OperationStatus) => {
                if(operationStatus == OperationStatus.SUCCESS) {
                    res.status(200);
                } else {
                    res.status(500);
                }

                res.json(shortenedUrls);
            }
        );
    }
);

APP_CONTROLLER.get(
    "/short-url", (req, res) => {
        APP_SERVICE.saveShortenedUrl(req.query.realUrl.toString(), (shortenedUrl: ShortenedUrl, operationStatus: OperationStatus) => {
            if(operationStatus == OperationStatus.SUCCESS) {
                res.status(200);
            } else {
                res.status(500);
            }
            
            res.json(shortenedUrl);
        });
    }
);

export default APP_CONTROLLER;
