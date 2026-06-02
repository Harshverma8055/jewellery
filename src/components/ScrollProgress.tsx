"use client";

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--color-gold-dim), var(--color-gold), var(--color-gold-light), var(--color-gold))',
        transformOrigin: '0%',
        scaleX,
        zIndex: 99999,
      }}
      aria-hidden="true"
    />
  );
}
