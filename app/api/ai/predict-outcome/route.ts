import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-services"

export async function POST(request: NextRequest) {
  try {
    const { studentData } = await request.json()

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

    // Generate academic outcome prediction
    const prediction = await aiService.predictOutcome(studentData)

    return NextResponse.json({
      success: true,
      prediction,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Prediction Generation Error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate prediction",
        message: "An error occurred while processing your request",
      },
      { status: 500 },
    )
  }
}
