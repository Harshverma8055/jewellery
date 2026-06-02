"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ThreeDViewerProps {
  modelUrl: string;
  altText: string;
  className?: string;
}

export default function ThreeDViewer({ modelUrl, altText, className }: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState('Gold');
  const [activeGem, setActiveGem] = useState('Diamond');
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const getMaterialFilter = () => {
    // If it's a necklace, we might want different filters or less extreme changes
    if (activeMaterial === 'Rose Gold') return 'hue-rotate(-20deg) saturate(1.2)';
    if (activeMaterial === 'Platinum') return 'grayscale(100%) brightness(1.2)';
    if (activeMaterial === 'Silver') return 'grayscale(100%) brightness(1.4)';
    return 'none';
  };

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', perspective: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* 3D Container */}
      <div 
        style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
      >
        <motion.div
          style={{ width: '80%', height: '80%', rotateX, rotateY, transformStyle: "preserve-3d", position: 'relative' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, cursor: 'grabbing' }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src={modelUrl} 
            alt={altText} 
            fill 
            style={{ 
              objectFit: 'contain', 
              filter: `drop-shadow(0 30px 40px rgba(0,0,0,0.4)) ${getMaterialFilter()}`,
              transform: 'translateZ(60px)',
              transition: 'filter 0.5s ease'
            }} 
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      {/* Customization UI */}
      <div style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 40px', zIndex: 10 }}>
        
        {/* Metal Switcher */}
        <div style={{ display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.6)', padding: '10px 15px', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          {['Gold', 'Rose Gold', 'Platinum'].map(metal => (
            <button
              key={metal}
              onClick={() => setActiveMaterial(metal)}
              style={{
                background: activeMaterial === metal ? 'var(--color-gold)' : 'transparent',
                color: activeMaterial === metal ? '#000' : 'var(--color-pearl)',
                border: 'none', padding: '5px 15px', borderRadius: '20px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
            >
              {metal}
            </button>
          ))}
        </div>

        {/* Gem Switcher */}
        <div style={{ display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.6)', padding: '10px 15px', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          {['Diamond', 'Emerald', 'Ruby'].map(gem => (
            <button
              key={gem}
              onClick={() => setActiveGem(gem)}
              style={{
                background: activeGem === gem ? 'var(--color-gold)' : 'transparent',
                color: activeGem === gem ? '#000' : 'var(--color-pearl)',
                border: 'none', padding: '5px 15px', borderRadius: '20px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
            >
              {gem}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
