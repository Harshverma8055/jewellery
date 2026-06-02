"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./auth.module.css";
import Navigation from "@/components/Navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["-40%", "40%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["-40%", "40%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate auth processing delay for demo
    setTimeout(() => {
      setIsProcessing(false);
      alert(isLogin ? "Successfully signed in!" : "Account created successfully!");
      router.push("/");
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -20 : 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: isLogin ? 20 : -20, transition: { duration: 0.3 } }
  };

  return (
    <main>
      <Navigation />
      
      <div 
        className={styles.authContainer}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1500px' }}
      >
        {/* Deep Luxury Background Image with Aggressive Zoom */}
        <motion.div 
          className={styles.backgroundWrapper}
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image 
            src="/assets/jewelry_craftsman.png"
            alt="Luxury Jewelry"
            fill
            className={styles.backgroundImage}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,12,0.9) 0%, rgba(10,10,12,0.6) 100%)' }} />
        </motion.div>

        {/* 3D Gold Dust Particles */}
        <div className={styles.canvasWrapper}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={2} />
            <Sparkles count={400} scale={15} size={4} speed={2} opacity={0.8} color="#D4AF37" noise={0.2} />
            <Stars radius={10} depth={50} count={1000} factor={4} saturation={1} fade speed={2} />
          </Canvas>
        </div>

        <motion.div 
          className={styles.bgGlow} 
          style={{ x: glowX, y: glowY }}
        />
          
          <motion.div 
            className={styles.authCard}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Inner parallax effect */}
            <motion.div style={{ transform: 'translateZ(60px)' }}>
              <div className={styles.header}>
              <h1 className={styles.brand}>Samaira</h1>
              <p className={styles.subtitle}>Enter the world of absolute luxury</p>
            </div>

            <div className={styles.toggleContainer}>
              <motion.div 
                className={styles.toggleIndicator}
                animate={{ left: isLogin ? "5px" : "calc(50% + 5px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button 
                className={`${styles.toggleBtn} ${isLogin ? styles.active : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button 
                className={`${styles.toggleBtn} ${!isLogin ? styles.active : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form 
                  key="login"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit}
                >
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input type="email" required placeholder="your@email.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" required placeholder="••••••••" />
                  </div>
                  <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isProcessing}>
                    {isProcessing ? "Authenticating..." : "Sign In"}
                  </button>
                  <div className={styles.forgotPassword}>
                    <button type="button">Forgot your password?</button>
                  </div>
                </motion.form>
              ) : (
                <motion.form 
                  key="register"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit}
                >
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input type="text" required placeholder="Aria Sharma" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input type="email" required placeholder="your@email.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" required placeholder="Create a password" />
                  </div>
                  <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isProcessing}>
                    {isProcessing ? "Creating Profile..." : "Create Account"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            </motion.div>
          </motion.div>
      </div>
    </main>
  );
}
