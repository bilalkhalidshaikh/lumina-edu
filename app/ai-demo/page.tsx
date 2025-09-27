"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Sparkles, ImageIcon, Target, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AIStatusIndicator } from "@/components/ai/ai-status-indicator"

const mockStudentData = {
  id: "1",
  name: "Alex Johnson",
  avgGrade: 88,
  attendance: 95,
  riskStatus: "low",
  mood: "happy",
  subjects: [
    { name: "Mathematics", grade: 92, trend: "up" },
    { name: "Science", grade: 85, trend: "stable" },
    { name: "English", grade: 88, trend: "up" },
    { name: "History", grade: 84, trend: "down" },
  ],
}

export default function AIDemoPage() {
  const [isGenerating, setIsGenerating] = useState<string | null>(null)
  const [results, setResults] = useState<any>({})

  const testAIFeature = async (feature: string) => {
    setIsGenerating(feature)

    try {
      let response
      switch (feature) {
        case "insights":
          response = await fetch("/api/ai/generate-insights", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentData: mockStudentData }),
          })
          break
        case "study-plan":
          response = await fetch("/api/ai/generate-study-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentData: mockStudentData, timeframe: "week" }),
          })
          break
        case "prediction":
          response = await fetch("/api/ai/predict-outcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentData: mockStudentData }),
          })
          break
        case "avatar":
          response = await fetch("/api/ai/generate-avatar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentData: mockStudentData }),
          })
          break
      }

      if (response) {
        const data = await response.json()
        setResults((prev) => ({ ...prev, [feature]: data }))
      }
    } catch (error) {
      console.error(`Error testing ${feature}:`, error)
      setResults((prev) => ({ ...prev, [feature]: { error: "Failed to test feature" } }))
    } finally {
      setIsGenerating(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
            AI Integration Demo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test and demonstrate the Google AI ecosystem integration for Lumina EdTech platform
          </p>
        </motion.div>

        {/* AI Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AIStatusIndicator />
        </motion.div>

        {/* AI Features Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="insights" className="gap-2">
                <Brain className="h-4 w-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="study-plan" className="gap-2">
                <Target className="h-4 w-4" />
                Study Plan
              </TabsTrigger>
              <TabsTrigger value="prediction" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Prediction
              </TabsTrigger>
              <TabsTrigger value="avatar" className="gap-2">
                <ImageIcon className="h-4 w-4" />
                Avatar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="insights">
              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle>AI Insights Generation</CardTitle>
                  <CardDescription>Test Gemini text generation for educational insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => testAIFeature("insights")}
                    disabled={isGenerating === "insights"}
                    className="gap-2"
                  >
                    {isGenerating === "insights" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Insights...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Test Insights Generation
                      </>
                    )}
                  </Button>

                  {results.insights && (
                    <div className="p-4 rounded-lg bg-muted/30">
                      <pre className="text-xs overflow-auto">{JSON.stringify(results.insights, null, 2)}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="study-plan">
              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle>Study Plan Generation</CardTitle>
                  <CardDescription>Test AI-powered personalized study plan creation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => testAIFeature("study-plan")}
                    disabled={isGenerating === "study-plan"}
                    className="gap-2"
                  >
                    {isGenerating === "study-plan" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Test Study Plan Generation
                      </>
                    )}
                  </Button>

                  {results["study-plan"] && (
                    <div className="p-4 rounded-lg bg-muted/30">
                      <pre className="text-xs overflow-auto">{JSON.stringify(results["study-plan"], null, 2)}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prediction">
              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle>Academic Prediction</CardTitle>
                  <CardDescription>Test AI-powered academic outcome prediction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => testAIFeature("prediction")}
                    disabled={isGenerating === "prediction"}
                    className="gap-2"
                  >
                    {isGenerating === "prediction" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Prediction...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Test Prediction Generation
                      </>
                    )}
                  </Button>

                  {results.prediction && (
                    <div className="p-4 rounded-lg bg-muted/30">
                      <pre className="text-xs overflow-auto">{JSON.stringify(results.prediction, null, 2)}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avatar">
              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle>3D Avatar Generation</CardTitle>
                  <CardDescription>Test Gemini image generation for personalized avatars</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => testAIFeature("avatar")}
                    disabled={isGenerating === "avatar"}
                    className="gap-2"
                  >
                    {isGenerating === "avatar" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Avatar...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Test Avatar Generation
                      </>
                    )}
                  </Button>

                  {results.avatar && (
                    <div className="p-4 rounded-lg bg-muted/30">
                      <pre className="text-xs overflow-auto">{JSON.stringify(results.avatar, null, 2)}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Integration Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader>
              <CardTitle>Integration Notes</CardTitle>
              <CardDescription>Implementation details for production deployment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                  <h4 className="font-semibold text-info mb-2">Environment Setup</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Add GEMINI_API_KEY to environment variables</li>
                    <li>• Configure Firebase project settings</li>
                    <li>• Set up Google AI billing account</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <h4 className="font-semibold text-warning mb-2">Production Considerations</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Implement rate limiting for AI calls</li>
                    <li>• Add error handling and fallbacks</li>
                    <li>• Monitor API usage and costs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
