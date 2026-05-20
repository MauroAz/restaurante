"use client";

/*
  🏠 GANDA GULA — Homepage (app/[locale]/page.tsx)
  ==================================================
  Teaching note: this file stitches all page sections together.
  Each section is imported from its own component file.
  Page structure (top → bottom):
  1. Navbar
  2. Hero — carousel
  3. Menu — two menu images, click to zoom
  4. El Chef — two column layout
  5. Clientes — rotating reviews
  6. Reservas — WhatsApp + form
  7. Mapa — photos + Google Maps
  8. Contact
  9. Footer
*/

import Navbar from "../components/navbar";
import ScrollDots from "../components/scrolldots";
import Hero from "../components/hero";
import Footer from "../components/footer";
import ThemeProvider from "../context/ThemeProvider";
import MenuSection from "../components/menu/MenuSection";
import ChefSection from "../components/chef/ChefSection";
import ClientesSection from "../components/clientes/ClientesSection";
import ReservasSection from "../components/reservas/ReservasSection";
import MapaSection from "../components/mapa/MapaSection";

export default function Home() {
  return (
    <ThemeProvider>
      <div style={{ backgroundColor: "var(--gg-bg-page)" }}>
        <Navbar />
        <ScrollDots />
        <div id="home">
          <Hero />
        </div>
        <div id="menu">
          <MenuSection />
        </div>
        <div id="chef">
          <ChefSection />
        </div>
        <div id="clientes">
          <ClientesSection />
        </div>
        <div id="reservas">
          <ReservasSection />
        </div>
        <div id="mapa">
          <MapaSection />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
