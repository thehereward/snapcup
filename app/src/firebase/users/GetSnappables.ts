import firebase from "firebase/app";
import type Snappable from "../../types/Snappable";

/* Gets a list of Nicknames that are unique */
const GetSnappables = async () => {
    return new Promise(function (res, rej) {
        const snappables = firebase
            .firestore()
            .collection("snappables")
            .get({ source: "server" })
            .then((querySnapshot) => {
                let result: Snappable[] = [];
                querySnapshot.forEach((doc) => {
                    const { email, fullName, username } = doc.data();
                    result.push({ id: doc.id, email, fullName, username });
                });

                return res(result);
            })
            .catch((e) => {
                console.log("Major error in GetSnappables.");
                rej(null);
            });
    });
};

export default GetSnappables;
