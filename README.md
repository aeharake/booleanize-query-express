# express-query-booleanizer

### Express JS middleware to sanitize boolean query params

Who among us wasn't frustrated by the fact that everytime the request has a query parameter in the url like `isLast=1` or `isLast=true`, you should write extra code by yourself to convert that string **"1"** or **"true"** to a boolean `true` value.

Here comes `express-query-booleanizer` to the rescue!

### Prerequisites

- npm installed on your local machine
- an express js project where you'll make use of this middleware.

### Installing

    npm install express-query-booleanizer

Once the package is installed in node_modules, you can use it simply

### Example

```
import express from 'express';
import {booleanize} from 'express-query-booleanizer';

const app = express();
```

If no options are passed in booleanize(..),
then booleanize will consider that all of the query parameters starting with `["is", "has", "are", "can", "should"]` are boolean query params.

```
app.use(booleanize()); 
```
To override the default `startingWith` options, you can do the following:

```
// app.use(booleanize({startingWith: ["has","in","are"]})) 
```


**in this case, only query params starting with 'has', 'in' and 'are' will be treated as boolean variables (overrides the default one)**

Now the essential part:

```
app.get('/test?isValid=true&isNew=1&hasJob=0&somethingElse=false',(req: Request, res: Response) => {
    const {isValid, isNew, hasJob, somethingElse} = req.query;
    console.log(isValid === true); // true
    console.log(isNew === true); // true
    console.log(hasJob === false); // true
    console.log(somethingElse === "false"); //true, because somethingElse doesn't start with 'is' or 'has'
    return res.json(req.query);
})

```

### Full example
```
import express from 'express';
import {booleanize} from 'express-query-booleanizer';

const app = express();
app.use(booleanize()); 
// app.use(booleanize({startingWith: ["has","in","are"]})) 
app.get('/test?isValid=true&isNew=1&hasJob=0&somethingElse=false',(req: Request, res: Response) => {
    const {isValid, isNew, hasJob, somethingElse} = req.query;
    console.log(isValid === true); // true
    console.log(isNew === true); // true
    console.log(hasJob === false); // true
    console.log(somethingElse === "false"); //true, because somethingElse doesn't start with 'is' or 'has'
    return res.json(req.query);
})
```
### Note!

All query params variable must be camelCased, or else, even if they start with "is","has", or whatever prefix in the provided or default array, the middleware will not convert them to boolean, and they will remain as string.

    isBlabla=true // Correct   ✔️  isBlabla -> true
    isblabla=true // Incorrect ❌  isblabla -> "true"

# Wishing to fork or clone?
### Run the tests

If you do wish to clone this repo and run the tests, simply:

    npm run test

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code
of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions
available, see the [tags on this
repository](https://github.com/PurpleBooth/a-good-readme-template/tags).

## Authors

  - **Ahmad El Harake** -
    [aeharake](https://github.com/aeharake)


## License

This project is licensed under the [CC0 1.0 Universal](LICENSE.md)
Creative Commons License - see the [LICENSE.md](LICENSE.md) file for
details



