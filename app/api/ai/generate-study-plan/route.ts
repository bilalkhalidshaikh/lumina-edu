import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-services"

export async function POST(request: NextRequest) {
  try {
    const { studentData, timeframe = "week" } = await request.json()

    if (!studentData) {
      return NextResponse.json({ error: "Student data is required" }, { status: 400 })
    }

    if (!aiService.isConfigured()) {
      return NextResponse.json(
        {
          error: "AI service not configured",
          message: "Please add GEMINI_API_KEY to environment variables",
        },
        { status: 503 },
      )
    }

    // Generate personalized study plan
    const studyPlan = await aiService.createStudyPlan(studentData, timeframe)

    return NextResponse.json({
      success: true,
      studyPlan,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Study Plan Generation Error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate study plan",
        message: "An error occurred while processing your request",
      },
      { status: 500 },
    )
  }
}
