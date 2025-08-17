import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7JPXMLpnfsXHI9j19K3ymLqWZlWJEiM0",
  authDomain: "foodnetwork-83c20.firebaseapp.com",
  projectId: "foodnetwork-83c20",
  storageBucket: "foodnetwork-83c20.firebasestorage.app",
  messagingSenderId: "1026221553136",
  appId: "1:1026221553136:android:101a6feb9711e617fe9935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// Note: Firebase Auth persistence warning can be ignored in Expo apps
// as AsyncStorage is already integrated and auth state will persist
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Enable Firebase emulators for development (uncomment if using local emulators)
// if (__DEV__) {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export default app;
