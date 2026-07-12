"use client";

import { useAppStore } from "@/store/useAppStore";
import SmoothScrollProvider from "./SmoothScrollProvider";
import LoadingScreen from "./LoadingScreen";
import AmbientBackground from "./AmbientBackground";
import Navbar from "./Navbar";
import ProductModal from "./menu/ProductModal";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const isLoading = useAppStore((s) => s.isLoading);

  return (
    <SmoothScrollProvider>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AmbientBackground />
      {isLoading && <LoadingScreen />}
      <Navbar />
      {children}
      <ProductModal />
    </SmoothScrollProvider>
  );
}
