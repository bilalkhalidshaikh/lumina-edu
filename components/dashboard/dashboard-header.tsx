"use client"

import { motion } from "framer-motion"
import { Bell, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { LanguageToggle } from "@/components/ui/language-toggle"

export function DashboardHeader() {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-info rounded-lg flex items-center justify-center hover-glow">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                  Lumina
                </h1>
                <p className="text-xs text-muted-foreground">EdTech Analytics</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation and User Menu */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <LanguageToggle />

            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="relative hover-lift">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive animate-pulse-glow">
                  3
                </Badge>
              </Button>
            </motion.div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-lift">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/3d-educational-mascot-icon-purple-gradient.jpg" alt="Teacher" />
                      <AvatarFallback className="bg-primary text-primary-foreground">TC</AvatarFallback>
                    </Avatar>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">Ms. Sarah Chen</p>
                  <p className="text-xs leading-none text-muted-foreground">Mathematics Teacher</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 hover-lift">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive hover-lift">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
