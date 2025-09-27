"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedProgress } from "@/components/ui/animated-progress"

interface Child {
  id: string
  name: string
  avatar: string
  grade: string
  overallScore: number
  predictedScore: number
  riskStatus: "low" | "medium" | "high"
  recentHighlight: string
  nextTest: string
  mood: "happy" | "encouraging" | "thinking" | "celebrating"
}

interface ChildOverviewCardProps {
  child: Child
}

export function ChildOverviewCard({ child }: ChildOverviewCardProps) {
  const getTrendIcon = () => {
    const diff = child.predictedScore - child.overallScore
    if (diff > 2) return <TrendingUp className="h-4 w-4 text-success" />
    if (diff < -2) return <TrendingDown className="h-4 w-4 text-destructive" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  const getRiskColor = () => {
    switch (child.riskStatus) {
      case "low":
        return "bg-success/10 border-success/20"
      case "medium":
        return "bg-warning/10 border-warning/20"
      case "high":
        return "bg-destructive/10 border-destructive/20"
      default:
        return "bg-muted/10 border-border"
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card
        className={`backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-lg transition-all duration-300 ${getRiskColor()}`}
      >
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {child.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{child.name}</h3>
              <p className="text-sm text-muted-foreground">{child.grade}</p>
            </div>
            <Badge
              variant={
                child.riskStatus === "low" ? "default" : child.riskStatus === "medium" ? "secondary" : "destructive"
              }
              className="capitalize"
            >
              {child.riskStatus}
            </Badge>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{child.overallScore}%</div>
              <div className="text-xs text-muted-foreground">Current</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-primary">{child.predictedScore}%</span>
                {getTrendIcon()}
              </div>
              <div className="text-xs text-muted-foreground">Predicted</div>
            </div>
          </div>

          {/* Progress Bar */}
          <AnimatedProgress
            value={child.overallScore}
            variant={child.riskStatus === "low" ? "success" : child.riskStatus === "medium" ? "warning" : "danger"}
          />

          {/* Recent Highlight */}
          <div className="text-sm text-center text-muted-foreground bg-muted/30 p-2 rounded">
            {child.recentHighlight}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
