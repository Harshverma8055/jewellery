"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const luxProducts = [
  { id: 'lux-1', name: 'Wave Solitaire Ring', material: '18KT Rose Gold · Natural Sapphire · Pearl Pavé Halo', price: '₹1,10,000', badge: 'Signature Piece', img: '/assets/ui_ring_m1.png' },
  { id: 'lux-2', name: 'Meenakari Pendant Set', material: '22KT Gold · Sapphire · Ruby · Emerald · Multi-stone Enamel', price: '₹1,45,000', badge: 'Heirloom', img: '/assets/ui_tjm_2.png' },
  { id: 'lux-3', name: 'Shri Ganesh Diamond Pendant', material: '22KT Gold · Diamond Halo · Auspicious Heritage Design', price: '₹85,000', badge: 'Devotional Lux', img: '/assets/ui_lotus.png' },
  { id: 'lux-4', name: 'Tirupati Balaji Gold Idol', material: '22KT Gold · Diamond Arch · Diamond Studs · Collector\'s Edition', price: '₹3,50,000', badge: 'One of a Kind', img: '/assets/ui_tjm_1.png' },
];

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

export default function LuxPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <main style={{ background: 'var(--surface-primary)', minHeight: '100vh' }}>
      <Navigation />

      {/* CINEMATIC HERO */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', paddingBottom: '10vh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(26, 58, 58, 0.4) 0%, var(--color-obsidian) 70%)' }} />
        <motion.div style={{ position: 'absolute', top: '20%', right: '8%', width: '45%', height: '60%', opacity: 0.12 }}
          animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
          <Image src="/assets/panther_ring_prototype.png" alt="Lux hero" fill style={{ objectFit: 'contain' }} />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', padding: '0 30px' }}>
          <motion.p variants={fadeInUp} style={{ color: 'var(--color-gold)', letterSpacing: '8px', fontSize: 'var(--text-micro)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '20px' }}>
            Collection Lux · Since 1995
          </motion.p>
          <motion.h1 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '0.02em' }}>
            Absolute<br /><em>Masterpieces</em>
          </motion.h1>
          <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 40px', fontWeight: 300 }}>
            The pinnacle of Samaira craftsmanship. One-of-a-kind heirloom pieces where every diamond is hand-selected, every curve sculpted by master artisans with decades of devotion.
          </motion.p>
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#lux-collection" className="btn-primary">Explore Masterpieces</a>
            <Link href="/editorial" className="btn-outline-gold">View Editorial</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* TIER BADGE */}
      <section style={{ background: 'var(--color-teal-midnight)', padding: '30px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { label: 'Starting From', value: '₹5,00,000' },
            { label: 'Delivery', value: 'White Glove · 6–8 Weeks' },
            { label: 'Certification', value: 'GIA · IGI · BIS' },
            { label: 'Guarantee', value: 'Lifetime Authenticity' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="lux-collection" style={{ padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '70px' }}>
            <p className="section-label">The Collection</p>
            <h2 className="section-title">Lux Masterpieces</h2>
            <div className="gold-divider"><div className="gold-divider-icon" /></div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {luxProducts.map(product => (
              <motion.div key={product.id} variants={fadeInUp}
                style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '4px', overflow: 'hidden', transition: 'all 0.5s ease' }}
                whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,169,110,0.1)', borderColor: 'var(--border-medium)' }}>
                <div style={{ position: 'relative', height: '420px', background: 'linear-gradient(145deg, var(--color-teal-dark), var(--surface-primary))' }}>
                  <Image src={product.img} alt={product.name} fill style={{ objectFit: 'contain', padding: '30px' }} sizes="(max-width: 768px) 100vw, 33vw" />
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--color-gold)', color: 'var(--text-on-gold)', padding: '5px 14px', fontSize: 'var(--text-micro)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                    {product.badge}
                  </div>
                </div>
                <div style={{ padding: '28px 24px', borderTop: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 400 }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>{product.material}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '1.15rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{product.price}</span>
                    <button className="btn-outline-gold" style={{ padding: '10px 24px', fontSize: 'var(--text-micro)' }}
                      onClick={() => { addToCart({ ...product, price: product.price }); router.push('/cart'); }}>
                      Reserve
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CRAFTSMANSHIP CALLOUT */}
      <section style={{ padding: 'var(--section-padding) 0', background: 'var(--color-teal-midnight)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(201, 169, 110, 0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeInUp} className="section-label">Bespoke Service</motion.p>
            <motion.h2 variants={fadeInUp} className="section-title" style={{ fontSize: 'var(--text-h1)' }}>Commission Your Own Legend</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">Every Lux piece can be fully customised. Work directly with our Head Artisan to create a unique heirloom that carries your story for generations.</motion.p>
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
              <Link href="/auth" className="btn-primary">Begin Private Commission</Link>
              <a href="https://wa.me/918696806806" target="_blank" rel="noreferrer" className="btn-outline-gold">Speak to a Gemologist</a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
