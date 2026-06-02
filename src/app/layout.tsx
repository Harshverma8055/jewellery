import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samaira Jewellers | Luxury Handcrafted Jewelry — Since 1995",
  description: "Discover the Royal Heritage Collection. Ultra-premium, handcrafted luxury jewelry designed by master artisans. BIS Hallmarked gold, VVS diamonds, and bespoke bridal sets.",
  keywords: "luxury jewelry, gold jewelry, diamond rings, bridal jewelry, handcrafted jewelry, Indian jewelry, Samaira Jewellers",
};

import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import GoldenParticles from "@/components/GoldenParticles";
import AmbientGlow from "@/components/AmbientGlow";
import ScrollProgress from "@/components/ScrollProgress";

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Preloader />
          <CustomCursor />
          <AmbientGlow />
          <GoldenParticles density={25} speed={0.25} maxOpacity={0.25} />
          <ScrollProgress />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
