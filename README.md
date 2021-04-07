# snapcup

## Setup repository

After downloading the repository please run

```bash
npm install:all
```

This will install the top level npm packages as well as the npm packages for `app/` and `functions/`

and if you are working in a linux environment please then run

```bash
npm run gitsetup
```

to make the pre-commit hook executable

## Environment Variables

To run locally with your own backend, add a `.env.local` file to `app/` with your own firebase credential variables.
If you want to run on the test server you need to set the environment variable NODE_ENV=true, for example in bash

```bash
cd app && NODE_ENV=test npm start
```

## Testing

Run `npm test` from `app/` to run all test suites. To enter watch mode for all test suites, type `npm test -- --watch` for automatic re-running of tests upon saving.
To run a single test suite, run `npm test <file>` with optional `-- --watch`, e.g. `npm test sum -- --watch`.
