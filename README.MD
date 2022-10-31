### How to use it?

import express from 'express';

const app = express();

app.use(booleanize());

// or you can pass some options to booleanize as well
// app.use(booleanize({startingWith: ["has"]})) //in this case, all query params starting with 'is; will not be treated as boolean variables.

app.get('/test?isValid=true&isNew=1&hasJob=0',(req: Request, res: Response) => {
    const {isValid, isNew, hasJob} = req.query;
    console.log(isValid === true); // true
    console.log(isNew === true); // true
    console.log(hasJob === true); // false
    return res.json(req.query);
})

