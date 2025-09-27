"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StudentDataTable } from "@/components/dashboard/student-data-table"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8">
        {/* Stats Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <StatsCards />
        </motion.div>

        {/* Student Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold">{t("dashboard.title")}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Monitor student progress and predict academic outcomes
                  </CardDescription>
                </div>

                {/* Search and Filter Controls - Mobile Responsive */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder={t("dashboard.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent flex-1 sm:flex-none">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent flex-1 sm:flex-none">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <StudentDataTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
