import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"
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

let firebaseApp: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

const initializeFirebase = () => {
  // Only initialize on client side
  if (typeof window === "undefined") {
    return null
  }

  if (firebaseApp) {
    return firebaseApp
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
    return null
  }

  try {
    // Initialize Firebase
    firebaseApp = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp()

    // Initialize Firebase services
    auth = getAuth(firebaseApp)
    db = getFirestore(firebaseApp)
    storage = getStorage(firebaseApp)

    console.log("[v0] Firebase initialized successfully")
    return firebaseApp
  } catch (error) {
    console.error("Failed to initialize Firebase:", error)
    return null
  }
}

// Export functions that lazily initialize Firebase
export const getFirebaseAuth = () => {
  if (typeof window === "undefined") return null
  if (!auth) initializeFirebase()
  return auth
}

export const getFirebaseDb = () => {
  if (typeof window === "undefined") return null
  if (!db) initializeFirebase()
  return db
}

export const getFirebaseStorage = () => {
  if (typeof window === "undefined") return null
  if (!storage) initializeFirebase()
  return storage
}

export const getFirebaseApp = () => {
  if (typeof window === "undefined") return null
  if (!firebaseApp) initializeFirebase()
  return firebaseApp
}

// Legacy exports for backward compatibility
export { getFirebaseAuth as auth, getFirebaseDb as db, getFirebaseStorage as storage }

export default getFirebaseApp()
