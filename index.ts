import express, { NextFunction, Request, Response } from 'express';
import { booleanize } from './booleanize';

const app = express();
app.use(booleanize());
app.get('/health', (req: Request, res: Response) => {
    res.status(200).send("Ok");
});
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.json(req.query)
})
app.listen(3000, () => {
    console.log("listening");
});