"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const essentialProducts = [
  { id: 'ess-1', name: 'Classic Stud Earrings', material: '18KT Gold · Diamond Solitaire', price: '₹15,000', img: '/assets/category_earrings.png' },
  { id: 'ess-2', name: 'Dainty Ring Band', material: '18KT Gold · Minimalist', price: '₹12,000', img: '/assets/category_rings.png' },
  { id: 'ess-3', name: 'Slim Gold Bangle', material: '22KT Gold · Classic', price: '₹18,000', img: '/assets/category_bangles.png' },
  { id: 'ess-4', name: 'Gold Chain Pendant', material: '18KT Gold · 16 inch', price: '₹22,000', img: '/assets/model_necklace.png' },
];

const fadeInUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function EssentialPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <main style={{ background: 'var(--surface-primary)', minHeight: '100vh' }}>
      <Navigation />

      {/* HERO */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, var(--color-teal-dark), var(--surface-primary))', paddingTop: '120px', paddingBottom: '60px' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ textAlign: 'center', maxWidth: '680px', padding: '0 30px' }}>
          <motion.p variants={fadeInUp} style={{ color: 'var(--color-gold)', letterSpacing: '6px', fontSize: 'var(--text-micro)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '16px' }}>
            Collection Essential
          </motion.p>
          <motion.h1 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '20px' }}>
            Your First Step<br /><em>into Luxury</em>
          </motion.h1>
          <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body)', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 36px', fontWeight: 300 }}>
            Timeless gold pieces, perfectly crafted for gifting, daily wear, and those who are beginning their Samaira story. Luxury made accessible.
          </motion.p>
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#essential-products" className="btn-primary">Shop Now</a>
            <Link href="/collections/signature" className="btn-outline-gold">Explore Signature</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* TIER INFO */}
      <section style={{ background: 'var(--surface-elevated)', padding: '30px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { label: 'Price Range', value: '₹10,000 – ₹50,000' },
            { label: 'Delivery', value: '7 – 14 Days' },
            { label: 'Certification', value: 'BIS Hallmarked' },
            { label: 'Perfect For', value: 'Gifting & Daily Wear' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="essential-products" style={{ padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p className="section-label">Ready to Ship</p>
            <h2 className="section-title">Essential Picks</h2>
            <div className="gold-divider"><div className="gold-divider-icon" /></div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {essentialProducts.map(product => (
              <motion.div key={product.id} variants={fadeInUp}
                style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}
                whileHover={{ y: -5, boxShadow: 'var(--shadow-card-hover)', borderColor: 'var(--border-light)' }}>
                <div style={{ position: 'relative', height: '300px', background: 'var(--color-teal-dark)' }}>
                  <Image src={product.img} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <div style={{ padding: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 400 }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>{product.material}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{product.price}</span>
                    <button className="btn-outline-gold" style={{ padding: '8px 18px', fontSize: 'var(--text-micro)' }}
                      onClick={() => { addToCart({ ...product, price: product.price }); router.push('/cart'); }}>
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UPSELL */}
      <section style={{ padding: '80px 0', background: 'var(--color-teal-midnight)', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeInUp} className="section-label">Ready to Elevate?</motion.p>
            <motion.h2 variants={fadeInUp} className="section-title">Discover the Signature Tier</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">More intricate designs, premium gemstones, and the full Samaira craftsmanship experience.</motion.p>
            <motion.div variants={fadeInUp}><Link href="/collections/signature" className="btn-primary">Explore Signature</Link></motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
