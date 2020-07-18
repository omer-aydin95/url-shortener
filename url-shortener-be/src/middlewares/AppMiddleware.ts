import {Router} from "express";

const APP_MIDDLEWARE = Router();

APP_MIDDLEWARE.use(
    "/", (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");

        next();
    }
);

APP_MIDDLEWARE.use(
    "/short-url", (req, res, next) => {
        if(req.method.toUpperCase() == "GET") {
            if(req.query.realUrl && req.query.realUrl != "") {
                next();
            } else {
                res.status(400).json({});
            }
        } else if(req.method.toUpperCase() == "DELETE") {
            if(req.query.id && req.query.id != "") {
                next();
            } else {
                res.status(400).json({});
            }
        } else {
            res.status(405).json({});
        }
    }
);

export default APP_MIDDLEWARE;
