"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { name: 'High Jewelry', href: '/#bestsellers' },
  { name: 'Collections', href: '/#categories', hasDropdown: true },
  { name: 'Bridal', href: '/#bridal' },
  { name: 'Virtual Try-On', href: '/#virtual-tryon' },
  { name: 'Editorial', href: '/editorial' },
];

const collectionDropdown = [
  { name: 'Lux Collection', href: '/collections/lux', desc: 'Ultra-premium masterpieces' },
  { name: 'Signature Collection', href: '/collections/signature', desc: 'Everyday luxury' },
  { name: 'Essential Collection', href: '/collections/essential', desc: 'Entry into luxury' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { scrollY } = useScroll();
  
  const headerTop = useTransform(scrollY, [0, 50], ['35px', '0px']);
  const headerBg = useTransform(scrollY, [0, 50], ['transparent', 'rgba(11, 30, 30, 0.9)']);
  const headerBlur = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(20px)']);
  const headerBorder = useTransform(scrollY, [0, 50], ['1px solid transparent', '1px solid rgba(201, 169, 110, 0.06)']);
  const announcementY = useTransform(scrollY, [0, 50], ['0%', '-100%']);

  return (
    <>
      {/* Announcement Bar */}
      <motion.div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        background: 'var(--color-teal-dark)',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        padding: '10px 20px',
        fontSize: 'var(--text-micro)',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        borderBottom: '1px solid var(--border-subtle)',
        zIndex: 9001,
        fontFamily: 'var(--font-body)',
        fontWeight: 400,
        y: announcementY,
      }}>
        Free Insured Shipping on Orders Above <span style={{ color: 'var(--color-gold)' }}>₹50,000</span> &nbsp;·&nbsp; <span style={{ color: 'var(--color-gold)' }}>BIS Hallmarked</span>
      </motion.div>

      {/* Sticky Header */}
      <motion.header style={{
        position: 'fixed',
        top: headerTop,
        left: 0,
        width: '100%',
        padding: '20px clamp(20px, 4vw, 50px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 9000,
        backgroundColor: headerBg,
        backdropFilter: headerBlur,
        WebkitBackdropFilter: headerBlur as unknown as string,
        borderBottom: headerBorder,
      }}>
        
        {/* Left — Menu Toggle */}
        <div style={{ display: 'flex', gap: '20px', minWidth: '120px' }}>
          <button 
            onClick={() => setIsOpen(true)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontSize: 'var(--text-caption)', 
              transition: 'color 0.3s ease',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ width: '22px', height: '1px', background: 'currentColor', transition: 'all 0.3s ease' }} />
              <span style={{ width: '14px', height: '1px', background: 'currentColor', transition: 'all 0.3s ease' }} />
            </div>
            Menu
          </button>
        </div>

        {/* Center Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ 
            fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', 
            letterSpacing: '0.2em', 
            color: 'var(--text-primary)', 
            textTransform: 'uppercase', 
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
          }}>
            Samaira by MKM
          </div>
        </Link>

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '22px', color: 'var(--text-primary)', minWidth: '120px', justifyContent: 'flex-end' }}>
          <Search 
            size={20} 
            style={{ cursor: 'pointer', transition: 'color 0.3s ease' }} 
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} 
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'} 
          />
          <Link href="/auth" style={{ color: 'inherit', display: 'flex' }}>
            <User 
              size={20} 
              style={{ cursor: 'pointer', transition: 'color 0.3s ease' }} 
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} 
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'} 
            />
          </Link>
          <Link href="/cart" style={{ color: 'inherit', display: 'flex' }}>
            <ShoppingBag 
              size={20} 
              style={{ cursor: 'pointer', transition: 'color 0.3s ease' }} 
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} 
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'} 
            />
          </Link>
        </div>
      </motion.header>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(11, 30, 30, 0.98)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(30px, 5vw, 50px)',
            }}
          >
            {/* Menu Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ 
                fontSize: '1.8rem', 
                letterSpacing: '0.2em', 
                color: 'var(--color-gold)', 
                textTransform: 'uppercase', 
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
              }}>
                Samaira by MKM
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.9rem', 
                  cursor: 'pointer', 
                  textTransform: 'uppercase', 
                  letterSpacing: '3px', 
                  transition: 'color 0.3s ease',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Close
              </button>
            </div>

            {/* Menu Links */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center' }}>
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setShowDropdown(!showDropdown)}
                          style={{ 
                            color: 'var(--text-primary)', 
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                            fontFamily: 'var(--font-display)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            transition: 'all 0.4s ease',
                            background: 'none',
                            border: 'none',
                            display: 'inline-block',
                            fontWeight: 300,
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; }}
                          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                        >
                          {item.name}
                        </button>
                        
                        <AnimatePresence>
                          {showDropdown && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}
                            >
                              {collectionDropdown.map((col) => (
                                <Link
                                  key={col.name}
                                  href={col.href}
                                  onClick={() => setIsOpen(false)}
                                  style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '1rem',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 400,
                                  }}
                                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                  {col.name}
                                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '1px', marginTop: '2px', fontWeight: 300 }}>
                                    {col.desc}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link 
                        href={item.href} 
                        onClick={() => setIsOpen(false)}
                        style={{ 
                          color: 'var(--text-primary)', 
                          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                          fontFamily: 'var(--font-display)',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          transition: 'all 0.4s ease',
                          display: 'inline-block',
                          fontWeight: 300,
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = 'var(--color-gold)';
                          e.currentTarget.style.transform = 'translateX(15px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = 'var(--text-primary)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                color: 'var(--text-tertiary)', 
                fontSize: 'var(--text-caption)', 
                textTransform: 'uppercase', 
                letterSpacing: '3px',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span>Sri Ganganagar, Rajasthan</span>
              <span>© {new Date().getFullYear()} Samaira by MKM</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
