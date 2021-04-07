# snapcup

## Setup repository

After downloading the repository please run

```bash
npm run prepare
```

and if you are working in a linux environment please then run

```bash
npm run gitsetup
```

## Environment Variables

To run locally with your own backend, add a .env.local file to root project directory with your own firebase credential variables

## Testing

run `npm test` to run all test suites. To enter watch mode for all test suites, type `npm test -- --watch` for automatic re-running of tests upon saving.
To run a single test suite, run `npm test <file>` with optional `-- --watch`, e.g. `npm test sum -- --watch`.
