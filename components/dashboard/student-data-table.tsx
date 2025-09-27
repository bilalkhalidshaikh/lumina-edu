"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatedProgress } from "@/components/ui/animated-progress"
import { getRiskStatusIcon } from "@/lib/utils"
import Link from "next/link"

interface Student {
  id: string
  name: string
  avatar: string
  attendance: number
  avgGrade: number
  predictedScore: number
  riskStatus: "low" | "medium" | "high"
  lastActive: string
}

const studentsData: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "/3d-educational-mascot-icon-purple-gradient.jpg",
    attendance: 95,
    avgGrade: 88,
    predictedScore: 92,
    riskStatus: "low",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Maria Garcia",
    avatar: "/3d-educational-mascot-icon-purple-gradient.jpg",
    attendance: 87,
    avgGrade: 76,
    predictedScore: 79,
    riskStatus: "medium",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "David Chen",
    avatar: "/3d-educational-mascot-icon-purple-gradient.jpg",
    attendance: 92,
    avgGrade: 94,
    predictedScore: 96,
    riskStatus: "low",
    lastActive: "30 minutes ago",
  },
  {
    id: "4",
    name: "Sarah Williams",
    avatar: "/3d-educational-mascot-icon-purple-gradient.jpg",
    attendance: 68,
    avgGrade: 62,
    predictedScore: 58,
    riskStatus: "high",
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Michael Brown",
    avatar: "/3d-educational-mascot-icon-purple-gradient.jpg",
    attendance: 89,
    avgGrade: 81,
    predictedScore: 84,
    riskStatus: "medium",
    lastActive: "5 hours ago",
  },
]

interface StudentDataTableProps {
  searchQuery: string
}

export function StudentDataTable({ searchQuery }: StudentDataTableProps) {
  const [isRunningPrediction, setIsRunningPrediction] = useState<string | null>(null)

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRunPrediction = async (studentId: string) => {
    setIsRunningPrediction(studentId)
    // Simulate AI prediction - replace with actual Google AI integration
    setTimeout(() => {
      setIsRunningPrediction(null)
    }, 3000)
  }

  const getRiskBadgeVariant = (status: "low" | "medium" | "high") => {
    switch (status) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Student</TableHead>
            <TableHead className="font-semibold">Attendance</TableHead>
            <TableHead className="font-semibold">Avg Grade</TableHead>
            <TableHead className="font-semibold">Predicted Score</TableHead>
            <TableHead className="font-semibold">Risk Status</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student, index) => (
            <motion.tr
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="group hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <Link
                  href={`/student/${student.id}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold flex items-center gap-1">
                      {student.name}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-muted-foreground">Active {student.lastActive}</div>
                  </div>
                </Link>
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <AnimatedProgress
                    value={student.attendance}
                    variant={student.attendance >= 90 ? "success" : student.attendance >= 75 ? "warning" : "danger"}
                    showLabel
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="text-lg font-semibold">{student.avgGrade}%</div>
              </TableCell>

              <TableCell>
                <div className="text-lg font-bold text-primary">{student.predictedScore}%</div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={getRiskStatusIcon(student.riskStatus) || "/placeholder.svg"}
                    alt={`${student.riskStatus} risk`}
                    className="w-6 h-6"
                  />
                  <Badge variant={getRiskBadgeVariant(student.riskStatus)} className="capitalize">
                    {student.riskStatus} Risk
                  </Badge>
                </div>
              </TableCell>

              <TableCell>
                <Button
                  size="sm"
                  onClick={() => handleRunPrediction(student.id)}
                  disabled={isRunningPrediction === student.id}
                  className="bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 text-white transition-all duration-300 transform hover:scale-105"
                >
                  {isRunningPrediction === student.id ? (
                    <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                      Running...
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      Run Prediction
                    </div>
                  )}
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
