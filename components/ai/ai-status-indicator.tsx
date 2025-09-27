"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Zap, ImageIcon, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aiService } from "@/lib/ai-services"

export function AIStatusIndicator() {
  const [status, setStatus] = useState(aiService.getServiceStatus())

  useEffect(() => {
    // Check AI service status on component mount
    setStatus(aiService.getServiceStatus())
  }, [])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="backdrop-blur-sm bg-card/80 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-primary" />
            AI Services Status
          </CardTitle>
          <CardDescription>Google AI ecosystem integration status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Text Generation Status */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">Text Generation</div>
                <div className="text-xs text-muted-foreground">Model: {status.model}</div>
              </div>
            </div>
            <Badge variant={status.textGeneration ? "default" : "secondary"} className="gap-1">
              {status.textGeneration ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
              {status.textGeneration ? "Active" : "Setup Required"}
            </Badge>
          </div>

          {/* Image Generation Status */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <ImageIcon className="h-4 w-4 text-info" />
              <div>
                <div className="font-medium">Image Generation</div>
                <div className="text-xs text-muted-foreground">Model: {status.imageModel}</div>
              </div>
            </div>
            <Badge variant={status.imageGeneration ? "default" : "secondary"} className="gap-1">
              {status.imageGeneration ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
              {status.imageGeneration ? "Active" : "Setup Required"}
            </Badge>
          </div>

          {/* Setup Instructions */}
          {(!status.textGeneration || !status.imageGeneration) && (
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="text-sm font-medium text-warning">Setup Required</div>
              <div className="text-xs text-muted-foreground mt-1">
                Add your Google AI API key to environment variables to enable AI features.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
