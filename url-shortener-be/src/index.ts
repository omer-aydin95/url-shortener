import express from "express";
import bodyParser from "body-parser";
import AppConstants from "./constants/AppConstants";
import AppMiddleWare from "./middlewares/AppMiddleware";
import AppController from "./controllers/AppController";

const APP = express();

APP.use(bodyParser.urlencoded({extended: false}));
APP.use(bodyParser.json());
APP.use("/v1", AppMiddleWare);

APP.use("/v1", AppController);

APP.listen(AppConstants.APP_PORT, () => {
    console.info(`App is listening the port ${AppConstants.APP_PORT}`);
});
