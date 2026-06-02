"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

const editorials = [
  {
    issue: 'Issue No. 01',
    category: 'Heritage',
    title: 'The Hands That Shape Eternity',
    subtitle: 'A portrait of our master artisans and thirty years of golden devotion.',
    img: '/assets/jewelry_craftsman.png',
    layout: 'full',
  },
  {
    issue: 'Issue No. 02',
    category: 'Campaign',
    title: 'La Panthère Awakens',
    subtitle: 'The story behind Samaira\'s most iconic creation — power, elegance, and raw beauty captured in 18K gold.',
    img: '/assets/panther_ring_prototype.png',
    layout: 'left',
  },
  {
    issue: 'Issue No. 03',
    category: 'Bridal',
    title: 'The Sacred Trousseau',
    subtitle: 'Inside the making of India\'s most coveted bridal sets. Six months. One masterpiece.',
    img: '/assets/model_bridal_full.png',
    layout: 'right',
  },
  {
    issue: 'Issue No. 04',
    category: 'Design Notes',
    title: 'Where Nature Meets Gold',
    subtitle: 'How the Japanese philosophy of Wabi-Sabi inspired our Lotus Pond Collection.',
    img: '/assets/collection_banner.png',
    layout: 'left',
  },
];

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <div ref={ref} style={{ position: 'absolute', inset: '-10%', overflow: 'hidden' }}>
      <motion.div style={{ y, width: '100%', height: '120%', position: 'relative' }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} sizes="100vw" />
      </motion.div>
    </div>
  );
}

export default function EditorialPage() {
  return (
    <main style={{ background: 'var(--surface-primary)', minHeight: '100vh' }}>
      <Navigation />

      {/* MAGAZINE MASTHEAD */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingBottom: '12vh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,7,0.3) 0%, rgba(11,30,30,0.7) 60%, var(--surface-primary) 100%)' }} />
        <ParallaxImage src="/assets/model_necklace.png" alt="Editorial Cover" />

        <motion.div initial="hidden" animate="visible" variants={stagger}
          style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', padding: '0 30px' }}>
          <motion.div variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{ height: '1px', width: '60px', background: 'var(--color-gold)', opacity: 0.5 }} />
            <span style={{ color: 'var(--color-gold)', letterSpacing: '6px', fontSize: 'var(--text-micro)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              The Samaira Journal
            </span>
            <div style={{ height: '1px', width: '60px', background: 'var(--color-gold)', opacity: 0.5 }} />
          </motion.div>

          <motion.h1 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 9vw, 8rem)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '20px', letterSpacing: '-0.01em' }}>
            L&apos;Éternité
          </motion.h1>

          <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 40px', fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 300 }}>
            &ldquo;Stories of gold, gemstones, and the human hands that transform raw beauty into eternal art.&rdquo;
          </motion.p>

          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#stories" className="btn-primary">Read the Stories</a>
            <Link href="/collections/lux" className="btn-outline-gold">Shop the Editorial</Link>
          </motion.div>

          <motion.p variants={fadeInUp} style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '50px', fontFamily: 'var(--font-body)' }}>
            Scroll to Explore
          </motion.p>
        </motion.div>
      </section>

      {/* EDITORIAL STORIES */}
      <section id="stories">
        {editorials.map((ed, i) => (
          <article key={ed.issue}
            style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderTop: '1px solid var(--border-subtle)' }}>
            
            {/* Background Image */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <Image src={ed.img} alt={ed.title} fill style={{ objectFit: 'cover', opacity: 0.2, filter: 'grayscale(30%)' }} sizes="100vw" />
              <div style={{ position: 'absolute', inset: 0, background: ed.layout === 'right' ? 'linear-gradient(to left, var(--surface-primary) 40%, transparent 100%)' : 'linear-gradient(to right, var(--surface-primary) 40%, transparent 100%)' }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2, padding: 'var(--section-padding) var(--container-padding)' }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                style={{ maxWidth: '560px', marginLeft: ed.layout === 'right' ? 'auto' : '0', textAlign: ed.layout === 'right' ? 'right' : 'left' }}>
                <motion.div variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', justifyContent: ed.layout === 'right' ? 'flex-end' : 'flex-start' }}>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>{ed.issue}</span>
                  <span style={{ width: '1px', height: '12px', background: 'var(--border-medium)' }} />
                  <span style={{ color: 'var(--color-gold)', fontSize: 'var(--text-micro)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{ed.category}</span>
                </motion.div>

                <motion.h2 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
                  {ed.title}
                </motion.h2>

                <motion.p variants={fadeInUp} style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '36px', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300 }}>
                  {ed.subtitle}
                </motion.p>

                <motion.div variants={fadeInUp}>
                  <button className="btn-outline-gold" style={{ padding: '12px 32px' }}>Read Story</button>
                </motion.div>
              </motion.div>
            </div>

            {/* Large Issue Number */}
            <div style={{ position: 'absolute', bottom: '-40px', right: ed.layout === 'right' ? 'auto' : '5%', left: ed.layout === 'right' ? '5%' : 'auto', fontSize: 'clamp(8rem, 15vw, 18rem)', fontFamily: 'var(--font-display)', color: 'rgba(201, 169, 110, 0.04)', fontWeight: 300, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
          </article>
        ))}
      </section>

      {/* ABOUT THE JOURNAL */}
      <section style={{ padding: 'var(--section-padding) 0', background: 'var(--color-teal-midnight)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201, 169, 110, 0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeInUp} className="section-label">The Philosophy</motion.p>
            <motion.h2 variants={fadeInUp} className="section-title" style={{ fontSize: 'var(--text-h1)' }}>Beyond Jewelry.<br />A Way of Life.</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle" style={{ maxWidth: '680px' }}>
              The Samaira Journal is our love letter to craft, beauty, and the stories behind each extraordinary piece. Every issue invites you deeper into the world of artisanal luxury — the hands, the heritage, and the heart that goes into every gram of gold.
            </motion.p>
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
              <Link href="/" className="btn-primary">Return to Boutique</Link>
              <Link href="/collections/lux" className="btn-outline-gold">Explore Collections</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
