"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import ReservationModal from './ReservationModal';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function PantherShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeMaterial, setActiveMaterial] = useState('18K Gold');
  const [activeGem, setActiveGem] = useState('Emerald Green');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { addToCart } = useCart();
  const router = useRouter();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const lightPositionX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "200%"]);
  const lightPositionY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "200%"]);

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

  const getMaterialFilter = () => {
    switch (activeMaterial) {
      case 'Rose Gold': return 'hue-rotate(-20deg) saturate(1.2) brightness(0.95)';
      case 'Platinum': return 'grayscale(100%) brightness(1.3) contrast(1.1)';
      case 'Obsidian Black Metal': return 'grayscale(100%) brightness(0.3) contrast(1.5)';
      case '18K Gold':
      default: return 'none';
    }
  };

  const getGemFilter = () => {
    switch (activeGem) {
      case 'Sapphire Blue': return 'hue-rotate(180deg)';
      case 'Ruby Red': return 'hue-rotate(300deg)';
      case 'Diamond White': return 'grayscale(80%) brightness(1.2)';
      case 'Emerald Green':
      default: return 'none';
    }
  };

  const metals = ['18K Gold', 'Rose Gold', 'Platinum', 'Obsidian Black Metal'];
  const gems = ['Emerald Green', 'Sapphire Blue', 'Ruby Red', 'Diamond White'];

  return (
    <div 
      className="panther-showcase-container" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh', 
        background: 'var(--surface-primary)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Teal atmospheric background */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: '-50%', 
          background: 'radial-gradient(circle at 40% 50%, rgba(26, 58, 58, 0.15) 0%, transparent 50%)', 
          filter: 'blur(80px)', 
          zIndex: 1 
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gold accent glow */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: '-20%', 
          background: 'radial-gradient(ellipse at 60% 70%, rgba(201, 169, 110, 0.04) 0%, transparent 50%)', 
          filter: 'blur(60px)', 
          zIndex: 1 
        }}
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle texture overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(201, 169, 110, 0.01) 1px, rgba(201, 169, 110, 0.01) 2px)',
        opacity: 0.3, 
        zIndex: 2 
      }} />

      {/* 3D Parallax Viewer */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hero3DContainer"
      >
        <motion.div
          style={{
            width: '60%',
            height: '60%',
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            position: 'relative',
          }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Ring Image */}
          <motion.div
            style={{ 
              width: '100%', 
              height: '100%', 
              position: 'absolute',
              filter: `drop-shadow(0 40px 60px rgba(0,0,0,0.7)) ${getMaterialFilter()} ${getGemFilter()}`,
              transition: 'filter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: 'translateZ(100px)'
            }}
          >
            <Image 
              src="/assets/panther_ring_prototype.png" 
              alt="Panther Ring Showcase" 
              fill 
              style={{ objectFit: 'contain' }} 
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>

          {/* Dynamic Light Sweep */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-50%',
              background: 'radial-gradient(circle, rgba(201, 169, 110, 0.2) 0%, transparent 40%)',
              left: lightPositionX,
              top: lightPositionY,
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
              transform: 'translateZ(120px)'
            }}
          />
        </motion.div>
      </div>

      {/* Floating Customization UI */}
      <div className="heroUIRight">
        {/* Metal Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ 
            color: 'var(--text-tertiary)', 
            textTransform: 'uppercase', 
            letterSpacing: '4px', 
            fontSize: 'var(--text-micro)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
          }}>Select Metal</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {metals.map(metal => (
              <button
                key={metal}
                onClick={() => setActiveMaterial(metal)}
                style={{
                  background: activeMaterial === metal ? 'rgba(201, 169, 110, 0.1)' : 'transparent',
                  border: activeMaterial === metal ? '1px solid var(--border-medium)' : '1px solid var(--border-subtle)',
                  color: activeMaterial === metal ? 'var(--color-gold)' : 'var(--text-secondary)',
                  padding: '10px 18px',
                  borderRadius: '2px',
                  textAlign: 'left',
                  fontSize: 'var(--text-caption)',
                  letterSpacing: '1.5px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                }}
              >
                {metal}
              </button>
            ))}
          </div>
        </div>

        {/* Gemstone Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ 
            color: 'var(--text-tertiary)', 
            textTransform: 'uppercase', 
            letterSpacing: '4px', 
            fontSize: 'var(--text-micro)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
          }}>Select Eyes</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {gems.map(gem => (
              <button
                key={gem}
                onClick={() => setActiveGem(gem)}
                style={{
                  background: activeGem === gem ? 'rgba(201, 169, 110, 0.1)' : 'transparent',
                  border: activeGem === gem ? '1px solid var(--border-medium)' : '1px solid var(--border-subtle)',
                  color: activeGem === gem ? 'var(--color-gold)' : 'var(--text-secondary)',
                  padding: '10px 18px',
                  borderRadius: '2px',
                  textAlign: 'left',
                  fontSize: 'var(--text-caption)',
                  letterSpacing: '1.5px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                }}
              >
                {gem}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic Copy Left */}
      <div className="heroUILeft">
        <h2 className="heroTitleText">La Panthère</h2>
        <p className="heroDescText">
          A fierce declaration of luxury. Handcrafted from 18K solid gold, enveloped in hand-set diamonds, and finished with profound black enamel accents. The piercing emerald gaze captures the essence of absolute power and elegance.
        </p>
        <div style={{ marginTop: '24px', fontSize: '1.2rem', color: 'var(--color-gold)', letterSpacing: '2px', fontFamily: 'var(--font-display)' }}>
          Starting at ₹8,50,000
        </div>
        <button 
          onClick={() => {
            addToCart({
              id: `panther-${Date.now()}`,
              name: 'La Panthère Ring',
              material: `${activeMaterial} · ${activeGem} Eyes`,
              price: '₹8,50,000',
              img: '/assets/panther_ring_prototype.png'
            });
            router.push('/cart');
          }}
          className="btn-outline-gold"
          style={{ 
            marginTop: '20px', 
            padding: '14px 36px',
            fontSize: 'var(--text-overline)',
          }}
        >
          Reserve Masterpiece
        </button>
      </div>

      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedMetal={activeMaterial} 
        selectedGem={activeGem} 
      />
    </div>
  );
}
