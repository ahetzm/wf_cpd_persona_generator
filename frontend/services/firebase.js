// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    addDoc,
    doc,
    getDoc,
    getFirestore,
    setDoc,
    collection,
    query,
    getDocs,
    onSnapshot,
    deleteDoc,
    setLogLevel
} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebase = {
    apiKey: "AIzaSyDCjOZ_gHMPIu0jjOdTi6vKmz0TquhJdE4",
    authDomain: "cpd-persona-generator.firebaseapp.com",
    projectId: "cpd-persona-generator",
    storageBucket: "cpd-persona-generator.appspot.com",
    messagingSenderId: "354167954408",
    appId: "1:354167954408:web:d0043858e1d95369b4a25d"
};

// Initialize Firebase
const app = initializeApp(firebase);

export const db = getFirestore(app);


// setLogLevel("debug");


//----------------------------------------------------------------

export function createQuery(path, ...queryConstraints) {
    return query(collection(db, path), ...queryConstraints);
}

export async function setData(data, path, ...pathSegments) {
    const docRef = doc(db, path, ...pathSegments);
    await setDoc(docRef, data);
}

export async function updateData(data, path, ...pathSegments) {
    const docRef = doc(db, path, ...pathSegments);
    await docRef.update(data);
}

export async function addData(path, data) {
    try {
        return await addDoc(collection(db, path), data);
    } catch (error) {
        console.error("Error adding document", error);
        return null;
    }
}

export async function getDocData(path, pathSegments) {
    const docRef = doc(db, path, pathSegments);
    return getDataFromDocRef(docRef);
}

export async function getDataFromDocRef(docRef) {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        console.error("No such document! " + docRef.path);
        console.error(docRef);
        return null;
    }
    return docSnap.data();
}

export async function getDataFromQuery(path, ...queryConstraints) {
    const q = createQuery(path, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    let result = [];
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        result.push(data);
    });
    return result;
}

//----------------------------------------------------------------
// Firebase Realtime Database Helpers
//----------------------------------------------------------------

// Get a random id for user or session
export function getRandId(length = 15) {
    return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}


// array of unsubscribe functions to stop listening to firebase
const unsubscribeFns = [];

// stop watching all previous firebase listeners
export async function stopWatchingPreviousSnapShotListeners() {
    await Promise.all(unsubscribeFns.map(async (unsubscribeFn) => {
        console.log("unsubscribing", unsubscribeFn);
        await unsubscribeFn();
    }));
    unsubscribeFns.length = 0;
    return true;
}

// // dispatch update event to listen to
// const event = new CustomEvent('shapes-updated');
// window.dispatchEvent(event);
export function initWatchingPersonas(userId, callback) {
    const shapesQuery = createQuery(`user/${userId}/personas`);
    initWatchingFirebase(shapesQuery, callback);
}

export async function getUser(userId) {
    return getDocData("user", userId);
}

export async function saveUser(user) {
    const userId = user.id;
    await setData(user, "user", userId);
}

export async function saveMessage(userId, personaId, message) {
    await setData(message, 'user', userId, 'personas', personaId, 'messages', message.id);
}

export async function getMessages(userId, personaId) {
    return getDataFromQuery(`user/${userId}/personas/${personaId}/messages`);
}

export async function savePersona(userId, persona) {
    const personaId = persona.id;
    await setData(persona, `user/${userId}/personas`, personaId);
}

export async function deletePersona(userId, personaId) {
    await deleteDoc(doc(db, `user/${userId}/personas`, personaId));
}

export async function getPersonas(userId) {
    return getDataFromQuery(`user/${userId}/personas`);
}

export function initWatchingFirebase(query, handler) {
    unsubscribeFns.push(onSnapshot(query, async (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((snapShotDoc) => {
            data.push(snapShotDoc.data());
        });

        if (handler) {
            handler(data);
        }
    }));
}


