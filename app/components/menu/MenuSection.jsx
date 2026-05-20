"use client";

/*
  🍽️ MENU SECTION — Ganda Gula (styled as printed menu)
  ========================================================
  Teaching note: this section deliberately breaks from the
  rest of the site's colour scheme to feel like a real
  printed restaurant menu — warm cream/parchment background,
  serif fonts for dish names, clean sans-serif for descriptions.

  Typography hierarchy:
  - Category title: large serif, bold, accent colour
  - Dish name: medium serif, warm dark ink
  - Description: small sans-serif, muted warm grey
  - Price: serif, accent colour, right-aligned
*/

import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import Image from "next/image";

const menuData = [
  {
    id: "entradas",
    title: "Entradas",
    emoji: "🍽️",
    items: [
      {
        name: "Sopa do Dia",
        desc: "Sopa de legumes da estação",
        price: "2,50€",
        img: "/images/menu/sopa-do-dia.jpg",
      },
      {
        name: "Escondidinho de Bacalhau",
        desc: "Puré de batatas com 3 queijos, nata e bacalhau",
        price: "4,50€",
        img: "/images/menu/escondidinho-bacalhau.jpg",
      },
      {
        name: "Rissois de Pizza",
        desc: "Massa, queijo, fiambre e orégãos (10 unid)",
        price: "5,90€",
        img: "/images/menu/rissois-pizza.jpg",
      },
      {
        name: "Bolinha de Queijo",
        desc: "Massa, queijo, orégãos e azeite de oliva (10 unid)",
        price: "5,90€",
        img: "/images/menu/bolinha-queijo.jpg",
      },
      {
        name: "Coxinha de Frango",
        desc: "Massa e recheio de frango (10 unid)",
        price: "5,90€",
        img: "/images/menu/coxinha-frango.jpg",
      },
      {
        name: "Batata Frita",
        desc: "500g de batatas fritas",
        price: "5,90€",
        img: "/images/menu/batata-frita.jpg",
      },
      {
        name: "Espeto de Coraçãozinho",
        desc: "Porção de coração de galinha",
        price: "6,90€",
        img: "/images/menu/espeto-coracaozinho.jpg",
      },
      {
        name: "Linguiça",
        desc: "Porção de linguiça",
        price: "6,90€",
        img: "/images/menu/linguica.jpg",
      },
      {
        name: "Pão de Alho",
        desc: "Porção de pão com pasta de alho com queijo",
        price: "3,90€",
        img: "/images/menu/pao-alho.jpg",
      },
    ],
  },
  {
    id: "churrasco",
    title: "Churrasco",
    emoji: "🔥",
    items: [
      {
        name: "Churrasco de Frango",
        desc: "Coxa ou sobrecoxa de frango, arroz, batatas fritas e saladinha mista",
        price: "9,90€",
        img: "/images/menu/churrasco-frango.jpg",
      },
      {
        name: "Churrasco de Lombo de Porco",
        desc: "Lombo de porco, arroz, batatas fritas e saladinha mista",
        price: "9,90€",
        img: "/images/menu/churrasco-lombo-porco.jpg",
      },
      {
        name: "Churrasco Misto",
        desc: "Coxa ou sobrecoxa, linguiça, lombo de porco, picanha, arroz, feijão, banana e batatas fritas, farofa e molho campanha",
        price: "32,90€",
        img: "/images/menu/churrasco-misto.jpg",
      },
      {
        name: "Churrasco de Picanha",
        desc: "Picanha, arroz, feijão, banana e batatas fritas, farofa, molho campanha e ananás assado",
        price: "23,90€",
        img: "/images/menu/churrasco-picanha.jpg",
      },
      {
        name: "Rodízio Branco",
        desc: "7 carnes de frango e porco, arroz, feijão, salada, banana e batata frita, farofa, molho campanha e ananás assado",
        price: "19,90€",
        img: "/images/menu/rodizio-branco.jpg",
      },
      {
        name: "Rodízio Tradicional",
        desc: "10 tipos de carne, arroz, feijão, salada, batata frita, farofa, molho campanha e ananás com canela assado",
        price: "25,90€",
        img: "/images/menu/rodizio-tradicional.jpg",
      },
      {
        name: "Rodízio do Chefe",
        desc: "6 tipos diferentes de carnes vermelhas, arroz, feijão, salada, banana frita, molho campanha e ananás assado",
        price: "32,90€",
        img: "/images/menu/rodizio-chefe.jpg",
      },
    ],
  },
  {
    id: "acompanhamentos",
    title: "Acompanhamentos",
    emoji: "🍚",
    items: [
      {
        name: "Arroz",
        desc: "",
        price: "1,50€",
        img: "/images/menu/arroz.jpg",
      },
      {
        name: "Feijão",
        desc: "",
        price: "2,50€",
        img: "/images/menu/feijao.jpg",
      },
      {
        name: "Batatas Fritas",
        desc: "",
        price: "1,50€",
        img: "/images/menu/batatas-fritas.jpg",
      },
      {
        name: "Saladinha Mista",
        desc: "Alface, tomate e cebola",
        price: "1,50€",
        img: "/images/menu/saladinha-mista.jpg",
      },
    ],
  },
  {
    id: "saladas",
    title: "Saladas",
    emoji: "🥗",
    items: [
      {
        name: "Salada de Atum",
        desc: "Alface, tomate, ovo, atum, milho verde, queijo e azeitonas",
        price: "5,90€",
        img: "/images/menu/salada-atum.jpg",
      },
      {
        name: "Salada de Grão de Bico",
        desc: "Grão de bico, tomate, cebola, ovo cozido e manjericão",
        price: "4,90€",
        img: "/images/menu/salada-grao-bico.jpg",
      },
      {
        name: "Salada de Pepino com Ananás",
        desc: "Pepino, ananás e tomate",
        price: "5,90€",
        img: "/images/menu/salada-pepino-ananas.jpg",
      },
    ],
  },
  {
    id: "kids",
    title: "Kids",
    emoji: "👶",
    items: [
      {
        name: "Iscas de Frango",
        desc: "Franguinho picado, arroz, feijão e batatas fritas",
        price: "4,90€",
        img: "/images/menu/iscas-frango.jpg",
      },
      {
        name: "Bifinho a Soberano",
        desc: "Carne de vitela, porco ou peito de frango, arroz, feijão e batatas fritas",
        price: "5,90€",
        img: "/images/menu/bifinho-soberano.jpg",
      },
    ],
  },
  {
    id: "sobremesas",
    title: "Sobremesas",
    emoji: "🍮",
    items: [
      {
        name: "Torta de Limão",
        desc: "Fatia",
        price: "consulte",
        img: "/images/menu/torta-limao.jpg",
      },
      {
        name: "Banoffee",
        desc: "Fatia",
        price: "consulte",
        img: "/images/menu/banoffee.jpg",
      },
      {
        name: "Banana Split",
        desc: "",
        price: "consulte",
        img: "/images/menu/banana-split.jpg",
      },
      {
        name: "01 Bola de Gelado",
        desc: "",
        price: "consulte",
        img: "/images/menu/gelado.jpg",
      },
      {
        name: "02 Bolas de Gelado",
        desc: "",
        price: "consulte",
        img: "/images/menu/gelado.jpg",
      },
      {
        name: "03 Bolas de Gelado",
        desc: "",
        price: "consulte",
        img: "/images/menu/gelado.jpg",
      },
    ],
  },
  {
    id: "cafes",
    title: "Cafés",
    emoji: "☕",
    items: [
      { name: "Carioca de Limão", desc: "", price: "consulte", img: null },
      {
        name: "Café Expresso / Descafeinado",
        desc: "",
        price: "consulte",
        img: null,
      },
      { name: "Pingo", desc: "", price: "consulte", img: null },
      { name: "Meia de Leite", desc: "", price: "consulte", img: null },
      { name: "Cappuccino", desc: "", price: "consulte", img: null },
      {
        name: "Chá",
        desc: "Consulte as variedades disponíveis",
        price: "consulte",
        img: null,
      },
    ],
  },
];

const leftCols = ["entradas", "churrasco", "acompanhamentos"];
const rightCols = ["saladas", "kids", "sobremesas", "cafes"];

export default function MenuSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeTab, setActiveTab] = useState("all");
  const [zoomed, setZoomed] = useState(null);

  const MENU_BG = isLight ? "#F5ECD7" : "#1A1208";
  const MENU_SURFACE = isLight ? "#EDE0C4" : "#241810";
  const MENU_BORDER = isLight ? "#C8A87A" : "#3D2A15";
  const MENU_TITLE = isLight ? "#7A4A10" : "#D4A857";
  const MENU_DISH = isLight ? "#2C1810" : "#F0E6D3";
  const MENU_DESC = isLight ? "#7A5A3A" : "#A08060";
  const MENU_PRICE = isLight ? "#8B3A0A" : "#C8922A";
  const MENU_CHIP_BG = isLight ? "#E0CC9A" : "#2E1E0A";
  const MENU_CHIP_ACT = isLight ? "#C8922A" : "#8B5E1A";

  const filtered =
    activeTab === "all" ? menuData : menuData.filter((c) => c.id === activeTab);
  const leftData = filtered.filter((c) => leftCols.includes(c.id));
  const rightData = filtered.filter((c) => rightCols.includes(c.id));

  return (
    <section
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: MENU_BG }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p
            style={{
              color: MENU_DESC,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "1rem",
              marginBottom: "4px",
            }}
          >
            O que temos para si
          </p>
          <h2
            style={{
              color: MENU_TITLE,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "2.5rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Menu
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "60px",
                backgroundColor: MENU_BORDER,
              }}
            />
            <span style={{ color: MENU_TITLE, fontSize: "1.2rem" }}>✦</span>
            <div
              style={{
                height: "1px",
                width: "60px",
                backgroundColor: MENU_BORDER,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={() => setActiveTab("all")}
            style={{
              padding: "6px 18px",
              borderRadius: "20px",
              border: `1px solid ${MENU_BORDER}`,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.85rem",
              backgroundColor:
                activeTab === "all" ? MENU_CHIP_ACT : MENU_CHIP_BG,
              color: activeTab === "all" ? "#fff" : MENU_DESC,
              fontFamily: "Georgia, serif",
            }}
          >
            Tudo
          </button>
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: "6px 18px",
                borderRadius: "20px",
                border: `1px solid ${MENU_BORDER}`,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                backgroundColor:
                  activeTab === cat.id ? MENU_CHIP_ACT : MENU_CHIP_BG,
                color: activeTab === cat.id ? "#fff" : MENU_DESC,
                fontFamily: "Georgia, serif",
              }}
            >
              {cat.emoji} {cat.title}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {/*
            Teaching note: when filtering to a single category,
            we constrain the max width so the content clusters
            toward the center rather than stretching full width.
            When showing all, we use two columns as before.
          */}
          {activeTab === "all" ? (
            <>
              <div style={{ flex: "1", minWidth: "300px", maxWidth: "560px" }}>
                {leftData.map((cat) => (
                  <MenuCategory
                    key={cat.id}
                    category={cat}
                    colors={{
                      MENU_SURFACE,
                      MENU_BORDER,
                      MENU_TITLE,
                      MENU_DISH,
                      MENU_DESC,
                      MENU_PRICE,
                    }}
                    onZoom={setZoomed}
                  />
                ))}
              </div>
              <div style={{ flex: "1", minWidth: "300px", maxWidth: "560px" }}>
                {rightData.map((cat) => (
                  <MenuCategory
                    key={cat.id}
                    category={cat}
                    colors={{
                      MENU_SURFACE,
                      MENU_BORDER,
                      MENU_TITLE,
                      MENU_DISH,
                      MENU_DESC,
                      MENU_PRICE,
                    }}
                    onZoom={setZoomed}
                  />
                ))}
              </div>
            </>
          ) : (
            <div style={{ width: "100%", maxWidth: "640px" }}>
              {filtered.map((cat) => (
                <MenuCategory
                  key={cat.id}
                  category={cat}
                  colors={{
                    MENU_SURFACE,
                    MENU_BORDER,
                    MENU_TITLE,
                    MENU_DISH,
                    MENU_DESC,
                    MENU_PRICE,
                  }}
                  onZoom={setZoomed}
                />
              ))}
            </div>
          )}
        </div>

        <p
          style={{
            color: MENU_DESC,
            fontSize: "0.8rem",
            textAlign: "center",
            marginTop: "1.5rem",
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
          }}
        >
          Preços sujeitos a alteração. IVA incluído. Consulte-nos para mais
          informações.
        </p>
      </div>

      {zoomed && (
        <div
          onClick={() => setZoomed(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.88)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <button
            onClick={() => setZoomed(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                position: "relative",
                width: "min(80vw, 500px)",
                height: "min(60vh, 400px)",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <Image
                src={zoomed.img}
                alt={zoomed.name}
                fill
                className="object-cover"
                sizes="500px"
              />
            </div>
            <p
              style={{
                color: "#F0E6D3",
                fontFamily: "Georgia, serif",
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              {zoomed.name}
            </p>
            {zoomed.desc && (
              <p
                style={{
                  color: "#A08060",
                  fontSize: "0.9rem",
                  marginTop: "4px",
                }}
              >
                {zoomed.desc}
              </p>
            )}
            <p
              style={{
                color: "#C8922A",
                fontFamily: "Georgia, serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                marginTop: "8px",
              }}
            >
              {zoomed.price}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function MenuCategory({ category, colors, onZoom }) {
  const {
    MENU_SURFACE,
    MENU_BORDER,
    MENU_TITLE,
    MENU_DISH,
    MENU_DESC,
    MENU_PRICE,
  } = colors;

  return (
    <div
      style={{
        marginBottom: "2rem",
        backgroundColor: MENU_SURFACE,
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
        border: `1px solid ${MENU_BORDER}`,
      }}
    >
      <h3
        style={{
          color: MENU_TITLE,
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "1.3rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: `1px solid ${MENU_BORDER}`,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {category.emoji} {category.title}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {category.items.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "0.75rem",
              borderBottom: `1px dotted ${MENU_BORDER}`,
            }}
          >
            {item.img && (
              <div
                onClick={() => onZoom(item)}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "pointer",
                  border: `1px solid ${MENU_BORDER}`,
                  position: "relative",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}

            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: MENU_DISH,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {item.name}
              </p>
              {item.desc && (
                <p
                  style={{
                    color: MENU_DESC,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: "0.82rem",
                    margin: "3px 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </p>
              )}
            </div>

            <p
              style={{
                color: MENU_PRICE,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "1rem",
                fontWeight: 700,
                flexShrink: 0,
                margin: 0,
              }}
            >
              {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
