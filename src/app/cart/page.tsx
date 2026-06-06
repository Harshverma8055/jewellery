"use client";

import { useCart } from "@/context/CartContext";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./cart.module.css";
import Navigation from "@/components/Navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { scrollYProgress } = useScroll();
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main>
      <Navigation />
      
      <div className={styles.cartContainer}>
        {/* Marquee Background */}
        <div className={styles.marqueeWrapper}>
          <motion.div style={{ x: marqueeX, display: "flex", gap: "2rem" }}>
            <span className={styles.marqueeText}>SAMAIRA BY MKM · LUXURY · EXCLUSIVE · SAMAIRA BY MKM · LUXURY · EXCLUSIVE · </span>
          </motion.div>
        </div>

        <div className={styles.content}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span>Your Selection</span>
            The Trousseau
          </motion.h1>

          {items.length === 0 ? (
            <motion.div 
              className={styles.emptyCart}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3>Your cart is empty</h3>
              <p>Discover our exclusive collection to begin your journey.</p>
              <Link href="/" className={`btn-primary ${styles.continueBtn}`}>
                Explore Collection
              </Link>
            </motion.div>
          ) : (
            <div className={styles.cartLayout}>
              <motion.div 
                className={styles.cartItems}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {items.map((item) => (
                  <motion.div key={item.id} className={styles.cartItem} variants={itemVariants}>
                    <div className={styles.itemImageWrapper}>
                      <Image src={item.img} alt={item.name} fill style={{ objectFit: 'contain', padding: '10px' }} />
                    </div>
                    <div className={styles.itemInfo}>
                      <h3>{item.name}</h3>
                      <p className={styles.itemMaterial}>{item.material}</p>
                      <div className={styles.quantityControls}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.qtyBtn}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.qtyBtn}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>Remove</button>
                    </div>
                    <div className={styles.itemPrice}>
                      ₹{(parseInt(item.price.replace(/[^0-9]/g, ''), 10) * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className={styles.summary}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className={styles.summaryTitle}>Order Summary</h3>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Insured Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <Link href="/checkout" className={`btn-primary ${styles.checkoutBtn}`}>
                  Proceed to Checkout
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
