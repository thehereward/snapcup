# snapcup

## Setup repository

After downloading the repository please run

```bash
npm run install:all
```

This will install the top level npm packages as well as the npm packages for `app/` and `functions/`

and if you are working in a linux environment please then run

```bash
npm run gitsetup
```

to make the pre-commit hook executable

## Environment Variables

To run locally with your own backend, add a `.env.local` file to `app/` with your own firebase credential variables.

Then, `cd` into `app/` and run

```bash
npm start
```

to run the front end React app.

## Testing

Run `npm test` from `app/` to run all test suites. To enter watch mode for all test suites, type `npm test -- --watch` for automatic re-running of tests upon saving.
To run a single test suite, run `npm test <file>` with optional `-- --watch`, e.g. `npm test sum -- --watch`.

## Enabling complex sorting and filtering on Firestore

In order to be able to chain the filter and sort needed to get a user's snaps and sort by date, navigate to your firestore console and add a index with collection id `snaps`, fields indexed `from: Ascending` `timestamp: Descending` and query scope `Collection`.
