import {Router} from "express";

const APP_MIDDLEWARE = Router();

APP_MIDDLEWARE.use(
    "/", (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        next();
    }
);

APP_MIDDLEWARE.use(
    "/short-url", (req, res, next) => {
        if(req.query.realUrl && req.query.realUrl != "") {
            next();
        } else {
            res.status(400).json({});
        }
    }
);

export default APP_MIDDLEWARE;
