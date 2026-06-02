"use client";

import React, { Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center, ContactShadows, Html, useProgress, Bounds } from '@react-three/drei';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: 'var(--color-gold)', fontSize: '1rem', fontFamily: 'var(--font-display)',
        letterSpacing: '3px', textTransform: 'uppercase',
        background: 'var(--surface-glass)', padding: '10px 24px',
        border: '1px solid var(--border-light)', backdropFilter: 'blur(10px)', whiteSpace: 'nowrap'
      }}>
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

const MODEL_CONFIG: Record<string, { rotation?: [number, number, number], scale?: number }> = {
  '/assets/models/tjm-1.glb': { rotation: [Math.PI / 2, 0, 0] },
  '/assets/models/tjm-2.glb': { rotation: [Math.PI / 2, 0, 0] },
};

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materialName = child.material?.name?.toLowerCase() || '';
        const isGem = materialName.includes('gem') || materialName.includes('diamond') || materialName.includes('stone') || materialName.includes('emerald') || materialName.includes('sapphire') || (child.material.transmission && child.material.transmission > 0) || (child.material.opacity && child.material.opacity < 1);
        if (isGem) {
          child.material = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0xffffff), metalness: 0.1, roughness: 0, transmission: 1.0, ior: 2.418, thickness: 2.5, envMapIntensity: 3.0, clearcoat: 1.0, clearcoatRoughness: 0.1 });
        } else {
          child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color('#C9A96E'), metalness: 1.0, roughness: 0.12, envMapIntensity: 2.5 });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  const config = MODEL_CONFIG[url] || {};
  return <primitive object={scene} rotation={config.rotation || [0, 0, 0]} scale={config.scale || 1} />;
}

export default function ModelViewerModal({ isOpen, onClose, modelUrl, productName }: { isOpen: boolean; onClose: () => void; modelUrl: string; productName: string; }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'auto'; }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(5, 5, 7, 0.85)', backdropFilter: 'blur(20px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isFullscreen ? '0' : '20px' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
              background: 'radial-gradient(circle at center, var(--color-teal-dark) 0%, var(--surface-primary) 100%)',
              border: isFullscreen ? 'none' : '1px solid var(--border-light)',
              borderRadius: isFullscreen ? '0' : '4px', width: isFullscreen ? '100vw' : '100%', maxWidth: isFullscreen ? '100vw' : '800px',
              height: isFullscreen ? '100vh' : '80vh', maxHeight: isFullscreen ? '100vh' : '700px',
              position: 'relative', boxShadow: isFullscreen ? 'none' : 'var(--shadow-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease-in-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '20px 30px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 'var(--text-h4)', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 400 }}>{productName}</h3>
                <p style={{ margin: '4px 0 0', fontSize: 'var(--text-micro)', color: 'var(--color-gold)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500 }}>Interactive 3D Viewer</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[{ label: isFullscreen ? "🗗" : "⛶", action: () => setIsFullscreen(!isFullscreen) }, { label: "✕", action: onClose }].map((btn, i) => (
                  <button key={i} onClick={btn.action}
                    style={{ background: 'rgba(201, 169, 110, 0.05)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', width: '40px', height: '40px', borderRadius: '50%', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--text-on-gold)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(201, 169, 110, 0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  >{btn.label}</button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, width: '100%', position: 'relative', cursor: 'grab', background: 'var(--surface-primary)' }}>
              <Canvas camera={{ position: [0, 2, 8], fov: 45 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
                <Suspense fallback={<Loader />}>
                  <Bounds fit clip observe margin={1.2}><Center><Model url={modelUrl} /></Center></Bounds>
                  <Environment preset="studio" background={false} />
                  <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={20} blur={2.5} far={4} />
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={1.5} enablePan={false} maxDistance={150} minDistance={2} />
              </Canvas>
              <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'var(--text-tertiary)', fontSize: 'var(--text-micro)', letterSpacing: '2px', pointerEvents: 'none', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                DRAG TO ROTATE · SCROLL TO ZOOM
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
