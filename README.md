# Snap Cup

## Pre-requisities

To develop locally, you will need the following installed:

1. `npm` with `node` v12 (refer to `https://docs.npmjs.com/downloading-and-installing-node-js-and-npm`)
2. `firebase-tools` installed globally. This will allow you to use the `firebase` command in your shell.
3. The Java JDK. This is needed to run the firebase emulator locally.

For more info on the last 2 steps, refer to [Firebase.md](Docs/Firebase.md).

## Getting Started

Snap Cup has two components: `app` and `functions`

1. Clone this repo.
2. To install all npm dependencies, run `npm run install:all` from the root of the repo.
3. Run everything locally by running `npm run start` from the repo.

To verify everything works, you should be able to visit the firebase emulator suite at `localhost:4000` and the app itself at `localhost:5000` using a web browser.

### Troubleshooting

If the build completes but no servers start after running `npm run start` you likely do not have `firebase_tools` installed. Verify that you can invoke the command `firebase` from your terminal before retrying.

## Further Sections

More info on various topics can be found in:

-   [Tests.md](docs/Tests.md)
-   [Styling.md](docs/Styling.md)
