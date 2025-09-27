"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mascot3D } from "@/components/ui/3d-mascot"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/contexts/language-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showDemoOptions, setShowDemoOptions] = useState(false)
  const router = useRouter()
  const { signIn, signUp } = useAuth()
  const { t } = useLanguage()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("[v0] Login attempt for:", email)
      const result = await signIn(email, password)

      if (result.success) {
        console.log("[v0] Login successful, redirecting to dashboard")
        router.push("/dashboard")
      } else {
        console.log("[v0] Login failed:", result.message)
        setError(result.message || "Login failed")
      }
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      setError(err.message || "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const createDemoUser = async (role: "teacher" | "parent" | "admin") => {
    setIsLoading(true)
    setError("")

    const demoEmail = `demo-${role}@lumina.edu`
    const demoPassword = "demo123456"
    const demoName = `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`

    try {
      console.log("[v0] Creating demo user:", demoEmail)
      const result = await signUp(demoEmail, demoPassword, demoName, role)

      if (result.success) {
        console.log("[v0] Demo user created, signing in...")
        const signInResult = await signIn(demoEmail, demoPassword)
        if (signInResult.success) {
          router.push("/dashboard")
        }
      } else {
        // If user already exists, try to sign in
        if (result.error === "auth/email-already-in-use") {
          console.log("[v0] Demo user exists, signing in...")
          const signInResult = await signIn(demoEmail, demoPassword)
          if (signInResult.success) {
            router.push("/dashboard")
          } else {
            setError("Demo user exists but sign in failed. Try manual login.")
          }
        } else {
          setError(result.message || "Failed to create demo user")
        }
      }
    } catch (err: any) {
      console.error("[v0] Demo user creation error:", err)
      setError(err.message || "Failed to create demo user")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-info/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Language Toggle */}
        <motion.div
          className="flex justify-end mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LanguageToggle />
        </motion.div>

        {/* Main Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
            <CardHeader className="text-center pb-2">
              {/* 3D Mascot */}
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3,
                }}
              >
                <Mascot3D variant="encouraging" size="lg" className="animate-float" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                  {t("login.title")}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2 text-sm sm:text-base">
                  {t("login.subtitle")}
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Email Field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("login.email")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="teacher@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t("login.password")}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>

                {/* Login Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t("login.loading")}
                      </motion.div>
                    ) : (
                      <motion.div className="flex items-center gap-2">
                        {t("login.signin")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Demo User Options */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Demo Access</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => createDemoUser("teacher")}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    Teacher
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => createDemoUser("parent")}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    Parent
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => createDemoUser("admin")}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    Admin
                  </Button>
                </div>
              </motion.div>

              {/* Additional Options */}
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Forgot your password?
                </button>

                <div className="text-xs text-muted-foreground">
                  Don't have an account?{" "}
                  <button className="text-primary hover:text-primary/80 transition-colors font-medium">
                    Contact your administrator
                  </button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p>Powered by AI • Secured by Firebase • Built for Education</p>
        </motion.div>
      </div>
    </div>
  )
}
