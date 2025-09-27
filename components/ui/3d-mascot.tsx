"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { motion } from "framer-motion"

interface Mascot3DProps {
  variant?: "happy" | "encouraging" | "thinking" | "celebrating"
  size?: "sm" | "md" | "lg"
  className?: string
}

function MascotModel({ variant = "happy" }: { variant: string }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        {/* Simple 3D mascot representation - in production, load actual 3D model */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={variant === "happy" ? "#6366f1" : variant === "celebrating" ? "#10b981" : "#8b5cf6"}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, -0.2, 0.8]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.3, 0.05, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </Float>
  )
}

export function Mascot3D({ variant = "happy", size = "md", className }: Mascot3DProps) {
  const sizeMap = {
    sm: "h-24 w-24",
    md: "h-32 w-32",
    lg: "h-48 w-48",
  }

  return (
    <motion.div
      className={`${sizeMap[size]} ${className}`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.8,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <MascotModel variant={variant} />
        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </motion.div>
  )
}
