"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./checkout.module.css";
import Navigation from "@/components/Navigation";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      clearCart();
      alert("Order placed successfully! A confirmation email will be sent.");
      router.push("/");
    }, 2000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <main>
        <Navigation />
        <div className={styles.checkoutContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 className={styles.title}>Your Cart is Empty</h2>
            <button onClick={() => router.push("/")} className="btn-primary">Return to Collection</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navigation />
      
      <div className={styles.checkoutContainer}>
        <div className={styles.content}>
          <motion.h1 
            className={styles.title}
            initial="hidden" animate="visible" variants={fadeInUp}
          >
            Secure Checkout
          </motion.h1>

          <form onSubmit={handleCheckout} className={styles.checkoutLayout}>
            <motion.div 
              className={styles.checkoutForm}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.formSection}>
                <h3 className={styles.formSectionTitle}>Shipping Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>First Name</label>
                    <input type="text" required placeholder="Aria" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Last Name</label>
                    <input type="text" required placeholder="Sharma" />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label>Email Address</label>
                    <input type="email" required placeholder="aria.sharma@example.com" />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label>Address</label>
                    <input type="text" required placeholder="123 Luxury Lane" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>City</label>
                    <input type="text" required placeholder="Mumbai" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Postal Code</label>
                    <input type="text" required placeholder="400001" />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3 className={styles.formSectionTitle}>Payment Method</h3>
                <div className={styles.formGrid}>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label>Card Number</label>
                    <input type="text" required placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Expiry Date</label>
                    <input type="text" required placeholder="MM/YY" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>CVV</label>
                    <input type="text" required placeholder="123" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.summary}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className={styles.summaryTitle}>Order Review</h3>
              
              <div className={styles.summaryItems}>
                {items.map(item => (
                  <div key={item.id} className={styles.summaryItem}>
                    <div className={styles.itemImageWrapper}>
                      <Image src={item.img} alt={item.name} fill style={{ objectFit: 'contain', padding: '5px' }} />
                    </div>
                    <div className={styles.itemInfo}>
                      <h4>{item.name}</h4>
                      <span className={styles.itemQty}>Qty: {item.quantity}</span>
                    </div>
                    <div>₹{(parseInt(item.price.replace(/[^0-9]/g, ''), 10) * item.quantity).toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              
              <button 
                type="submit" 
                className={`btn-primary ${styles.payBtn}`}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </motion.div>
          </form>
        </div>
      </div>
    </main>
  );
}
