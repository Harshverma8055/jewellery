"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMetal: string;
  selectedGem: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(11, 30, 30, 0.6)',
  border: '1px solid var(--border-light)',
  padding: '14px 18px',
  borderRadius: '2px',
  color: 'var(--text-primary)',
  fontSize: 'var(--text-body-sm)',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 0.3s ease',
};

export default function ReservationModal({ isOpen, onClose, selectedMetal, selectedGem }: ReservationModalProps) {
  const [step, setStep] = useState(1);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(5, 5, 7, 0.85)',
            backdropFilter: 'blur(15px)',
            zIndex: 10000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
              background: 'var(--surface-glass)',
              border: '1px solid var(--border-light)',
              borderRadius: '4px',
              width: '100%', maxWidth: '600px',
              padding: '50px',
              position: 'relative',
              boxShadow: 'var(--shadow-xl)',
              backdropFilter: 'blur(30px)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient glow inside modal */}
            <div style={{ position: 'absolute', top: '-50%', right: '-30%', width: '200%', height: '200%', background: 'radial-gradient(circle at top right, rgba(201, 169, 110, 0.06) 0%, transparent 50%)', pointerEvents: 'none' }} />

            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-tertiary)', fontSize: '1.5rem', cursor: 'pointer', zIndex: 10 }}
            >
              &times;
            </button>

            {step < 3 ? (
              <>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <span style={{ color: 'var(--color-gold)', letterSpacing: '5px', fontSize: 'var(--text-overline)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500 }}>Private Concierge</span>
                  <h2 style={{ fontSize: 'var(--text-h2)', color: 'var(--text-primary)', margin: '12px 0 30px 0', fontFamily: 'var(--font-display)', fontWeight: 400 }}>Reserve Masterpiece</h2>
                  
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', padding: '20px', background: 'rgba(11, 30, 30, 0.5)', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-caption)', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-body)' }}>Configuration</span>
                      <p style={{ color: 'var(--color-gold)', fontSize: '1.1rem', marginTop: '5px', fontFamily: 'var(--font-display)' }}>{selectedMetal}</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)' }}>with {selectedGem}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-caption)', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-body)' }}>Est. Price</span>
                      <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginTop: '5px', fontFamily: 'var(--font-display)' }}>₹8,50,000</p>
                    </div>
                  </div>
                </motion.div>

                <form onSubmit={handleNext}>
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)', marginBottom: '8px' }}>Full Name</label>
                          <input required type="text" style={inputStyle} placeholder="Your Name" onFocus={e => e.target.style.borderColor = 'var(--color-gold)'} onBlur={e => e.target.style.borderColor = 'var(--border-light)'} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)', marginBottom: '8px' }}>Email Address</label>
                          <input required type="email" style={inputStyle} placeholder="contact@example.com" onFocus={e => e.target.style.borderColor = 'var(--color-gold)'} onBlur={e => e.target.style.borderColor = 'var(--border-light)'} />
                        </div>
                      </div>
                      <button type="submit" className="btn-outline-gold" style={{ width: '100%', marginTop: '40px', justifyContent: 'center' }}>
                        Next Step
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)', marginBottom: '8px' }}>Phone Number</label>
                          <input required type="tel" style={inputStyle} placeholder="+91 98765 43210" onFocus={e => e.target.style.borderColor = 'var(--color-gold)'} onBlur={e => e.target.style.borderColor = 'var(--border-light)'} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)', marginBottom: '8px' }}>Preferred Boutique</label>
                          <select style={{ ...inputStyle, appearance: 'none' }}>
                            <option>Sri Ganganagar Flagship</option>
                            <option>In-Person Appointment</option>
                            <option>Home Visit Available</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '40px', justifyContent: 'center' }}>
                        Confirm Reservation
                      </button>
                    </motion.div>
                  )}
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(201, 169, 110, 0.1)', border: '2px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px auto' }}>
                  <span style={{ color: 'var(--color-gold)', fontSize: '2rem' }}>✓</span>
                </div>
                <h3 style={{ fontSize: 'var(--text-h3)', color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>Reservation Secured</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto' }}>
                  Your bespoke La Panthère reservation has been registered. Our private concierge will contact you shortly to arrange your viewing and final fitting.
                </p>
                <button onClick={onClose} className="btn-outline-gold" style={{ marginTop: '40px', padding: '12px 36px' }}>
                  Return to Showcase
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
