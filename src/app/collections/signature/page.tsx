"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const signatureProducts = [
  { id: 'sig-1', name: 'Wave Solitaire Ring', material: '18KT Rose Gold & Platinum · Sapphire · Pearl Pavé', price: '₹1,10,000', badge: 'New Arrival', img: '/assets/ui_ring_m1.png' },
  { id: 'sig-2', name: 'Peacock Feather Pendant', material: '18KT Rose Gold · Blue Topaz · Diamond Accents', price: '₹65,000', badge: 'Bestseller', img: '/assets/ui_feather.png' },
  { id: 'sig-3', name: 'Meenakari Pendant Set', material: '22KT Gold · Sapphire · Ruby · Emerald · Enamel', price: '₹1,45,000', badge: 'Heirloom', img: '/assets/ui_tjm_2.png' },
  { id: 'sig-4', name: 'Shri Ganesh Pendant', material: '22KT Gold · Diamond Halo · Auspicious Design', price: '₹85,000', badge: 'Trending', img: '/assets/ui_lotus.png' },
  { id: 'sig-5', name: 'Tirupati Balaji Idol', material: '22KT Gold · Diamond Arch · Collector\'s Edition', price: '₹3,50,000', badge: 'Exclusive', img: '/assets/ui_tjm_1.png' },
  { id: 'sig-6', name: 'Cascade Drop Earrings', material: '18KT Gold · Polki Diamonds', price: '₹72,000', badge: '', img: '/assets/category_earrings.png' },
];

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function SignaturePage() {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <main style={{ background: 'var(--surface-primary)', minHeight: '100vh' }}>
      <Navigation />

      {/* HERO */}
      <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '100px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--color-teal-dark) 0%, var(--surface-primary) 60%)' }} />
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '720px', padding: '0 30px' }}>
          <motion.p variants={fadeInUp} style={{ color: 'var(--color-gold)', letterSpacing: '6px', fontSize: 'var(--text-micro)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '16px' }}>
            Collection Signature
          </motion.p>
          <motion.h1 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '20px' }}>
            Crafted for the<br /><em>Everyday Extraordinary</em>
          </motion.h1>
          <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body)', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 36px', fontWeight: 300 }}>
            Heritage craftsmanship for modern life. Premium enough to treasure, wearable enough to love every single day.
          </motion.p>
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#signature-products" className="btn-primary">Shop Collection</a>
            <Link href="/collections/lux" className="btn-outline-gold">Explore Lux Tier</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* TIER INFO */}
      <section style={{ background: 'var(--surface-elevated)', padding: '30px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { label: 'Price Range', value: '₹50,000 – ₹2,00,000' },
            { label: 'Delivery', value: '3 – 5 Weeks' },
            { label: 'Certification', value: 'BIS Hallmarked' },
            { label: 'Warranty', value: '3-Year Craftsmanship' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="signature-products" style={{ padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p className="section-label">Signature Designs</p>
            <h2 className="section-title">The Collection</h2>
            <div className="gold-divider"><div className="gold-divider-icon" /></div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {signatureProducts.map(product => (
              <motion.div key={product.id} variants={fadeInUp}
                style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-card-hover)', borderColor: 'var(--border-light)' }}>
                <div style={{ position: 'relative', height: '340px', background: 'var(--color-teal-dark)' }}>
                  <Image src={product.img} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                  {product.badge && (
                    <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--color-gold)', color: 'var(--text-on-gold)', padding: '4px 12px', fontSize: 'var(--text-micro)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{ padding: '24px 20px', borderTop: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 400 }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>{product.material}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{product.price}</span>
                    <button className="btn-outline-gold" style={{ padding: '9px 20px', fontSize: 'var(--text-micro)' }}
                      onClick={() => { addToCart({ ...product, price: product.price }); router.push('/cart'); }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UPSELL */}
      <section style={{ padding: 'var(--section-padding) 0', background: 'var(--color-teal-midnight)', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeInUp} className="section-label">Step Up</motion.p>
            <motion.h2 variants={fadeInUp} className="section-title">Aspire to the Extraordinary</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">Discover heirloom one-of-a-kind creations in our Lux tier — where no two pieces are ever the same.</motion.p>
            <motion.div variants={fadeInUp}><Link href="/collections/lux" className="btn-primary">Explore Lux Collection</Link></motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
