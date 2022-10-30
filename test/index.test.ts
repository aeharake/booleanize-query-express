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
const values = [1, 0, "false", "true", false, true, "something"]
const mapped = {
    1: true,
    0: false,
    "false": false,
    "true": true,
    "something": "something"
}
describe('testing health check', () => {
    test('health check should return 200', async () => {
        await request(app).get('/health').expect(200);
    });
})
describe('Passing isNew with different values', () => {
    test('isNew=true ', async () => {
        const response = (await request(app).get('/test?isNew=true')).body;
        expect(response.isNew).toBe(true);
    })
    test('isNew=false', async () => {
        const response = (await request(app).get('/test?isNew=false')).body;
        expect(response.isNew).toBe(false);
    })
    test('isNew=something', async () => {
        const response = (await request(app).get('/test?isNew=something')).body;
        expect(response.isNew).toBe("something");
    })
    test('isNew=0', async () => {
        const response = (await request(app).get('/test?isNew=0')).body;
        expect(response.isNew).toBe(false);
    })
    test('isNew=1', async () => {
        const response = (await request(app).get('/test?isNew=1')).body;
        expect(response.isNew).toBe(true);
    })
});
describe('Passing hasSomeValue with different values', () => {
    test('hasSomeValue=true ', async () => {
        const response = (await request(app).get('/test?hasSomeValue=true')).body;
        expect(response.hasSomeValue).toBe(true);
    })
    test('hasSomeValue=false', async () => {
        const response = (await request(app).get('/test?hasSomeValue=false')).body;
        expect(response.hasSomeValue).toBe(false);
    })
    test('passing hasSomeValue=something', async () => {
        const response = (await request(app).get('/test?hasSomeValue=something')).body;
        expect(response.hasSomeValue).toBe("something");
    })
    test('hasSomeValue=0', async () => {
        const response = (await request(app).get('/test?hasSomeValue=0')).body;
        expect(response.hasSomeValue).toBe(false);
    })
    test('hasSomeValue=1', async () => {
        const response = (await request(app).get('/test?hasSomeValue=1')).body;
        expect(response.hasSomeValue).toBe(true);
    })
});

// describe("All tests", () => {

//     test('hasSomeValue=1', async () => {
//         const response = (await request(app).get('/test?hasSomeValue=1')).body;
//         expect(response.hasSomeValue).toBe(true);
//     })
// })
// describe("passing hasSomething with different values", () => {
//     test.each(values)(`passing hasSomething=%s should return ${mapped["%s"]}`, async () => {
//         const response = (await request(app).get(`/test?hasSomething=${"%s"}`)).body;
//         expect(response.hasSomething).toBe(mapped["%s"])
//     })
// })