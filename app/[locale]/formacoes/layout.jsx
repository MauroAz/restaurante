import ThemeProvider from "../../context/ThemeProvider";

// Teaching note 🎓: this layout.jsx wraps all pages inside /formacoes/
// with ThemeProvider so useTheme() works on detail pages.
// Next.js automatically applies the nearest layout.jsx to all child routes.
// Hierarchy: app/[locale]/layout.tsx → formacoes/layout.jsx → [slug]/page.jsx

export default function FormacaoLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
