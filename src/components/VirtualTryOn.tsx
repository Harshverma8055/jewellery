"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const hotspots = [
  { id: 'earrings', label: 'Earrings', top: '13%', left: '44%', desc: 'Hand-set pavé diamond drops with VVS1 clarity, suspended from 18K gold ear wires.' },
  { id: 'necklace', label: 'Necklace', top: '22%', left: '49%', desc: 'A cascading bib of graduated brilliant-cut diamonds, set in 18K gold with invisible settings.' },
  { id: 'bajubandh-r', label: 'Bajubandh', top: '28%', left: '34%', desc: 'Sculptural arm cuff with flowing geometric motifs, finished in hand-polished 18K gold.' },
  { id: 'bajubandh-l', label: 'Bajubandh', top: '29%', left: '61%', desc: 'Mirror-matched arm cuff to complete the symmetry. Each curve is precision-engineered.' },
  { id: 'kamarbandh', label: 'Kamarbandh', top: '38%', left: '50%', desc: 'A statement waist chain with interlocking medallions, each adorned with micro-pavé diamonds.' },
  { id: 'anklets', label: 'Anklets', top: '82%', left: '48%', desc: 'Delicate ankle chains with hand-crafted gold links and suspended diamond solitaires.' },
];

const materials = [
  { name: '18K Gold', color: '#C9A96E' },
  { name: 'Platinum', color: '#B8B8BA' },
  { name: 'Rose Gold', color: '#B76E79' },
  { name: 'Obsidian Steel', color: '#1A1A1A' },
];

const gemstones = [
  { name: 'Brilliant Cut Diamond', icon: '💎' },
  { name: 'Ceylon Sapphire', icon: '✦' },
];

function Hotspot({ spot, onClick, isActive }: { spot: typeof hotspots[0]; onClick: () => void; isActive: boolean }) {
  return (
    <div style={{ position: 'absolute', top: spot.top, left: spot.left, zIndex: 10, cursor: 'pointer' }} onClick={onClick}>
      <motion.div
        style={{
          width: 24, height: 24, borderRadius: '50%',
          border: '1px solid var(--color-gold)',
          background: 'rgba(201, 169, 110, 0.12)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: isActive ? 'var(--shadow-gold-strong)' : 'var(--shadow-gold)',
        }}
        animate={!isActive ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold)' }} />
      </motion.div>
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }}
            style={{
              position: 'absolute', left: 32, top: 0, whiteSpace: 'nowrap',
              background: 'var(--surface-glass)', border: '1px solid var(--border-light)',
              padding: '4px 12px', fontSize: 'var(--text-micro)',
              fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--color-gold)', fontFamily: 'var(--font-body)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {spot.label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VirtualTryOn() {
  const [activeMaterial, setActiveMaterial] = useState('18K Gold');
  const [activeGem, setActiveGem] = useState('Brilliant Cut Diamond');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [engraving, setEngraving] = useState('');
  
  const { addToCart } = useCart();
  const router = useRouter();

  const activeSpot = hotspots.find(h => h.id === activeHotspot);
  const basePrice = activeMaterial === 'Platinum' ? 22500 : activeMaterial === 'Rose Gold' ? 19800 : activeMaterial === 'Obsidian Steel' ? 24000 : 18450;
  const gemBonus = activeGem === 'Ceylon Sapphire' ? 3200 : 0;
  const totalPrice = basePrice + gemBonus;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div style={{ background: 'radial-gradient(circle at center, var(--color-teal-dark) 0%, var(--surface-primary) 100%)', minHeight: '100vh', width: '100vw', maxWidth: '100%', overflowX: 'hidden' }}>

      {/* Hero Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 20px 40px', width: '100%', boxSizing: 'border-box' }}
      >
        <motion.h2
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: 1.1, margin: 0 }}
        >
          Craft Your Legacy
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: '1.7', color: 'var(--text-secondary)', maxWidth: 380, margin: '20px 0 36px' }}
        >
          Bespoke artistry meets modern elegance. Design a piece that transcends time.
        </motion.p>
        <motion.a
          href="#customizer-canvas"
          variants={fadeInUp}
          className="btn-primary"
          style={{ borderRadius: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Building
        </motion.a>
      </motion.section>

      {/* Interactive Customizer Canvas */}
      <motion.section
        id="customizer-canvas"
        initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: 'relative', width: '100%', maxWidth: 500, aspectRatio: '3/4', margin: '0 auto 60px', padding: '0 20px' }}
      >
        <div style={{
          position: 'relative', width: '100%', height: '100%', borderRadius: '4px', overflow: 'hidden',
          border: '1px solid var(--border-light)', background: 'var(--surface-elevated)',
          boxShadow: 'var(--shadow-xl)',
        }}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTmXp4UxtgyYdSj3zaEQIS23Mj_DTeHFgP9c-uUZ5eJyW95AyDL9RPPSC62SOm1EtqT5Xs8H-yFFmljbyOePp7lFHLkaB9FTz9ZORNdzd4dqvHVf_cztX6W5pSLYXBGuuMHwCuDIX52mhLMvwYfNzY9QRG6NAVWquiXTWl_YDcTVI-Yw3P9JMNJx8hC-uqjb22yjdHhGkj0PF03QnBnniQ_YPkXzLUVAuLp0YH1-6e1uraI2e0Vy8Up-d9kUcRMJMbVK_U5hIlR1fB"
            alt="Luxury jewelry mannequin with full gold and diamond jewelry set"
            fill style={{ objectFit: 'cover', opacity: 0.9 }}
            sizes="(max-width: 768px) 100vw, 500px" unoptimized
          />
          {hotspots.map(spot => (
            <Hotspot key={spot.id} spot={spot} isActive={activeHotspot === spot.id} onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)} />
          ))}
          <AnimatePresence>
            {activeSpot && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--surface-glass)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', borderTop: '1px solid var(--border-light)', padding: '20px 24px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', fontWeight: 500, color: 'var(--color-gold)' }}>{activeSpot.label}</span>
                  <button onClick={() => setActiveHotspot(null)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 18, cursor: 'pointer' }}>✕</button>
                </div>
                <p style={{ fontSize: 'var(--text-body-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>{activeSpot.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Selection Panels */}
      <section style={{ maxWidth: 500, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Base Material */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: 48 }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-overline)', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>Base Material</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {materials.map(mat => {
              const isActive = activeMaterial === mat.name;
              return (
                <div key={mat.name} onClick={() => setActiveMaterial(mat.name)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', opacity: isActive ? 1 : 0.5, transition: 'opacity 0.3s ease' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', border: isActive ? '2px solid var(--color-gold)' : '1px solid var(--border-subtle)', padding: isActive ? 2 : 4, transition: 'all 0.3s ease' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: mat.color, boxShadow: isActive ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: isActive ? 'var(--color-gold)' : 'var(--text-secondary)', transition: 'color 0.3s ease' }}>{mat.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Gemstones */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: 48 }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-overline)', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>Gems & Accents</h3>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {gemstones.map(gem => {
              const isActive = activeGem === gem.name;
              return (
                <motion.div key={gem.name} onClick={() => setActiveGem(gem.name)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{ background: 'var(--surface-elevated)', border: isActive ? '2px solid var(--color-gold)' : '1px solid var(--border-subtle)', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', opacity: isActive ? 1 : 0.6, transition: 'all 0.3s ease', flex: '1 1 150px', borderRadius: '2px' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8, filter: isActive ? 'none' : 'grayscale(50%)' }}>{gem.icon}</div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: isActive ? 'var(--color-gold)' : 'var(--text-secondary)', transition: 'color 0.3s ease' }}>{gem.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Engraving */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: 48 }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-overline)', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>Custom Engraving</h3>
          <div style={{ position: 'relative' }}>
            <input type="text" value={engraving} onChange={(e) => setEngraving(e.target.value.slice(0, 12))} placeholder="ENTER INSCRIPTION..." maxLength={12}
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-light)', padding: '12px 30px 12px 0', fontSize: 18, fontFamily: 'var(--font-body)', color: 'var(--text-primary)', letterSpacing: '3px', textTransform: 'uppercase', outline: 'none', transition: 'border-color 0.3s ease' }}
              onFocus={(e) => e.target.style.borderBottomColor = 'var(--color-gold)'}
              onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-light)'}
            />
            <span style={{ position: 'absolute', right: 0, bottom: 12, color: 'var(--color-gold)', fontSize: 16 }}>✎</span>
          </div>
          <p style={{ marginTop: 8, fontSize: 'var(--text-micro)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{engraving.length}/12 characters</p>
        </motion.div>

        {/* Summary */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          style={{ background: 'var(--surface-glass)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '24px 20px', maxWidth: '100%', boxSizing: 'border-box' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 4 }}>Estimated Value</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-gold)', margin: 0 }}>₹{totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 4 }}>Delivery Est.</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-primary)', margin: 0, letterSpacing: '2px' }}>4 - 6 WEEKS</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20, padding: '12px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
            {[activeMaterial, activeGem, ...(engraving ? [`"${engraving}"`] : [])].map((tag, i) => (
              <span key={i} style={{ fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-secondary)', background: 'rgba(201, 169, 110, 0.06)', border: '1px solid var(--border-subtle)', padding: '6px 12px' }}>{tag}</span>
            ))}
          </div>
          <motion.button
            onClick={() => {
              addToCart({ id: `custom-${Date.now()}`, name: 'Custom Heritage Set', material: `${activeMaterial} · ${activeGem}${engraving ? ` · Engraved: ${engraving}` : ''}`, price: `₹${totalPrice.toLocaleString('en-IN')}`,
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTmXp4UxtgyYdSj3zaEQIS23Mj_DTeHFgP9c-uUZ5eJyW95AyDL9RPPSC62SOm1EtqT5Xs8H-yFFmljbyOePp7lFHLkaB9FTz9ZORNdzd4dqvHVf_cztX6W5pSLYXBGuuMHwCuDIX52mhLMvwYfNzY9QRG6NAVWquiXTWl_YDcTVI-Yw3P9JMNJx8hC-uqjb22yjdHhGkj0PF03QnBnniQ_YPkXzLUVAuLp0YH1-6e1uraI2e0Vy8Up-d9kUcRMJMbVK_U5hIlR1fB'
              });
              router.push('/cart');
            }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="btn-primary"
            style={{ width: '100%', borderRadius: 0, justifyContent: 'center' }}
          >
            Add to Private Collection
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
