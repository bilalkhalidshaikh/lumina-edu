"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Target, Clock, BookOpen, CheckCircle, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AI_CONFIG } from "@/lib/utils"

interface StudyPlanGeneratorProps {
  studentId: string
}

const mockStudyPlan = {
  title: "Personalized Study Plan - Week of January 15th",
  totalHours: 12,
  completedHours: 4,
  subjects: [
    {
      name: "Mathematics",
      priority: "high",
      hours: 4,
      completed: 2,
      tasks: [
        { task: "Review quadratic equations", duration: "45 min", completed: true },
        { task: "Practice word problems", duration: "60 min", completed: true },
        { task: "Complete Chapter 8 exercises", duration: "90 min", completed: false },
        { task: "Prepare for upcoming test", duration: "45 min", completed: false },
      ],
    },
    {
      name: "History",
      priority: "high",
      hours: 3,
      completed: 1,
      tasks: [
        { task: "Read Chapter 12: Industrial Revolution", duration: "60 min", completed: true },
        { task: "Create timeline of key events", duration: "45 min", completed: false },
        { task: "Watch documentary on steam engines", duration: "30 min", completed: false },
        { task: "Write reflection essay", duration: "45 min", completed: false },
      ],
    },
    {
      name: "Science",
      priority: "medium",
      hours: 3,
      completed: 1,
      tasks: [
        { task: "Lab report on photosynthesis", duration: "90 min", completed: true },
        { task: "Study cellular respiration", duration: "45 min", completed: false },
        { task: "Practice diagram labeling", duration: "45 min", completed: false },
      ],
    },
    {
      name: "English",
      priority: "low",
      hours: 2,
      completed: 0,
      tasks: [
        { task: "Read assigned chapters", duration: "60 min", completed: false },
        { task: "Vocabulary practice", duration: "30 min", completed: false },
        { task: "Draft book report outline", duration: "30 min", completed: false },
      ],
    },
  ],
}

export function StudyPlanGenerator({ studentId }: StudyPlanGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [studyPlan, setStudyPlan] = useState(mockStudyPlan)

  const generateStudyPlan = async () => {
    setIsGenerating(true)

    // Simulate AI study plan generation using Google AI (Gemini)
    // In production, this would call the actual Gemini API
    setTimeout(() => {
      // Mock updated study plan
      setIsGenerating(false)
    }, 4000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const completionPercentage = Math.round((studyPlan.completedHours / studyPlan.totalHours) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold">AI Study Plan Generator</h2>
          <p className="text-muted-foreground">Personalized learning schedule powered by Google AI</p>
        </div>
        <Button
          onClick={generateStudyPlan}
          disabled={isGenerating}
          className="bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 text-white gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Plan...
            </>
          ) : (
            <>
              <Target className="h-4 w-4" />
              Generate New Plan
            </>
          )}
        </Button>
      </motion.div>

      {/* Study Plan Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="backdrop-blur-sm bg-card/80 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {studyPlan.title}
            </CardTitle>
            <CardDescription>
              {studyPlan.completedHours} of {studyPlan.totalHours} hours completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {studyPlan.subjects.map((subject, index) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
          >
            <Card className="backdrop-blur-sm bg-card/80 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {subject.name}
                  </CardTitle>
                  <Badge variant={getPriorityColor(subject.priority)} className="capitalize">
                    {subject.priority} Priority
                  </Badge>
                </div>
                <CardDescription>
                  {subject.completed} of {subject.hours} hours completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={(subject.completed / subject.hours) * 100} className="h-2" />

                <div className="space-y-2">
                  {subject.tasks.map((task, taskIndex) => (
                    <motion.div
                      key={taskIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + taskIndex * 0.05 }}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        task.completed ? "bg-success/10" : "bg-muted/30"
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Play className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div className="flex-1">
                        <div className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.task}
                        </div>
                        <div className="text-xs text-muted-foreground">{task.duration}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Model Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center text-xs text-muted-foreground"
      >
        <p>
          Study plans generated using {AI_CONFIG.GEMINI_MODEL} • Updated based on performance data and learning patterns
        </p>
      </motion.div>
    </div>
  )
}
