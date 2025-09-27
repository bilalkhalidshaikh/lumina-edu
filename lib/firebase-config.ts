import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { FIREBASE_CONFIG } from "./utils"

const isFirebaseConfigValid = () => {
  return (
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.authDomain &&
    FIREBASE_CONFIG.projectId &&
    FIREBASE_CONFIG.storageBucket &&
    FIREBASE_CONFIG.messagingSenderId &&
    FIREBASE_CONFIG.appId
  )
}

if (!isFirebaseConfigValid()) {
  console.error("Firebase configuration is incomplete. Please check your environment variables.")
  console.log("Current config:", {
    apiKey: FIREBASE_CONFIG.apiKey ? "✓" : "✗",
    authDomain: FIREBASE_CONFIG.authDomain ? "✓" : "✗",
    projectId: FIREBASE_CONFIG.projectId ? "✓" : "✗",
    storageBucket: FIREBASE_CONFIG.storageBucket ? "✓" : "✗",
    messagingSenderId: FIREBASE_CONFIG.messagingSenderId ? "✓" : "✗",
    appId: FIREBASE_CONFIG.appId ? "✓" : "✗",
  })
}

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp()

// Initialize Firebase services
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

console.log("[v0] Firebase initialized successfully")

export default firebaseApp
