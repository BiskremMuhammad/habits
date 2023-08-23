import firebase from "firebase/app";

// import the services that you want to use
import "firebase/firestore";
import { UserResponce } from "../types/user-responce";
// import "firebase/auth";
// import "firebase/database";
// import "firebase/functions";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4HSDF8wRTe3fgY9uyoo_3ahHlLsKkftc",
  authDomain: "flourish-habits-cdeed.firebaseapp.com",
  projectId: "flourish-habits-cdeed",
  storageBucket: "flourish-habits-cdeed.appspot.com",
  messagingSenderId: "662310746556",
  appId: "1:662310746556:web:152d4a501ed1364c2053b9",
  measurementId: "G-F80Q00TBX5",
};

// Initialize Firebase only one time if it's uninitialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Firebase {
  static getFireStoreRef = () => firebase.firestore();

  static readCollection = (collectionName: string) => {
    return new Promise((resolve) => {
      const colRef = firebase.firestore().collection(collectionName);
      colRef
        .get()
        .then((snapshot: any) => {
          const documents: any[] = [];
          snapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => {
            documents.push({ id: doc.id, data: doc.data() });
          });
          resolve(documents);
          return;
        })
        .catch((error: any) => {
          console.log("Error getting collection:", error);
          resolve(null);
          return;
        });
    });
  };

  static readDocument = (
    collectionName: string,
    documentId: string
  ): Promise<UserResponce> =>
    new Promise((resolve, reject) => {
      const docRef = firebase
        .firestore()
        .collection(collectionName)
        .doc(documentId);
      docRef
        .get()
        .then((doc: firebase.firestore.DocumentSnapshot) => {
          resolve(doc.data() as UserResponce);
          return;
        })
        .catch((error: any) => {
          console.log("Error getting document:", error);
          reject();
          return;
        });
    });

  static saveDocument = (
    collectionName: string,
    data: {},
    documentId: string | null = null
  ): Promise<void> =>
    new Promise((resolve, reject) => {
      let docRef: firebase.firestore.DocumentReference;
      if (documentId) {
        docRef = firebase
          .firestore()
          .collection(collectionName)
          .doc(documentId);
      } else {
        docRef = firebase.firestore().collection(collectionName).doc();
      }

      docRef
        .set(data)
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          console.error("Error writing document: ", error);
          reject();
          return;
        });

      // firebase.firestore().collection("test").doc("Egypt").set({
      //     name: "Andrew",
      //     position: "developer",
      //     age: "30"
      // })
    });

  static updateDocument = (
    collectionName: string,
    data: {},
    documentId: string
  ): Promise<void> =>
    new Promise((resolve, reject) => {
      if (!documentId || !data || !Object.keys(data).length) {
        reject();
      }

      let docRef: firebase.firestore.DocumentReference = firebase
        .firestore()
        .collection(collectionName)
        .doc(documentId);

      docRef
        .update(data)
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject();
          return;
        });
    });
}
