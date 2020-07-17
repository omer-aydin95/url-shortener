export default class ShortenedUrl {
    private _id!: string;
    private realUrl!: string;
    private shortenedUrl!: string;
    private numberOfVisit!: number;
    private expireDate!: Date;
    private createDate!: Date;

    public getId(): string {
        return this._id;
    }

    public setId(id: string) {
        this._id = id;
    }

    public getRealUrl(): string {
        return this.realUrl;
    }

    public setRealUrl(realUrl: string) {
        this.realUrl = realUrl;
    }

    public getShortenedUrl(): string {
        return this.shortenedUrl;
    }

    public setShortenedUrl(shortenedUrl: string) {
        this.shortenedUrl = shortenedUrl;
    }

    public getNumberOfVisit(): number {
        return this.numberOfVisit;
    }

    public setNumberOfVisit(numberOfVisit: number) {
        this.numberOfVisit = numberOfVisit;
    }

    public getExpireDate(): Date {
        return this.expireDate;
    }

    public setExpireDate(expireDate: Date) {
        this.expireDate = expireDate;
    }

    public getCreateDate(): Date {
        return this.createDate;
    }

    public setCreateDate(createDate: Date) {
        this.createDate = createDate;
    }
}
