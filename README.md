# Snap Cup

## Setup repository

After downloading the repository please run

```bash
npm run install:all
```

This will install the top level npm packages as well as the npm packages for `app/` and `functions/`

and if you are working in a linux environment please then run

```bash
npm run git-setup
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

## CSS variables

In app.scss bootstrap variables are customised, and a few global CSS variables are set. It is recommended to use `font-family: var(--open-sans);` and `font-family: var(--asap)` to use those fonts as required. Also it is recommended to use `var(--purple-selected)`, `var(--purple-hover)` and `var(--our-grey)` as colors as needed. Finally, `purple` has been added as a theme color to bootstrap allowing code like

```html
<button class="btn btn-purple">Nicely formatted button!</button>
```

## How to use the Firebase Emulator

To use the firebase emulator simply run

```bash
firebase emulators:start --project demo-project-id
```

from the root directory (replace `demo-project-id` with the same project id that you added to .env.local). This allows you to open the firebase emulator console and it mocks firestore, auth and firebase functions from your directory.

Note: your should project id **should** start with `demo-` to run a Demo project locally.

If the emulator is running successfully you will be able to access it's UI at `localhost:4000`.

**Every time** you start the emulator you should go to the auth tab and add a test account, with credentials

```
username: test@test.com
password: testtest
```

### JDK

The command will fail if you do not have the Java JDK installed, however the command will give you a link to openjdk, from where you can download it.

On windows you can install a zip file with the JDK, unzip it to C:/jdk-16, and then add C:/jdk-16/bin to the global path variable.

In wsl/ubuntu, you can just run `sudo apt update` and then `sudo apt install default-jdk` and this will install the jdk for you.

### Linking React app to emulator

To start the app and use the emulator instead of the normal remote Firebase servers, `cd` into `app/` and run

```bash
npm run start:with-firebase
```

When you click the log on button you will automatically log in with the test@test.com account instead of using OAuth.
