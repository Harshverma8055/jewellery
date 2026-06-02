"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Hotspot = ({ top, left, label, onClick }: { top: string, left: string, label: string, onClick: () => void }) => (
  <div 
    style={{ position: 'absolute', top, left, zIndex: 10, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    onClick={onClick}
  >
    <motion.div
      style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(201, 169, 110, 0.2)', position: 'absolute', border: '1px solid rgba(201, 169, 110, 0.3)' }}
      animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
    />
    <motion.div
      style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-gold)', boxShadow: '0 0 12px rgba(201, 169, 110, 0.5)' }}
      whileHover={{ scale: 1.5 }}
    />
    <motion.span 
      style={{ 
        marginTop: '12px', color: 'var(--text-primary)', fontSize: 'var(--text-micro)', letterSpacing: '2px', 
        textTransform: 'uppercase', textShadow: '0 2px 8px rgba(0,0,0,0.8)', 
        background: 'var(--surface-glass)', padding: '4px 10px', borderRadius: '2px', 
        backdropFilter: 'blur(8px)', border: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-body)', fontWeight: 500,
      }}
      initial={{ opacity: 0, y: -5 }}
      whileHover={{ opacity: 1, y: 0 }}
    >
      {label}
    </motion.span>
  </div>
);

export default function PantherOnModel() {
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  const details = {
    'diamonds': {
      title: 'VVS1 Pavé Setting',
      desc: 'Over 400 meticulously hand-set brilliant-cut diamonds cascade across the panther silhouette, creating a fluid surface of unbroken light and eternal brilliance.',
    },
    'enamel': {
      title: 'Obsidian Enamel',
      desc: 'Deep, hand-painted black obsidian enamel provides a striking contrast, outlining the panther\'s fierce geometry and emphasizing its predatory elegance.',
    },
    'eyes': {
      title: 'Colombian Emeralds',
      desc: 'Piercing marquise-cut Colombian emeralds form the eyes, casting a mesmerizing, hypnotic green glow that commands attention in any lighting.',
    }
  };

  return (
    <section style={{ 
      position: 'relative', width: '100%', minHeight: '100vh', 
      background: 'var(--surface-primary)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      overflow: 'hidden', padding: 'var(--section-padding) 0' 
    }}>
      
      {/* Teal atmosphere */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(26, 58, 58, 0.12) 0%, transparent 50%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 70%, rgba(201, 169, 110, 0.03) 0%, transparent 40%)', zIndex: 1 }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span style={{ color: 'var(--color-gold)', letterSpacing: '5px', fontSize: 'var(--text-overline)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            Vogue Editorial Showcase
          </span>
          <h2 style={{ fontSize: 'var(--text-h2)', color: 'var(--text-primary)', margin: '16px 0', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
            The Predator on Hand
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-body)' }}>
            Experience the monumental scale and commanding presence of La Panthère. Explore the master craftsmanship through interactive luxury hotspots.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ 
            position: 'relative', width: '100%', maxWidth: '900px', height: '600px', 
            borderRadius: '4px', overflow: 'hidden', 
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Image 
            src="/assets/model_ring.png" 
            alt="Model Hand wearing Panther Ring" 
            fill 
            style={{ objectFit: 'cover', filter: 'contrast(1.05) brightness(0.85)' }} 
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 30, 30, 0.8) 0%, transparent 30%)' }} />

          <Hotspot top="45%" left="48%" label="Pavé Diamonds" onClick={() => setActiveDetail('diamonds')} />
          <Hotspot top="40%" left="55%" label="Emerald Eyes" onClick={() => setActiveDetail('eyes')} />
          <Hotspot top="55%" left="52%" label="Obsidian Enamel" onClick={() => setActiveDetail('enamel')} />

          <AnimatePresence>
            {activeDetail && (
              <motion.div 
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                style={{ position: 'absolute', inset: 0, background: 'rgba(11, 30, 30, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
                onClick={() => setActiveDetail(null)}
              >
                <motion.div 
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  style={{ 
                    background: 'var(--surface-glass)', 
                    border: '1px solid var(--border-light)', 
                    padding: '40px', borderRadius: '4px', maxWidth: '400px', textAlign: 'center', 
                    boxShadow: 'var(--shadow-xl)',
                    backdropFilter: 'blur(20px)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 style={{ color: 'var(--color-gold)', fontSize: 'var(--text-h3)', marginBottom: '16px', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                    {details[activeDetail as keyof typeof details].title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {details[activeDetail as keyof typeof details].desc}
                  </p>
                  <button 
                    onClick={() => setActiveDetail(null)}
                    className="btn-outline-gold"
                    style={{ marginTop: '28px', padding: '10px 28px', fontSize: 'var(--text-micro)' }}
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
