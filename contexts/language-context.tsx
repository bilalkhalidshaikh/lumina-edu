"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ur"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.students": "Students",
    "nav.parent": "Parent View",
    "nav.settings": "Settings",
    "nav.logout": "Logout",

    // Login
    "login.title": "Welcome to Lumina",
    "login.subtitle": "AI-powered educational analytics platform",
    "login.email": "Email",
    "login.password": "Password",
    "login.signin": "Sign In",
    "login.loading": "Signing in...",

    // Dashboard
    "dashboard.title": "Analytics Dashboard",
    "dashboard.totalStudents": "Total Students",
    "dashboard.avgPerformance": "Average Performance",
    "dashboard.atRiskStudents": "At Risk Students",
    "dashboard.searchPlaceholder": "Search students...",
    "dashboard.name": "Name",
    "dashboard.attendance": "Attendance",
    "dashboard.avgGrade": "Avg Grade",
    "dashboard.predictedScore": "Predicted Score",
    "dashboard.riskStatus": "Risk Status",
    "dashboard.actions": "Actions",
    "dashboard.runPrediction": "Run Prediction",

    // Risk Status
    "risk.low": "Low Risk",
    "risk.medium": "Medium Risk",
    "risk.high": "High Risk",

    // Student Details
    "student.performance": "Performance",
    "student.insights": "AI Insights",
    "student.studyPlan": "Study Plan",
    "student.generatePlan": "Generate Study Plan",
    "student.generating": "Generating...",

    // Parent View
    "parent.title": "Your Children's Progress",
    "parent.overallScore": "Overall Score",
    "parent.insights": "Parenting Insights",
    "parent.quickActions": "Quick Actions",
    "parent.contactTeacher": "Contact Teacher",
    "parent.scheduleCall": "Schedule Call",
    "parent.viewReports": "View Reports",
  },
  ur: {
    // Navigation
    "nav.dashboard": "ڈیش بورڈ",
    "nav.students": "طلباء",
    "nav.parent": "والدین کا نظارہ",
    "nav.settings": "ترتیبات",
    "nav.logout": "لاگ آؤٹ",

    // Login
    "login.title": "لومینا میں خوش آمدید",
    "login.subtitle": "AI سے چلنے والا تعلیمی تجزیاتی پلیٹ فارم",
    "login.email": "ای میل",
    "login.password": "پاس ورڈ",
    "login.signin": "سائن ان",
    "login.loading": "سائن ان ہو رہا ہے...",

    // Dashboard
    "dashboard.title": "تجزیاتی ڈیش بورڈ",
    "dashboard.totalStudents": "کل طلباء",
    "dashboard.avgPerformance": "اوسط کارکردگی",
    "dashboard.atRiskStudents": "خطرے میں طلباء",
    "dashboard.searchPlaceholder": "طلباء تلاش کریں...",
    "dashboard.name": "نام",
    "dashboard.attendance": "حاضری",
    "dashboard.avgGrade": "اوسط گریڈ",
    "dashboard.predictedScore": "متوقع اسکور",
    "dashboard.riskStatus": "خطرے کی صورتحال",
    "dashboard.actions": "اعمال",
    "dashboard.runPrediction": "پیشن گوئی چلائیں",

    // Risk Status
    "risk.low": "کم خطرہ",
    "risk.medium": "درمیانہ خطرہ",
    "risk.high": "زیادہ خطرہ",

    // Student Details
    "student.performance": "کارکردگی",
    "student.insights": "AI بصیرت",
    "student.studyPlan": "مطالعہ کا منصوبہ",
    "student.generatePlan": "مطالعہ کا منصوبہ بنائیں",
    "student.generating": "بنایا جا رہا ہے...",

    // Parent View
    "parent.title": "آپ کے بچوں کی پیش قدمی",
    "parent.overallScore": "مجموعی اسکور",
    "parent.insights": "والدین کی بصیرت",
    "parent.quickActions": "فوری اعمال",
    "parent.contactTeacher": "استاد سے رابطہ",
    "parent.scheduleCall": "کال شیڈول کریں",
    "parent.viewReports": "رپورٹس دیکھیں",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("lumina-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ur")) {
      setLanguage(savedLanguage)
      // Set document direction for RTL support
      document.documentElement.dir = savedLanguage === "ur" ? "rtl" : "ltr"
      document.documentElement.lang = savedLanguage
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("lumina-language", lang)
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
