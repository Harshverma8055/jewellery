"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const sparkleIdCounter = useRef(0);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let lastSparkleTime = 0;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Reduced sparkle frequency for luxury subtlety
      const now = Date.now();
      if (now - lastSparkleTime > 80) {
        lastSparkleTime = now;
        const newSparkle: Sparkle = {
          id: sparkleIdCounter.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1.5,
        };

        setSparkles(prev => [...prev.slice(-8), newSparkle]); // Max 8 sparkles

        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 600);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName.toLowerCase() === 'button' || 
                            target.tagName.toLowerCase() === 'a' || 
                            target.closest('button') || 
                            target.closest('a');
      
      if (isInteractive) {
        setIsHovering(true);
        // Determine label based on context
        const el = (target.closest('button') || target.closest('a') || target) as HTMLElement;
        const text = el.textContent?.trim() || '';
        if (text.toLowerCase().includes('cart') || text.toLowerCase().includes('add')) {
          setHoverLabel('Add');
        } else if (text.toLowerCase().includes('view') || text.toLowerCase().includes('3d')) {
          setHoverLabel('View');
        } else if (text.toLowerCase().includes('explore') || text.toLowerCase().includes('discover')) {
          setHoverLabel('Explore');
        } else {
          setHoverLabel('');
        }
      } else {
        setIsHovering(false);
        setHoverLabel('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Sparkle trail */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0.8, scale: 1, x: sparkle.x, y: sparkle.y }}
            animate={{ 
              opacity: 0, 
              scale: 0, 
              x: sparkle.x + (Math.random() * 30 - 15),
              y: sparkle.y + (Math.random() * 30 - 15),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: 'var(--color-gold-light)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 2147483645,
              boxShadow: '0 0 6px var(--color-gold)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Core dot */}
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--color-gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2147483647,
          boxShadow: '0 0 10px rgba(201, 169, 110, 0.5)',
        }}
      />

      {/* Teal glow ring */}
      <motion.div
        animate={{
          x: mousePosition.x - (isHovering ? 35 : 18),
          y: mousePosition.y - (isHovering ? 35 : 18),
          scale: isHovering ? 1 : 1,
          width: isHovering ? 70 : 36,
          height: isHovering ? 70 : 36,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          border: isHovering 
            ? '1px solid rgba(201, 169, 110, 0.6)' 
            : '1px solid rgba(26, 58, 58, 0.5)',
          backgroundColor: isHovering 
            ? 'rgba(201, 169, 110, 0.08)' 
            : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2147483646,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
        }}
      >
        {/* Hover label */}
        <AnimatePresence>
          {isHovering && hoverLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                fontSize: '8px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
              }}
            >
              {hoverLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
