"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageSquare, Lightbulb, Calendar, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ParentInsightsProps {
  childId: string
}

const parentInsights = [
  {
    type: "encouragement",
    icon: Heart,
    title: "Celebrate Progress",
    description: "Alex has shown consistent improvement in Mathematics. Consider acknowledging their hard work!",
    actionable: true,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    type: "support",
    icon: MessageSquare,
    title: "Communication Opportunity",
    description: "Your child mentioned feeling challenged by History. A supportive conversation could help.",
    actionable: true,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    type: "suggestion",
    icon: Lightbulb,
    title: "Learning Enhancement",
    description: "Consider educational documentaries to supplement History learning at home.",
    actionable: false,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    type: "schedule",
    icon: Calendar,
    title: "Important Dates",
    description: "Science Quiz on January 20th - help your child prepare with review sessions.",
    actionable: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function ParentInsights({ childId }: ParentInsightsProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateParentTips = async () => {
    setIsGenerating(true)
    // Simulate AI tip generation for parents
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Parenting Insights
            </CardTitle>
            <CardDescription>AI-powered suggestions to support your child's learning journey</CardDescription>
          </div>
          <Button
            onClick={generateParentTips}
            disabled={isGenerating}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
          >
            {isGenerating ? (
              <>
                <div className="w-3 h-3 border border-primary/30 border-t-primary rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3" />
                New Tips
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parentInsights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                      <insight.icon className={`h-4 w-4 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                  {insight.actionable && (
                    <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                      Take Action
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
