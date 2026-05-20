"use client";

import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";

const menuData = [
  {
    id: "entradas",
    title: "Entradas",
    emoji: "🍽️",
    items: [
      { name: "Sopa do Dia", desc: "Sopa de legumes da estação", price: "2,50€" },
      { name: "Escondidinho de Bacalhau", desc: "Puré de batatas com 3 queijos, nata e bacalhau", price: "4,50€" },
      { name: "Rissois de Pizza", desc: "Massa, queijo, fiambre e orégãos (10 unid)", price: "5,90€" },
      { name: "Bolinha de Queijo", desc: "Massa, queijo, orégãos e azeite de oliva (10 unid)", price: "5,90€" },
      { name: "Coxinha de Frango", desc: "Massa e recheio de frango (10 unid)", price: "5,90€" },
      { name: "Batata Frita", desc: "500g de batatas fritas", price: "5,90€" },
      { name: "Espeto de Coraçãozinho", desc: "Porção de coração de galinha", price: "6,90€" },
      { name: "Linguiça", desc: "Porção de linguiça", price: "6,90€" },
      { name: "Pão de Alho", desc: "Porção de pão com pasta de alho com queijo", price: "3,90€" },
    ],
  },
  {
    id: "saladas",
    title: "Saladas",
    emoji: "🥗",
    items: [
      { name: "Salada de Atum", desc: "Alface, tomate, ovo, atum, milho verde, queijo e azeitonas", price: "5,90€" },
      { name: "Salada de Grão de Bico", desc: "Grão de bico, tomate, cebola, ovo cozido e manjericão", price: "4,90€" },
      { name: "Salada de Pepino com Ananás", desc: "Pepino, ananás e tomate", price: "5,90€" },
    ],
  },
  {
    id: "kids",
    title: "Kids",
    emoji: "👶",
    items: [
      { name: "Iscas de Frango", desc: "Franguinho picado, arroz, feijão e batatas fritas", price: "4,90€" },
      { name: "Bifinho a Soberano", desc: "Carne de vitela, porco ou peito de frango, arroz, feijão e batatas fritas", price: "5,90€" },
    ],
  },
  {
    id: "acompanhamentos",
    title: "Acompanhamentos",
    emoji: "🍚",
    items: [
      { name: "Arroz", desc: "", price: "1,50€" },
      { name: "Feijão", desc: "", price: "2,50€" },
      { name: "Batatas Fritas", desc: "", price: "1,50€" },
      { name: "Saladinha Mista", desc: "Alface, tomate e cebola", price: "1,50€" },
    ],
  },
  {
    id: "churrasco",
    title: "Churrasco",
    emoji: "🔥",
    items: [
      { name: "Churrasco de Frango", desc: "Coxa ou sobrecoxa de frango, arroz, batatas fritas e saladinha mista", price: "9,90€" },
      { name: "Churrasco de Lombo de Porco", desc: "Lombo de porco, arroz, batatas fritas e saladinha mista", price: "9,90€" },
      { name: "Churrasco Misto", desc: "Coxa ou sobrecoxa, linguiça, lombo de porco, picanha, arroz, feijão, banana e batatas fritas, farofa e molho campanha", price: "32,90€" },
      { name: "Churrasco de Picanha", desc: "Picanha, arroz, feijão, banana e batatas fritas, farofa, molho campanha e ananás assado", price: "23,90€" },
      { name: "Rodízio Branco", desc: "7 carnes de frango e porco, arroz, feijão, salada, banana e batata frita, farofa, molho campanha e ananás assado", price: "19,90€" },
      { name: "Rodízio Tradicional", desc: "10 tipos de carne, arroz, feijão, salada, batata frita, farofa, molho campanha e ananás com canela assado", price: "25,90€" },
      { name: "Rodízio do Chefe", desc: "6 tipos diferentes de carnes vermelhas, arroz, feijão, salada, banana frita, molho campanha e ananás assado", price: "32,90€" },
    ],
  },
  {
    id: "sobremesas",
    title: "Sobremesas",
    emoji: "🍮",
    items: [
      { name: "Torta de Limão", desc: "Fatia", price: "consulte" },
      { name: "Banoffee", desc: "Fatia", price: "consulte" },
      { name: "Banana Split", desc: "", price: "consulte" },
      { name: "01 Bola de Gelado", desc: "", price: "consulte" },
      { name: "02 Bolas de Gelado", desc: "", price: "consulte" },
      { name: "03 Bolas de Gelado", desc: "", price: "consulte" },
    ],
  },
  {
    id: "cafes",
    title: "Cafés",
    emoji: "☕",
    items: [
      { name: "Carioca de Limão", desc: "", price: "consulte" },
      { name: "Café Expresso / Descafeinado", desc: "", price: "consulte" },
      { name: "Pingo", desc: "", price: "consulte" },
      { name: "Meia de Leite", desc: "", price: "consulte" },
      { name: "Cappuccino", desc: "", price: "consulte" },
      { name: "Chá", desc: "Consulte as variedades disponíveis", price: "consulte" },
    ],
  },
];

function MenuItem({ item }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", padding: "8px 0", borderBottom: "1px dotted var(--gg-bg-border)" }}>
      <div style={{ flex: 1 }}>
        <p style={{ color: "var(--gg-text-primary)", fontWeight: 600, fontSize: "0.95rem", margin: 0 }}>{item.name}</p>
        {item.desc && <p style={{ color: "var(--gg-text-muted)", fontSize: "0.8rem", margin: "2px 0 0", fontStyle: "italic" }}>{item.desc}</p>}
      </div>
      <p style={{ color: "var(--gg-accent)", fontWeight: 700, fontSize: "0.95rem", flexShrink: 0, margin: 0 }}>{item.price}</p>
    </div>
  );
}

function MenuCategory({ category }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ color: "var(--gg-text-primary)", fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid var(--gg-accent)", paddingBottom: "4px" }}>
        {category.emoji} {category.title}
      </h3>
      {category.items.map((item) => (
        <MenuItem key={item.name} item={item} />
      ))}
    </div>
  );
}

export default function MenuSection() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("all");

  const leftCols = ["entradas", "saladas", "kids", "acompanhamentos"];
  const rightCols = ["churrasco", "sobremesas", "cafes"];

  const filtered = activeTab === "all"
    ? menuData
    : menuData.filter((c) => c.id === activeTab);

  const leftData = filtered.filter((c) => leftCols.includes(c.id));
  const rightData = filtered.filter((c) => rightCols.includes(c.id));

  return (
    <section className="py-20 px-6 scroll-mt-24" style={{ backgroundColor: "var(--gg-bg-page)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-base italic mb-1" style={{ color: "var(--gg-text-muted)", fontFamily: "Georgia, serif" }}>
            O que temos para si
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--gg-text-primary)", fontFamily: "Georgia, serif" }}>
            🍽️ Menu
          </h2>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "2rem" }}>
          <button onClick={() => setActiveTab("all")} style={{ padding: "6px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", backgroundColor: activeTab === "all" ? "var(--gg-accent)" : "var(--gg-bg-elevated)", color: activeTab === "all" ? "#fff" : "var(--gg-text-secondary)" }}>
            Tudo
          </button>
          {menuData.map((cat) => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{ padding: "6px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", backgroundColor: activeTab === cat.id ? "var(--gg-accent)" : "var(--gg-bg-elevated)", color: activeTab === cat.id ? "#fff" : "var(--gg-text-secondary)" }}>
              {cat.emoji} {cat.title}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            {activeTab === "all"
              ? leftData.map((cat) => <MenuCategory key={cat.id} category={cat} />)
              : filtered.map((cat) => <MenuCategory key={cat.id} category={cat} />)
            }
          </div>
          {activeTab === "all" && rightData.length > 0 && (
            <div className="flex-1">
              {rightData.map((cat) => <MenuCategory key={cat.id} category={cat} />)}
            </div>
          )}
        </div>

        <p style={{ color: "var(--gg-text-muted)", fontSize: "0.8rem", textAlign: "center", marginTop: "1.5rem", fontStyle: "italic" }}>
          Preços sujeitos a alteração. IVA incluído. Consulte-nos para mais informações.
        </p>
      </div>
    </section>
  );
}
