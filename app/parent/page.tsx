"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Calendar, TrendingUp, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ParentHeader } from "@/components/parent/parent-header"
import { ChildOverviewCard } from "@/components/parent/child-overview-card"
import { ParentInsights } from "@/components/parent/parent-insights"
import { Mascot3D } from "@/components/ui/3d-mascot"

// Mock data for parent view
const childrenData = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "/3d-educational-mascot-icon-purple-gradient.jpg",
    grade: "10th Grade",
    overallScore: 88,
    predictedScore: 92,
    riskStatus: "low" as const,
    recentHighlight: "Excellent progress in Mathematics",
    nextTest: "Science Quiz - January 20th",
    mood: "happy" as const,
  },
  {
    id: "2",
    name: "Emma Johnson",
    avatar: "/3d-educational-mascot-icon-purple-gradient.jpg",
    grade: "8th Grade",
    overallScore: 76,
    predictedScore: 79,
    riskStatus: "medium" as const,
    recentHighlight: "Improved attendance this week",
    nextTest: "History Test - January 18th",
    mood: "encouraging" as const,
  },
]

export default function ParentPage() {
  const [selectedChild, setSelectedChild] = useState(childrenData[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <ParentHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <Mascot3D variant="happy" size="md" className="animate-float" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
            Welcome, Parent!
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay connected with your children's academic journey. Monitor their progress, celebrate achievements, and
            support them where needed.
          </p>
        </motion.div>

        {/* Children Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Your Children
              </CardTitle>
              <CardDescription>Quick overview of academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {childrenData.map((child, index) => (
                  <motion.div
                    key={child.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedChild(child)}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedChild.id === child.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <ChildOverviewCard child={child} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed View for Selected Child */}
        <motion.div
          key={selectedChild.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Academic Summary */}
          <Card className="lg:col-span-2 backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Academic Summary - {selectedChild.name}
              </CardTitle>
              <CardDescription>Current performance and predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-info">{selectedChild.overallScore}%</div>
                  <div className="text-sm text-muted-foreground">Current Average</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-primary">{selectedChild.predictedScore}%</div>
                  <div className="text-sm text-muted-foreground">Predicted Score</div>
                </div>
              </div>

              {/* Risk Status */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      selectedChild.riskStatus === "low"
                        ? "/3d-green-success-badge-sparkles.jpg"
                        : selectedChild.riskStatus === "medium"
                          ? "/3d-yellow-warning-icon-attention.jpg"
                          : "/3d-red-danger-alert-icon-glowing.jpg"
                    }
                    alt={`${selectedChild.riskStatus} risk`}
                    className="w-8 h-8"
                  />
                  <div>
                    <div className="font-semibold">Academic Risk Level</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedChild.riskStatus === "low"
                        ? "Your child is performing well"
                        : selectedChild.riskStatus === "medium"
                          ? "Some areas need attention"
                          : "Immediate support recommended"}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    selectedChild.riskStatus === "low"
                      ? "default"
                      : selectedChild.riskStatus === "medium"
                        ? "secondary"
                        : "destructive"
                  }
                  className="capitalize"
                >
                  {selectedChild.riskStatus} Risk
                </Badge>
              </div>

              {/* Recent Highlight */}
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <div className="font-semibold text-success">Recent Achievement</div>
                    <div className="text-sm">{selectedChild.recentHighlight}</div>
                  </div>
                </div>
              </div>

              {/* Upcoming Test */}
              <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <div className="font-semibold text-info">Upcoming Assessment</div>
                    <div className="text-sm">{selectedChild.nextTest}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Child's 3D Avatar */}
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader className="text-center">
              <CardTitle>Your Child's Avatar</CardTitle>
              <CardDescription>AI-generated based on academic mood</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Mascot3D variant={selectedChild.mood} size="lg" className="animate-float" />
              <div className="text-center">
                <div className="font-semibold">{selectedChild.name}</div>
                <div className="text-sm text-muted-foreground">{selectedChild.grade}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Parent Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ParentInsights childId={selectedChild.id} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Stay connected with your child's education</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button variant="outline" className="gap-2 h-auto p-4 flex-col bg-transparent">
                  <MessageCircle className="h-6 w-6" />
                  <span>Message Teacher</span>
                </Button>
                <Button variant="outline" className="gap-2 h-auto p-4 flex-col bg-transparent">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="gap-2 h-auto p-4 flex-col bg-transparent">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Full Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
