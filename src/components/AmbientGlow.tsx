"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AmbientGlow() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Primary teal ambient glow — top right */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-15%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26, 58, 58, 0.25) 0%, rgba(13, 38, 38, 0.1) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary gold ambient glow — bottom left */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-25%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.06) 0%, rgba(201, 169, 110, 0.02) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Subtle center teal ray */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: '30vw',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(26, 88, 88, 0.08), transparent)',
          filter: 'blur(2px)',
          transformOrigin: 'center',
        }}
        animate={{
          opacity: [0, 0.5, 0],
          scaleX: [0.5, 1.5, 0.5],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Soft gold dust shimmer — moves slowly */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          right: '20%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.04) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          y: [0, -60, 0],
          x: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
      />
    </div>
  );
}
