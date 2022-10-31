import { describe, expect, test } from '@jest/globals';
import express, { NextFunction, Request, Response } from 'express';
import { booleanize } from '../booleanize';
import request from 'supertest';

let app;

beforeAll(() => {
    app = express();
    app.use(booleanize());
    app.get('/health', (req: Request, res: Response) => {
        res.status(200).send("Ok");
    });
    app.get('/test', (req: Request, res: Response, next: NextFunction) => {
        res.json(req.query)
    })
});
const booleanQueryParams = ["isNew", "hasSomeValue"];
const someOtherVals = ["userId", "authX", "x", "blabla"]
const booleanQueryIOMap = {
    1: true,
    0: false,
    false: false,
    true: true,
    "something": "something",
    "_": "_"
}
booleanQueryParams.forEach((booleanQuery: any) => {
    describe(`Testing different values for ${booleanQuery}`, () => {
        Object.keys(booleanQueryIOMap).forEach((value: any) => {
            test(`passing ${booleanQuery}=${value}`, async () => {
                const response = (await request(app).get(`/test?${booleanQuery}=${value}`)).body;
                expect(response[booleanQuery]).toBe(booleanQueryIOMap[value]);
            })
        })
    })
})
