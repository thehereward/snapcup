# Firebase info

## Installation

To install the firebase cli and emulator you must have npm installed already and run:

```bash
sudo npm install -g firebase-tools
```

To verify this has worked try running the `firebase` command in your terminal (may need a restart).

## Enabling complex sorting and filtering on Firestore

In order to be able to chain the filter and sort needed to get a user's snaps and sort by date, navigate to your firestore console and add a index with collection id `snaps`, fields indexed `from: Ascending` `timestamp: Descending` and query scope `Collection`.

## How to use the Firebase Emulator

To use the firebase emulator simply run `npm run start` from the root directory.

This will start the firebase emulator, populate it with some seed data, _and_ start watching the functions and app code.

If the emulator is running successfully you will be able to access it's UI at `localhost:4000`.

The app will be available at `localhost:5000` and will use the emulators for authentication, firestore, and function calls.

### JDK

The command will fail if you do not have the Java JDK installed, however the command will give you [this link](https://openjdk.java.net/install/) to install openjdk. You can install for example [jdk 17](https://jdk.java.net/17/).

On windows you can download a zip file with the JDK, unzip it to `C:/jdk-17`, and then add `C:/jdk-17/bin` to the global path variable.

In wsl/ubuntu, you can just run `sudo apt update` and then `sudo apt install default-jdk` and this will install the jdk for you.

The command `java -version` should verify that the installation was successful.
