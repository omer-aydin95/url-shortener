import DBClient from "./DBClient";
import DBConfig from "../../db.config";
import {MongoClient} from "mongodb";

export default class MongoDBClient implements DBClient {
    private static client: MongoClient;

    constructor() {
        if(MongoDBClient.client == undefined || MongoDBClient.client == null) {
            MongoDBClient.client = this.createClient();
        }
    }

    public getClient() {
        if(MongoDBClient.client != undefined && MongoDBClient.client != null) {
            return MongoDBClient.client;
        } else {
            MongoDBClient.client = this.createClient();

            return MongoDBClient.client;
        }
    }

    public getConnectedDB() {
        return DBConfig.DB_NAME;
    }

    private createClient() {
        const connStr = `mongodb://${DBConfig.HOST}:${DBConfig.PORT}/${DBConfig.DB_NAME}?authSource=admin`;
        
        return new MongoClient(connStr, {useUnifiedTopology: true});
    }
}
