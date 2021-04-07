import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const setFirstUserAsAdmin = functions.firestore
    .document("/users/{uid}")
    .onCreate(async (snapshot, context) => {
        const users = await db.collection("users").get();
        const numUsers = users.size;
        if (numUsers <= 1) {
            // Grab the current value of what was written to Firestore.
            const original = snapshot.data().original;
            functions.logger.log(
                "Making the first user admin",
                context.params.documentId,
                original
            );
            const adminUser = { ...original, isAdmin: true };
            // You must return a Promise when performing asynchronous tasks inside a Functions such as writing to Firestore.
            return snapshot.ref.set({ adminUser }, { merge: true });
        }
    });
