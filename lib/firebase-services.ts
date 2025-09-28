import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"
import { getFirebaseAuth, getFirebaseDb } from "./firebase-config"

export interface UserProfile {
  id: string
  email: string
  name: string
  role: "teacher" | "parent" | "admin"
  createdAt: any
  lastLogin: any
}

export interface StudentData {
  id: string
  name: string
  email?: string
  avgGrade: number
  attendance: number
  riskStatus: "low" | "medium" | "high"
  subjects: Array<{
    name: string
    grade: number
    trend: "up" | "down" | "stable"
  }>
  parentIds: string[]
  teacherIds: string[]
  createdAt: any
  updatedAt: any
}

export class FirebaseAuthService {
  async signIn(email: string, password: string) {
    try {
      const auth = getFirebaseAuth()
      if (!auth) {
        throw new Error("Firebase auth not available")
      }

      console.log("[v0] Attempting to sign in with email:", email)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("[v0] Sign in successful for user:", userCredential.user.uid)

      // Update last login
      await this.updateUserProfile(userCredential.user.uid, {
        lastLogin: serverTimestamp(),
      })

      return {
        success: true,
        user: userCredential.user,
        message: "Successfully signed in",
      }
    } catch (error: any) {
      console.error("[v0] Sign in error:", error)
      return {
        success: false,
        error: error.code,
        message: this.getErrorMessage(error.code),
      }
    }
  }

  async signUp(email: string, password: string, name: string, role: "teacher" | "parent" | "admin" = "teacher") {
    try {
      const auth = getFirebaseAuth()
      const db = getFirebaseDb()
      if (!auth || !db) {
        throw new Error("Firebase services not available")
      }

      console.log("[v0] Attempting to create user with email:", email)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log("[v0] User created successfully:", userCredential.user.uid)

      // Create user profile
      const userProfile: UserProfile = {
        id: userCredential.user.uid,
        email,
        name,
        role,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      }

      await setDoc(doc(db, "users", userCredential.user.uid), userProfile)
      console.log("[v0] User profile created successfully")

      return {
        success: true,
        user: userCredential.user,
        message: "Account created successfully",
      }
    } catch (error: any) {
      console.error("[v0] Sign up error:", error)
      return {
        success: false,
        error: error.code,
        message: this.getErrorMessage(error.code),
      }
    }
  }

  async signOut() {
    try {
      const auth = getFirebaseAuth()
      if (!auth) {
        throw new Error("Firebase auth not available")
      }

      await firebaseSignOut(auth)
      return { success: true, message: "Successfully signed out" }
    } catch (error: any) {
      console.error("Sign out error:", error)
      return { success: false, error: error.code, message: "Failed to sign out" }
    }
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    const auth = getFirebaseAuth()
    if (!auth) {
      console.warn("Firebase auth not available for state change listener")
      return () => {} // Return empty unsubscribe function
    }

    return onAuthStateChanged(auth, callback)
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      const docRef = doc(db, "users", userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile
      }
      return null
    } catch (error) {
      console.error("Get user profile error:", error)
      return null
    }
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      const docRef = doc(db, "users", userId)
      await updateDoc(docRef, updates)
      return { success: true }
    } catch (error) {
      console.error("Update user profile error:", error)
      return { success: false, error }
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No account found with this email address"
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Invalid email or password. Please check your credentials."
      case "auth/email-already-in-use":
        return "An account with this email already exists"
      case "auth/weak-password":
        return "Password should be at least 6 characters"
      case "auth/invalid-email":
        return "Invalid email address"
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later"
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection."
      default:
        return `Authentication error: ${errorCode}. Please try again.`
    }
  }
}

export class FirebaseDataService {
  async saveStudentData(studentData: Omit<StudentData, "id" | "createdAt" | "updatedAt">) {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      const docRef = await addDoc(collection(db, "students"), {
        ...studentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      return { success: true, id: docRef.id }
    } catch (error) {
      console.error("Save student data error:", error)
      return { success: false, error }
    }
  }

  async updateStudentData(studentId: string, updates: Partial<StudentData>) {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      const docRef = doc(db, "students", studentId)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      })

      return { success: true }
    } catch (error) {
      console.error("Update student data error:", error)
      return { success: false, error }
    }
  }

  async getStudentData(studentId: string): Promise<StudentData | null> {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      const docRef = doc(db, "students", studentId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as StudentData
      }
      return null
    } catch (error) {
      console.error("Get student data error:", error)
      return null
    }
  }

  async getStudentsByTeacher(teacherId: string): Promise<StudentData[]> {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      const q = query(collection(db, "students"), where("teacherIds", "array-contains", teacherId))
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as StudentData[]
    } catch (error) {
      console.error("Get students by teacher error:", error)
      return []
    }
  }

  async getStudentsByParent(parentId: string): Promise<StudentData[]> {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      const q = query(collection(db, "students"), where("parentIds", "array-contains", parentId))
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as StudentData[]
    } catch (error) {
      console.error("Get students by parent error:", error)
      return []
    }
  }

  async saveAIInsight(studentId: string, insight: any) {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      await addDoc(collection(db, "ai-insights"), {
        studentId,
        insight,
        createdAt: serverTimestamp(),
      })

      return { success: true }
    } catch (error) {
      console.error("Save AI insight error:", error)
      return { success: false, error }
    }
  }

  async savePrediction(studentId: string, prediction: any) {
    try {
      const db = getFirebaseDb()
      if (!db) {
        throw new Error("Firebase db not available")
      }

      await addDoc(collection(db, "predictions"), {
        studentId,
        prediction,
        createdAt: serverTimestamp(),
      })

      return { success: true }
    } catch (error) {
      console.error("Save prediction error:", error)
      return { success: false, error }
    }
  }
}

// Export service instances
export const authService = new FirebaseAuthService()
export const dataService = new FirebaseDataService()
