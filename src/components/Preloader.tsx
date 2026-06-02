"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const brandLetters = 'SAMAIRA'.split('');

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--surface-primary)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Teal ambient atmosphere */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(26, 58, 58, 0.4) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />

          {/* Gold glow beneath */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(201, 169, 110, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              top: '55%',
            }}
          />

          {/* Letter-by-letter brand reveal */}
          <div style={{ display: 'flex', gap: '4px', zIndex: 10, overflow: 'hidden' }}>
            {brandLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              color: 'var(--color-gold)',
              letterSpacing: '5px',
              fontSize: 'var(--text-overline)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              marginTop: '16px',
              zIndex: 10,
            }}
          >
            L&apos;Éternité
          </motion.p>

          {/* Luxury loading line */}
          <motion.div
            style={{
              marginTop: '50px',
              width: '1px',
              height: '60px',
              background: 'rgba(201, 169, 110, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)',
              }}
            />
          </motion.div>

          {/* Horizontal gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute',
              bottom: '15%',
              width: '120px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--color-gold-dim), transparent)',
              zIndex: 10,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
