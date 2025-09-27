"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const performanceData = [
  { month: "Sep", math: 85, science: 82, english: 88, history: 79 },
  { month: "Oct", math: 87, science: 84, english: 89, history: 81 },
  { month: "Nov", math: 89, science: 86, english: 87, history: 83 },
  { month: "Dec", math: 91, science: 88, english: 90, history: 84 },
  { month: "Jan", math: 92, science: 85, english: 88, history: 84 },
]

const weeklyActivity = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 4.2 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 4.5 },
  { day: "Fri", hours: 3.1 },
  { day: "Sat", hours: 5.2 },
  { day: "Sun", hours: 2.3 },
]

interface StudentPerformanceChartProps {
  studentId: string
}

export function StudentPerformanceChart({ studentId }: StudentPerformanceChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Grade Trends */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="backdrop-blur-sm bg-card/80 border-border/50">
          <CardHeader>
            <CardTitle>Grade Trends</CardTitle>
            <CardDescription>Performance across subjects over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="math" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="science" stroke="hsl(var(--info))" strokeWidth={2} />
                <Line type="monotone" dataKey="english" stroke="hsl(var(--success))" strokeWidth={2} />
                <Line type="monotone" dataKey="history" stroke="hsl(var(--warning))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Study Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="backdrop-blur-sm bg-card/80 border-border/50">
          <CardHeader>
            <CardTitle>Weekly Study Time</CardTitle>
            <CardDescription>Hours spent studying per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
