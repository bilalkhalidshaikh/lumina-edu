import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for Lumina EdTech platform
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function getRiskStatusColor(status: "low" | "medium" | "high"): string {
  switch (status) {
    case "low":
      return "text-success"
    case "medium":
      return "text-warning"
    case "high":
      return "text-destructive"
    default:
      return "text-muted-foreground"
  }
}

export function getRiskStatusIcon(status: "low" | "medium" | "high"): string {
  switch (status) {
    case "low":
      return "/3d-green-success-badge-sparkles.jpg"
    case "medium":
      return "/3d-yellow-warning-icon-attention.jpg"
    case "high":
      return "/3d-red-danger-alert-icon-glowing.jpg"
    default:
      return "/3d-neutral-status-icon.jpg"
  }
}

// AI Integration placeholders for Google AI ecosystem
export const AI_CONFIG = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  GEMINI_MODEL: "gemini-2.5-flash-preview-05-20",
  GEMINI_IMAGE_MODEL: "gemini-2.5-flash-image-preview",
  // Placeholder for future AI integrations
}

// Firebase configuration placeholders
export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}
