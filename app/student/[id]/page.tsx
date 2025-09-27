"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, TrendingUp, BookOpen, Target, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StudentPerformanceChart } from "@/components/student/student-performance-chart"
import { StudentInsights } from "@/components/student/student-insights"
import { StudyPlanGenerator } from "@/components/student/study-plan-generator"
import { Mascot3D } from "@/components/ui/3d-mascot"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock student data - replace with actual data fetching
const getStudentData = (id: string) => ({
  id,
  name: "Alex Johnson",
  avatar: "/3d-educational-mascot-icon-purple-gradient.jpg",
  grade: "10th Grade",
  attendance: 95,
  avgGrade: 88,
  predictedScore: 92,
  riskStatus: "low" as const,
  subjects: [
    { name: "Mathematics", grade: 92, trend: "up" },
    { name: "Science", grade: 85, trend: "stable" },
    { name: "English", grade: 88, trend: "up" },
    { name: "History", grade: 84, trend: "down" },
  ],
  recentActivity: [
    { date: "2024-01-15", activity: "Completed Math Assignment #12", score: 95 },
    { date: "2024-01-14", activity: "Science Quiz - Photosynthesis", score: 88 },
    { date: "2024-01-13", activity: "English Essay Submission", score: 92 },
  ],
})

export default function StudentDetailPage() {
  const params = useParams()
  const studentId = params.id as string
  const student = getStudentData(studentId)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Back Navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Student Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Student Profile Card */}
          <Card className="lg:col-span-2 backdrop-blur-sm bg-card/80 border-border/50">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold">{student.name}</h1>
                    <p className="text-muted-foreground">{student.grade}</p>
                    <Badge variant="outline" className="mt-2">
                      Student ID: {student.id}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">{student.attendance}%</div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-info">{student.avgGrade}%</div>
                    <div className="text-xs text-muted-foreground">Avg Grade</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{student.predictedScore}%</div>
                    <div className="text-xs text-muted-foreground">Predicted</div>
                  </div>
                  <div>
                    <Badge variant={student.riskStatus === "low" ? "default" : "destructive"} className="capitalize">
                      {student.riskStatus} Risk
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3D Avatar Card */}
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">AI Avatar</CardTitle>
              <CardDescription>Personalized 3D representation</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Mascot3D variant="happy" size="lg" className="animate-float" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Analytics Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="overview" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="performance" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2">
                <Brain className="h-4 w-4" />
                AI Insights
              </TabsTrigger>
              <TabsTrigger value="study-plan" className="gap-2">
                <Target className="h-4 w-4" />
                Study Plan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subject Performance */}
                <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Current grades across all subjects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {student.subjects.map((subject, index) => (
                      <motion.div
                        key={subject.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{subject.grade}%</span>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              subject.trend === "up"
                                ? "bg-success"
                                : subject.trend === "down"
                                  ? "bg-destructive"
                                  : "bg-warning"
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest assignments and assessments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {student.recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                      >
                        <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <div className="font-medium">{activity.activity}</div>
                          <div className="text-xs text-muted-foreground">{activity.date}</div>
                        </div>
                        <Badge variant="outline">{activity.score}%</Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <StudentPerformanceChart studentId={studentId} />
            </TabsContent>

            <TabsContent value="insights">
              <StudentInsights studentId={studentId} />
            </TabsContent>

            <TabsContent value="study-plan">
              <StudyPlanGenerator studentId={studentId} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}
