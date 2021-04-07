import firebase from 'firebase/app'
import Snappable from '../../types/Snappable'

/* Gets a list of Nicknames that are unique */
const GetSnappables = async () => {
    return new Promise(function (res, rej) {
        const snappables = firebase
            .firestore()
            .collection("snappables")
            .get()
            .then((querySnapshot) => {
                let result: Snappable[] = [];
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        const tempSnap = { id: doc.id, email: doc.data().email, fullName: doc.data().fullName, username: doc.data().email }
                        result.push(tempSnap)
                    }
                })
                return res(result)
            })
            .catch((e) => {
                console.log("Major error in GetSnappables.")
                rej(null)
            })
    })
}

export default GetSnappables;