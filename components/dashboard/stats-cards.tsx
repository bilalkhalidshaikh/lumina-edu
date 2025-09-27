"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, AlertTriangle, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const statsData = [
  {
    title: "Total Students",
    value: "156",
    description: "Active in your classes",
    icon: Users,
    trend: "+12%",
    trendUp: true,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    title: "Average Grade",
    value: "87.3%",
    description: "Across all subjects",
    icon: Award,
    trend: "+5.2%",
    trendUp: true,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "At-Risk Students",
    value: "23",
    description: "Need immediate attention",
    icon: AlertTriangle,
    trend: "-8%",
    trendUp: false,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Predicted Success",
    value: "92.1%",
    description: "AI confidence score",
    icon: TrendingUp,
    trend: "+3.1%",
    trendUp: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <span className={`text-xs font-medium ${stat.trendUp ? "text-success" : "text-destructive"}`}>
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
