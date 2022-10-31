### How to use it?

```
import express from 'express';
import {booleanize} from 'booleanize-query-express';
const app = express();

app.use(booleanize()); // no options passed which means all of ["is", "has", "are", "can", "should"] prefixes are considered (default prefixes).

// or you can pass some options to booleanize({...}) as well
// app.use(booleanize({startingWith: ["has","in","are"]})) 
// in this case, only query params starting with 'has', 'in' and 'are' will be treated as boolean variables (overrides the default one)

app.get('/test?isValid=true&isNew=1&hasJob=0&somethingElse=false',(req: Request, res: Response) => {
    const {isValid, isNew, hasJob, somethingElse} = req.query;
    console.log(isValid === true); // true
    console.log(isNew === true); // true
    console.log(hasJob === false); // true
    console.log(somethingElse === "false"); //true, because somethingElse doesn't start with 'is' or 'has'
    return res.json(req.query);
})
````
### More information

Note that if you pass something like isblabla, even if it starts with is, this will not be considered as a boolean variable. It should follow the camelCase convention.
isBlabla // Correct
isblabla // Incorrect


