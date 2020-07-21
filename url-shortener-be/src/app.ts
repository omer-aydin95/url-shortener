import express from "express";
import bodyParser from "body-parser";
import AppMiddleware from "./middlewares/AppMiddleware";
import AppController from "./controllers/AppController";

const APP = express();

APP.use(bodyParser.urlencoded({extended: false}));
APP.use(bodyParser.json());
APP.use("/", AppMiddleware);

APP.use("/v1", AppController);

export default APP;
