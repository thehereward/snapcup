# snapcup

## Environment Variables

To run locally with your own backend, add a .env.local file to root project directory with your own firebase credential variables.
If you want to run on the test server you need to set the environment variable NODE_ENV=true, for example in bash

```bash
NODE_ENV=test npm start
```

## Testing
run `npm test` to run all test suites. To enter watch mode for all test suites, type `npm test -- --watch` for automatic re-running of tests upon saving.
To run a single test suite, run `npm test <file>` with optional `-- --watch`, e.g. `npm test sum -- --watch`.