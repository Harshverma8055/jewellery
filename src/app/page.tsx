"use client";

import Image from 'next/image';
import { Heart, MessageCircle, ShieldCheck, Truck, Award, Star, AtSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import VirtualTryOn from '@/components/VirtualTryOn';
import PantherShowcase from '@/components/PantherShowcase';
import PantherOnModel from '@/components/PantherOnModel';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const ModelViewerModal = dynamic(() => import('@/components/ModelViewerModal'), { ssr: false });

const products = [
  { id: 1, name: 'Wave Solitaire Ring', material: '18KT Rose Gold & Platinum · Sapphire · Pearl Pavé', price: '₹1,10,000', oldPrice: '', badge: 'New', img: '/assets/ui_ring_m1.png', modelUrl: '/assets/models/ring-m1.glb' },
  { id: 2, name: 'Peacock Feather Pendant', material: '18KT Rose Gold · Blue Topaz · Diamond Accents', price: '₹65,000', oldPrice: '₹72,000', badge: 'Bestseller', img: '/assets/ui_feather.png', modelUrl: '/assets/models/feather-pendant.glb' },
  { id: 3, name: 'Meenakari Pendant Set', material: '22KT Gold · Sapphire · Ruby · Emerald · Enamel', price: '₹1,45,000', oldPrice: '₹1,65,000', badge: 'Heirloom', img: '/assets/ui_tjm_2.png', modelUrl: '/assets/models/lotus-pendant.glb' },
  { id: 4, name: 'Shri Ganesh Pendant', material: '22KT Gold · Diamond Halo · Auspicious Design', price: '₹85,000', oldPrice: '', badge: 'Trending', img: '/assets/ui_lotus.png', modelUrl: '/assets/models/tjm-1.glb' },
  { id: 5, name: 'Tirupati Balaji Idol', material: '22KT Gold · Diamond Arch · Collector\'s Edition', price: '₹3,50,000', oldPrice: '', badge: 'Exclusive', img: '/assets/ui_tjm_1.png', modelUrl: '/assets/models/tjm-2.glb' },
];

const testimonials = [
  { name: 'Priya Sharma', location: 'Sri Ganganagar', text: 'The bridal set I purchased was absolutely breathtaking. Every piece reflected the craftsmanship and heritage that Samaira promises. My wedding photos look like royalty.' },
  { name: 'Ananya Reddy', location: 'Jaipur', text: 'I have been a loyal customer for 3 years now. The quality of gold and the intricate designs are unmatched. Their customer service is truly world-class.' },
  { name: 'Meera Patel', location: 'Bikaner', text: 'From engagement rings to anniversary gifts, Samaira has been my go-to. The hallmark certification gives me complete confidence in every purchase.' },
];

const categories = [
  { name: 'Rings', count: '248 Designs', img: '/assets/category_rings.png' },
  { name: 'Necklaces', count: '186 Designs', img: '/assets/model_necklace.png' },
  { name: 'Earrings', count: '312 Designs', img: '/assets/category_earrings.png' },
  { name: 'Bangles', count: '154 Designs', img: '/assets/category_bangles.png' },
];

const instagramImages = [
  '/assets/model_necklace.png', '/assets/category_earrings.png', '/assets/model_ring.png',
  '/assets/model_bridal_full.png', '/assets/product_necklace.png', '/assets/category_rings.png',
];

const craftsmanshipSteps = [
  { step: '01', title: 'Design', desc: 'Master artisans sketch every curve and facet by hand, merging heritage techniques with modern precision.' },
  { step: '02', title: 'Casting', desc: 'Molten 22KT gold is carefully poured into hand-carved wax molds, forming the foundation of each piece.' },
  { step: '03', title: 'Setting', desc: 'Each gemstone is individually placed and secured by hand under 40x magnification.' },
  { step: '04', title: 'Polishing', desc: 'Seven stages of hand-polishing bring out the mirror finish and eternal brilliance.' },
];

const pressNames = ['Vogue India', 'GQ', 'Harper\'s Bazaar', 'Elle', 'Architectural Digest', 'Femina'];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function Home() {
  const [active3DModel, setActive3DModel] = useState<{ url: string, name: string } | null>(null);
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof products[number]) => {
    addToCart(product);
    router.push('/cart');
  };

  return (
    <main>
      <Navigation />
      <PantherShowcase />
      <PantherOnModel />

      <section id="virtual-tryon">
        <VirtualTryOn />
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" style={{ padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="section-label">Curated For You</p>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our exquisite range of handcrafted jewellery, each piece telling a unique story of artistry and heritage.</p>
            <div className="gold-divider"><div className="gold-divider-icon" /></div>
          </motion.div>
          <motion.div className={styles.categoryGrid} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={fadeInUp} className={styles.categoryCard}>
                <Image src={cat.img} alt={cat.name} fill className={styles.categoryImg} sizes="(max-width: 768px) 50vw, 25vw" />
                <div className={styles.categoryOverlay}>
                  <span className={styles.categoryName}>{cat.name}</span>
                  <span className={styles.categoryCount}>{cat.count}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COLLECTION BANNER ── */}
      <section className={styles.collectionBanner}>
        <Image src="/assets/collection_banner.png" alt="Complete Bridal Set" fill className={styles.collectionBannerImg} sizes="100vw" />
        <div className={styles.collectionBannerOverlay} />
        <motion.div className={styles.collectionBannerContent} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.h2 variants={fadeInUp}>The Samaira Bridal Trousseau</motion.h2>
          <motion.p variants={fadeInUp}>Necklace · Earrings · Bangles · Ring — crafted as one, cherished forever.</motion.p>
          <motion.button variants={fadeInUp} className="btn-primary"
            onClick={() => { addToCart({ id: `set-bridal-${Date.now()}`, name: 'The Samaira Bridal Trousseau', material: 'Complete Set', price: '₹15,00,000', img: '/assets/collection_banner.png' }); router.push('/cart'); }}
          >Shop The Set</motion.button>
        </motion.div>
      </section>

      {/* ── BRIDAL SHOWCASE ── */}
      <section id="bridal" className={styles.bridalShowcase}>
        <motion.div className={styles.showcaseContent} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <span className={styles.showcaseLabel}>Exclusive Bridal</span>
          <h2 className={styles.showcaseTitle}>The Samaira<br />Legacy Collection</h2>
          <p className={styles.showcaseText}>Embrace sacred traditions with our exclusive bridal trousseau. Every piece is meticulously handcrafted by master artisans to make you shine on your most important day.</p>
          <button className="btn-outline-gold">View Bridal Collection</button>
        </motion.div>
        <div className={styles.showcaseImage}>
          <Image src="/assets/bridal_showcase.png" alt="Bridal Collection" fill sizes="50vw" />
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section id="bestsellers" style={{ padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="section-label">Most Loved</p>
            <h2 className="section-title">Trending Bestsellers</h2>
            <p className="section-subtitle">Our most cherished masterpieces, loved by thousands of happy customers across India.</p>
            <div className="gold-divider"><div className="gold-divider-icon" /></div>
          </motion.div>
          <motion.div className={styles.productGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeInUp} className={styles.productCard}>
                <div className={styles.productImgWrapper}>
                  <Image src={product.img} alt={product.name} fill className={styles.productImg} sizes="(max-width: 768px) 50vw, 25vw" />
                  {product.badge && <span className={styles.productBadge}>{product.badge}</span>}
                  <button className={styles.productWishlist} aria-label="Add to Wishlist"><Heart size={16} /></button>
                  <div className={styles.productActions}>
                    <button className={`${styles.actionBtn} ${styles.addCartBtn}`} onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <button className={`${styles.actionBtn} ${styles.quickViewBtn}`} onClick={() => setActive3DModel({ url: product.modelUrl, name: product.name })}>View in 3D ✦</button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productMaterial}>{product.material}</p>
                  <span className={styles.productPrice}>{product.price}{product.oldPrice && <span className={styles.productPriceOld}>{product.oldPrice}</span>}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CRAFTSMANSHIP TIMELINE ── */}
      <section style={{ padding: 'var(--section-padding) 0', background: 'var(--surface-primary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(26, 58, 58, 0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            style={{ flex: '1 1 480px', position: 'relative', height: '600px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <Image src="/assets/jewelry_craftsman.png" alt="Master Jeweler" fill style={{ objectFit: 'cover', filter: 'brightness(0.8) contrast(1.05)' }} sizes="(max-width: 1024px) 100vw, 50vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 50%, var(--surface-primary))' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} style={{ flex: '1 1 400px' }}>
            <p className="section-label" style={{ textAlign: 'left' }}>Master Craftsmanship</p>
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: 'var(--text-h1)' }}>Forged in Heritage.<br />Refined by Tech.</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '20px 0 40px', maxWidth: '100%' }}>Every curve, every diamond setting is meticulously handcrafted by our master artisans with decades of heritage.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {craftsmanshipSteps.map((s, i) => (
                <motion.div key={s.step} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.6 }}
                  style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', color: 'var(--color-gold)', opacity: 0.4, fontWeight: 300, minWidth: '40px' }}>{s.step}</span>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 500 }}>{s.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)', lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className={styles.trustSection}>
        <div className="container">
          <motion.div className={styles.trustGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {[
              { icon: <ShieldCheck size={36} />, title: 'BIS Hallmarked', desc: '100% certified pure gold' },
              { icon: <Truck size={36} />, title: 'Insured Shipping', desc: 'Safe & secure delivery' },
              { icon: <Award size={36} />, title: 'Lifetime Exchange', desc: 'Guaranteed value forever' },
              { icon: <Heart size={36} />, title: '10L+ Happy Customers', desc: 'Trusted since 1995' },
            ].map(item => (
              <motion.div key={item.title} variants={fadeInUp} className={styles.trustItem}>
                <div className={styles.trustIcon}>{item.icon}</div>
                <h4 className={styles.trustTitle}>{item.title}</h4>
                <p className={styles.trustDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRESS MENTIONS ── */}
      <section className={styles.pressSection}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="section-label">As Featured In</p>
          </motion.div>
          <motion.div className={styles.pressGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {pressNames.map(name => (
              <motion.span key={name} variants={fadeInUp} className={styles.pressItem}>{name}</motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="section-label">Testimonials</p>
            <h2 className="section-title">What Our Customers Say</h2>
            <div className="gold-divider"><div className="gold-divider-icon" /></div>
          </motion.div>
          <motion.div className={styles.testimonialGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeInUp} className={styles.testimonialCard}>
                <div className={styles.testimonialQuote}>&ldquo;</div>
                <div className={styles.testimonialStars}>{[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#C9A96E" stroke="#C9A96E" />)}</div>
                <p className={styles.testimonialText}>{t.text}</p>
                <p className={styles.testimonialAuthor}>{t.name}</p>
                <p className={styles.testimonialLocation}>{t.location}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONCIERGE ── */}
      <section className={styles.conciergeSection}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.p variants={fadeInUp} className="section-label">Private Concierge</motion.p>
            <motion.h2 variants={fadeInUp} className="section-title" style={{ fontSize: 'var(--text-h1)' }}>Your Personal Jewelry Advisor</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">Schedule a private consultation with our expert gemologists. Experience bespoke luxury from the comfort of your home.</motion.p>
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
              <button className="btn-primary">Book Appointment</button>
              <a href="https://wa.me/918696806806" target="_blank" rel="noreferrer" className="btn-outline-gold">Chat on WhatsApp</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── UNBOXING ── */}
      <section style={{ padding: 'var(--section-padding) 0', background: 'var(--surface-primary)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '60px' }}>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} style={{ flex: '1 1 400px' }}>
            <p className="section-label" style={{ textAlign: 'left' }}>The Final Touch</p>
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: 'var(--text-h1)' }}>The Samaira Unboxing</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '20px 0 30px', maxWidth: '100%' }}>Your dream jewelry arrives in our signature velvet casing, sealed with luxury. Every piece includes a certified blockchain authenticity card.</p>
            <button className="btn-primary"
              onClick={() => { addToCart({ id: `gift-${Date.now()}`, name: 'Signature Gift Box', material: 'Curated Heritage Selection', price: '₹5,00,000', img: '/assets/luxury_packaging.png' }); router.push('/cart'); }}
            >Gift a Masterpiece</button>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            style={{ flex: '1 1 480px', position: 'relative', height: '550px', borderRadius: '4px', overflow: 'hidden', boxShadow: 'var(--shadow-gold)', border: '1px solid var(--border-subtle)' }}>
            <Image src="/assets/luxury_packaging.png" alt="Luxury Packaging" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className={styles.instagramSection}>
        <div className="container" style={{ marginBottom: 40 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="section-label">Follow Us</p>
            <h2 className="section-title">@samaira.jewellers</h2>
          </motion.div>
        </div>
        <div className={styles.instagramGrid}>
          {instagramImages.map((img, i) => (
            <div key={i} className={styles.instagramItem}>
              <Image src={img} alt="Instagram" fill sizes="(max-width: 768px) 33vw, 16vw" />
              <div className={styles.instagramOverlay}><AtSign size={24} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerLogo}>Samaira by MKM</div>
              <p className={styles.footerDesc}>Crafting timeless elegance and preserving heritage through exquisite jewellery designs. Every piece is a masterpiece, every moment is golden.</p>
            </div>
            <div>
              <h5 className={styles.footerTitle}>Quick Links</h5>
              <ul className={styles.footerLinks}>
                <li><a href="#">About Us</a></li>
                <li><Link href="/collections/lux">Lux Collection</Link></li>
                <li><Link href="/collections/signature">Signature Collection</Link></li>
                <li><Link href="/editorial">Editorial</Link></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h5 className={styles.footerTitle}>Policies</h5>
              <ul className={styles.footerLinks}>
                <li><a href="#">Return Policy</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className={styles.footerNewsletter}>
              <h5 className={styles.footerTitle}>Contact Us</h5>
              <p>Sri Ganganagar, Rajasthan</p>
              <p style={{ marginTop: '10px' }}><a href="tel:8696806806" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>+91 8696806806</a></p>
              <p style={{ marginTop: '5px' }}><a href="mailto:mitalikhemka806@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>mitalikhemka806@gmail.com</a></p>
            </div>
          </div>
          <div className={styles.footerBottom}>&copy; {new Date().getFullYear()} Samaira by MKM Jewellers Pvt. Ltd. &nbsp;·&nbsp; All Rights Reserved &nbsp;·&nbsp; BIS Hallmark Licensed</div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a href="https://wa.me/918696806806" target="_blank" rel="noreferrer" className={styles.whatsappFloat} aria-label="Chat on WhatsApp">
        <MessageCircle size={28} />
      </a>

      {/* 3D Model Modal */}
      {active3DModel && (
        <ModelViewerModal isOpen={!!active3DModel} onClose={() => setActive3DModel(null)} modelUrl={active3DModel.url} productName={active3DModel.name} />
      )}
    </main>
  );
}
