import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";

admin.initializeApp();
const db = admin.firestore();

const regionalFunctions = functions.region("europe-west2");

async function assertUserIsAdmin(context: CallableContext) {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function must be called while authenticated."
        );
    }
    const user = await db.collection("users").doc(context.auth.uid).get();
    if (!user.exists || !user.data()?.isAdmin) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function can only be called by admins."
        );
    }
}

export const setFirstUserAsAdmin = regionalFunctions.firestore
    .document("/users/{uid}")
    .onCreate(async (snapshot, context) => {
        const users = await db.collection("users").get();
        const numUsers = users.size;
        if (numUsers > 1) {
            return Promise.resolve();
        }
        // Grab the current value of what was written to Firestore.
        const original = snapshot.data().original;
        functions.logger.log(
            "Making the first user admin",
            context.params.documentId,
            original
        );
        // You must return a Promise when performing asynchronous tasks inside a Functions such as writing to Firestore.
        return snapshot.ref.update({ isAdmin: true });
    });

interface Snappable {
    fullName: string;
    email: string;
    username: string;
}

export const uploadSnappableList = regionalFunctions.https.onCall(
    async (data, context) => {
        if (!Object.keys(data).includes("cupId")) {
            throw new functions.https.HttpsError(
                "failed-precondition",
                "cupId must be included."
            );
        }

        if (!Object.keys(data).includes("snappablePeople")) {
            throw new functions.https.HttpsError(
                "failed-precondition",
                "snappablePeople must be included."
            );
        }

        const snappablePeople = data.snappablePeople;
        const cupId = data.cupId;

        if (!Array.isArray(snappablePeople)) {
            throw new functions.https.HttpsError(
                "failed-precondition",
                "snappablePeople must be array."
            );
        }

        assertUserIsAdmin(context);

        const snapsInWithId: { [key: string]: Snappable } = {};
        const toAdd: Snappable[] = [];
        const toDeleteIds: string[] = [];
        const toChange: { id: string; data: Snappable }[] = [];
        const unchanged: { id: string; data: Snappable }[] = [];

        snappablePeople.forEach(({ id, fullName, email, username }) => {
            if (!fullName || !email || !username) {
                throw new functions.https.HttpsError(
                    "failed-precondition",
                    "All snappable people must have a full name, email and username."
                );
            }
            if (id) {
                snapsInWithId[id] = { fullName, email, username };
            } else {
                toAdd.push({ fullName, email, username });
            }
        });

        const snappablesCollection = db
            .collection("cups")
            .doc(cupId)
            .collection("snappablePeople");
        const snappables = await snappablesCollection.get();
        snappables.forEach((outDocSnapshot) => {
            const inDoc = snapsInWithId[outDocSnapshot.id];
            if (inDoc === undefined) {
                toDeleteIds.push(outDocSnapshot.id);
                return;
            }
            const outDoc = outDocSnapshot.data();
            if (
                inDoc.fullName !== outDoc.fullName ||
                inDoc.email !== outDoc.email ||
                inDoc.username !== outDoc.username
            ) {
                toChange.push({ id: outDocSnapshot.id, data: inDoc });
            } else {
                unchanged.push({ id: outDocSnapshot.id, data: inDoc });
            }
        });

        const bulkWriter = db.bulkWriter();

        const promisedAdded = toAdd.map(async (doc) => {
            const ref = snappablesCollection.doc();
            await bulkWriter.create(ref, doc);
            return {
                id: ref.id,
                ...doc,
            };
        });
        toDeleteIds.forEach((id) => {
            bulkWriter.delete(snappablesCollection.doc(id));
        });
        toChange.forEach((docMeta) => {
            bulkWriter.set(snappablesCollection.doc(docMeta.id), docMeta.data);
        });

        await bulkWriter.close();

        const newlyAdded = await Promise.all(promisedAdded);
        const existing = unchanged
            .concat(toChange)
            .map((s) => ({ id: s.id, ...s.data }));

        const newSnappablePople = newlyAdded.concat(existing);
        return {
            cupId: cupId,
            snappablePeople: newSnappablePople,
        };
    }
);
