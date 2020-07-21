import supertest from "supertest";
import APP from "../src/app";
import ShortenedUrl from "../src/models/ShortenedUrl";

describe("Endpoint Tests", () => {
    const shortUrlEndpoint: string = "/v1/short-url";
    const getAllEndpoint: string = "/v1/get-all";

    const req = supertest(APP);

    let id: string = "";
    const realUrl = "http://123456abcdef.com";
    
    test(`${shortUrlEndpoint} with GET method responses with 500 without 'realUrl' param`, async () => {
        const res = await req.get(shortUrlEndpoint);

        expect(res.status).toBe(500);
    });

    test(`${shortUrlEndpoint} with GET method`, async () => {
        const res = await req.get(`${shortUrlEndpoint}?realUrl=${realUrl}`);

        expect(res.status).toBe(200);
        
        const shortenedUrl: ShortenedUrl = Object.setPrototypeOf(res.body, ShortenedUrl.prototype);
        id = shortenedUrl.getId();
        expect(id).not.toBe("");
    });

    test(`${getAllEndpoint} with GET method`, async () => {
        const res = await req.get(getAllEndpoint);

        expect(res.status).toBe(200);

        expect(res.body.length).toBeGreaterThan(0);
    });

    test(`${shortUrlEndpoint} with DELETE method responses with 500 without 'id' param`, async () => {
        const res = await req.delete(shortUrlEndpoint);

        expect(res.status).toBe(500);
    });

    test(`${shortUrlEndpoint} with DELETE method`, async () => {
        const res = await req.delete(`${shortUrlEndpoint}?id=${id}`);

        expect(res.status).toBe(200);
    });
});
