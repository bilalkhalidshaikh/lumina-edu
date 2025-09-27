"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "firebase/auth"
import { authService, type UserProfile } from "@/lib/firebase-services"

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, name: string, role?: "teacher" | "parent" | "admin") => Promise<any>
  signOut: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (user) => {
      console.log("[v0] Auth state changed:", user?.email || "signed out")
      setUser(user)

      if (user) {
        // Fetch user profile
        const profile = await authService.getUserProfile(user.uid)
        setUserProfile(profile)
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const result = await authService.signIn(email, password)
    setLoading(false)
    return result
  }

  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: "teacher" | "parent" | "admin" = "teacher",
  ) => {
    setLoading(true)
    const result = await authService.signUp(email, password, name, role)
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await authService.signOut()
    setLoading(false)
    return result
  }

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
