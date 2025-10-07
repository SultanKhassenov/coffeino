"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const isMobile = useIsMobile();

  return (
    <nav className="sticky top-0 z-100 bg-white shadow-md">
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
    </nav>
  );
}
