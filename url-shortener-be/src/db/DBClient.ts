export default interface DBClient {
    getClient(): any;

    getConnectedDB(): string;
}
