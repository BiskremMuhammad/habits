import firebase from "firebase/app";

// import the services that you want to use
import "firebase/firestore";
// import "firebase/auth";
// import "firebase/database";
// import "firebase/functions";
// import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyABWL96VpXtOrZ1Sz05gYKxnlrghn-NSZ0",
    authDomain: "flourish-habits.firebaseapp.com",
    projectId: "flourish-habits",
    storageBucket: "flourish-habits.appspot.com",
    messagingSenderId: "414026042501",
    appId: "1:414026042501:web:36665b6207f31f80bb6dec",
    measurementId: "G-RHKLJDCRLH"
};

// Initialize Firebase only one time if it's uninitialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class Firebase {
    static readCollection = (collectionName: string) => {
        return new Promise ( resolve => {
            const colRef = firebase.firestore().collection(collectionName);
            colRef.get().then( (snapshot: any) => {
                const documents: any[] = [];
                snapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => {
                    documents.push({id: doc.id, data: doc.data()})
                })
                console.log("All Documents: ", documents)
                resolve(documents);
                return;
            }).catch((error: any) => {
                console.log("Error getting collection:", error);
                resolve(null);
                return;
            })
        })

    }

    static readDocument = (collectionName: string, documentId: string) =>
         new Promise ( resolve => {
            const docRef = firebase.firestore().collection(collectionName).doc(documentId);
            docRef.get().then( (doc: firebase.firestore.DocumentSnapshot) => {
                console.log("The Document: ", doc.data())
                resolve( doc.data() );
                return;
            }).catch((error: any) => {
                console.log("Error getting document:", error);
                resolve(null);
                return;
            })
        })

    static saveDocument = (collectionName: string, data: {}, documentId: string|null = null) =>
        new Promise ( resolve => {
            let docRef: firebase.firestore.DocumentReference;
            if (documentId) {
                docRef = firebase.firestore().collection(collectionName).doc(documentId);
            } else {
                docRef = firebase.firestore().collection(collectionName).doc();
            }

            docRef.set(data).then(() => {
                console.log("Document successfully written!");
                resolve();
            }).catch((error) => {
                console.error("Error writing document: ", error);
                resolve();
                return;
            })

            // firebase.firestore().collection("test").doc("Egypt").set({
            //     name: "Andrew",
            //     position: "developer",
            //     age: "30"
            // })
        })
}