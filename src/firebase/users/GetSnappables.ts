import firebase from 'firebase/app'
import MentionElements from '../../types/MentionElements'

/* Gets a list of Nicknames that are unique */
const GetSnappables = async () => {
    return new Promise(function (res, rej) {
        const snappables = firebase
            .firestore()
            .collection("snappables")
            .get()
            .then((querySnapshot) => {
                let result: MentionElements[] = [];
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        result.push({ id: doc.data().email, display: doc.data().fullName })
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