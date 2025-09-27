"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Lightbulb, TrendingUp, AlertCircle, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AI_CONFIG } from "@/lib/utils"

interface StudentInsightsProps {
  studentId: string
}

const mockInsights = [
  {
    type: "strength",
    icon: TrendingUp,
    title: "Strong Mathematical Reasoning",
    description: "Alex shows exceptional problem-solving skills in algebra and geometry.",
    confidence: 94,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    type: "opportunity",
    icon: Lightbulb,
    title: "History Engagement Opportunity",
    description: "Consider incorporating more interactive timeline activities to boost engagement.",
    confidence: 87,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    type: "prediction",
    icon: Brain,
    title: "Predicted Academic Trajectory",
    description: "Based on current trends, Alex is likely to achieve 92% overall by semester end.",
    confidence: 91,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    type: "alert",
    icon: AlertCircle,
    title: "Attention Required",
    description: "Recent decline in history scores suggests need for additional support.",
    confidence: 89,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
]

export function StudentInsights({ studentId }: StudentInsightsProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [insights, setInsights] = useState(mockInsights)

  const generateNewInsights = async () => {
    setIsGenerating(true)

    // Simulate AI insight generation using Google AI (Gemini)
    // In production, this would call the actual Gemini API
    setTimeout(() => {
      // Mock new insight generation
      const newInsight = {
        type: "recommendation",
        icon: Sparkles,
        title: "AI-Generated Recommendation",
        description: "Consider implementing spaced repetition for vocabulary retention in English class.",
        confidence: 93,
        color: "text-info",
        bgColor: "bg-info/10",
      }

      setInsights([newInsight, ...insights.slice(0, 3)])
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header with Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
          <p className="text-muted-foreground">Personalized recommendations powered by Google AI</p>
        </div>
        <Button
          onClick={generateNewInsights}
          disabled={isGenerating}
          className="bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 text-white gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate New Insights
            </>
          )}
        </Button>
      </motion.div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={`${insight.title}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                      <insight.icon className={`h-5 w-5 ${insight.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{insight.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Model Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center text-xs text-muted-foreground"
      >
        <p>Insights powered by {AI_CONFIG.GEMINI_MODEL} • Confidence scores based on historical data patterns</p>
      </motion.div>
    </div>
  )
}
