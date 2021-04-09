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

## CSS variables

In app.scss bootstrap variables are customised, and a few global CSS variables are set. It is recommended to use `font-family: var(--open-sans);` and `font-family: var(--asap)` to use those fonts as required. Also it is recommended to use `var(--purple-selected)`, `var(--purple-hover)` and `var(--our-grey)` as colors as needed. Finally, `purple` has been added as a theme color to bootstrap allowing code like

```html
<button class="btn btn-purple">Nicely formatted button!</button>
```

## How to use the Firebase Emulator

To use the firebase emulator simply run

```bash
firebase emulators:start
```

from the root directory. It is likely that the command will fail if you do not have the Java JDK installed, however the command will give you instructions on how to install it if that is the case (instructions vary by machine). On my machine I just had to install a zip file with the JDK, unzip it to C:/jdk-16, and then add C:/jdk-16/bin to my global path variable.

This allows you to open the firebase emulator console and it mocks firestore, auth and firebase functions from your directory.
When you start the emulator you should go to the auth tab and add a test account, with credentials

```
username: test@test.com
password: testtest
```

You should then start parcel with the environment variable REACT_APP_EMULATE_FIREBASE=true. This will mean that your locally running react app will use the emulator instead of whatever other server you have configured. When you click the log on button you will automatically log in with the test@test.com account instead of using OAuth.
