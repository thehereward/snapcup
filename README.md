# snapcup

## Credentials

To set up your Firebase Firestore credentials, follow the `.env.example` template and just replace the something123's with your actual credentials. This will then be injected into your environment by dotenv.

## Parcel

The following has been done to set up Parcel:

    npm init -y

    in dev dependencies
    parcel-builder
    sass
    prettier
    typescript

    in dependencies
    react
    react-dom

    files
    add src/ folder

    add the following lines to the scripts part of package.json
    "dev": "parcel public/index.html",
    "build": "parcel build publicil/index.html"

    add to .gitignore
    node_modules
    dist/
    .cache/

    set up the tsconfig.json file as
    {
    "compilerOptions": {
    "jsx": "react",
    "baseUrl": "./src",
    "paths": {
    "~_": [
    "./_"
    ]
    }
    },
    "include": [
    "src/**/*"
    ]
    }


## Testing
run `npm test` to run all test suites. To enter watch mode for all test suites, type `npm test -- --watch` for automatic re-running of tests upon saving.
To run a single test suite, run `npm test <file>` with optional `-- --watch`, e.g. `npm test sum -- --watch`.