export const formacoes = [
  // Workshops
  {
    image: "/images/formacoes/workshop-pijamarama.jpg",
    title: "Pijamarama",
    description: "Uma experiência mágica de histórias ao serão.",
    type: "Workshops",
  },
  {
    image: "/images/formacoes/workshop-livros.jpg",
    title: "Construção de Livros",
    description: "Criação artesanal de livros únicos e personalizados.",
    type: "Workshops",
  },
  {
    image: "/images/formacoes/workshop-blackout.jpg",
    title: "Blackout Poetry",
    description: "Poesia criada a partir do apagamento de textos existentes.",
    type: "Workshops",
  },

  // Formações Creditadas
  {
    image: "/images/formacoes/cred-livros.jpg",
    title: "Isto Não é um Livro",
    description: "Formação creditada sobre construção criativa de livros.",
    type: "Formações Creditadas",
  },
  {
    image: "/images/formacoes/cred-ludicidade.jpg",
    title: "Ludicidade e Currículo",
    description: "Ludicidade e currículo em contexto de biblioteca escolar.",
    type: "Formações Creditadas",
  },
  {
    image: "/images/formacoes/cred-laboratorio.jpg",
    title: "Laboratório de Contadores",
    description: "Formação para contadores de histórias em contexto educativo.",
    type: "Formações Creditadas",
  },

  // Computação Criativa
  {
    image: "/images/formacoes/cc-recreating.jpg",
    title: "ReCreating the Past",
    description: "Arte e código unidos para recriar e reimaginar o passado.",
    type: "Computação Criativa",
  },
  {
    image: "/images/formacoes/cc-blackout.jpg",
    title: "Blackout Poetry Digital",
    description: "Versão digital da erasure poetry com ferramentas criativas.",
    type: "Computação Criativa",
  },
  {
    image: "/images/formacoes/cc-botpoets.jpg",
    title: "Bot Poets",
    description: "Exploração da escrita criativa com inteligência artificial.",
    type: "Computação Criativa",
  },
  {
    image: "/images/formacoes/cc-typography.jpg",
    title: "Animar as Palavras",
    description: "Tipografia animada como forma de expressão narrativa.",
    type: "Computação Criativa",
  },
  {
    image: "/images/formacoes/cc-digital.jpg",
    title: "Digital Storytelling",
    description:
      "Narração de histórias através de meios digitais e multimédia.",
    type: "Computação Criativa",
  },

  // Som + Storytelling
  {
    image: "/images/formacoes/som-foley.jpg",
    title: "Storytelling Sonoro",
    description: "Criação de paisagens sonoras e efeitos para narrativas.",
    type: "Som + Storytelling",
  },
  {
    image: "/images/formacoes/som-field.jpg",
    title: "Field Recording",
    description: "Gravação de sons do mundo real como matéria narrativa.",
    type: "Som + Storytelling",
  },
  {
    image: "/images/formacoes/som-spoken.jpg",
    title: "Poesia Sonora",
    description: "Spoken word e poesia com tratamento sonoro e efeitos.",
    type: "Som + Storytelling",
  },
  {
    image: "/images/formacoes/som-songwriting.jpg",
    title: "Songwriting & Narrativa",
    description: "Composição musical como veículo de storytelling.",
    type: "Som + Storytelling",
  },

  // Oficinas para Professores
  {
    image: "/images/formacoes/prof-objetos.jpg",
    title: "Contar com Objetos",
    description: "A arte de narrar histórias usando objetos do quotidiano.",
    type: "Oficinas para Professores",
  },
  {
    image: "/images/formacoes/prof-jogos.jpg",
    title: "Aprendizagens e Jogos",
    description: "Jogos de mesa como ferramenta pedagógica em sala de aula.",
    type: "Oficinas para Professores",
  },
  {
    image: "/images/formacoes/prof-marionetas.jpg",
    title: "Marionetas e Formas Animadas",
    description: "Criação e manipulação de marionetas para contar histórias.",
    type: "Oficinas para Professores",
  },
  {
    image: "/images/formacoes/prof-quietbook.jpg",
    title: "Quiet Book",
    description: "Livros sem texto como estímulo à imaginação e à leitura.",
    type: "Oficinas para Professores",
  },

  // Sessões de Contos
  {
    image: "/images/formacoes/contos-sessoes.jpg",
    title: "Sessões de Contos",
    description:
      "Sessões de narração oral para escolas, bibliotecas e espaços culturais.",
    type: "Sessões de Contos",
  },
  {
    image: "/images/formacoes/contos-rumos.jpg",
    title: "Rumos à Liberdade",
    description: "Histórias que exploram temas de liberdade e identidade.",
    type: "Sessões de Contos",
  },
  {
    image: "/images/formacoes/contos-kamishibai.jpg",
    title: "Contar com Kamishibai",
    description: "A arte japonesa de contar histórias com teatro de papel.",
    type: "Sessões de Contos",
  },

  // Jogos de Mesa
  {
    image: "/images/formacoes/jogos-mesa1.jpg",
    title: "Jogos de Mesa I",
    description: "Experiências de jogo criativo que estimulam a imaginação.",
    type: "Jogos de Mesa",
  },
  {
    image: "/images/formacoes/jogos-mesa2.jpg",
    title: "Jogos de Mesa II",
    description: "Jogos colaborativos e narrativos para todas as idades.",
    type: "Jogos de Mesa",
  },

  // Espectáculos
  {
    image: "/images/formacoes/espetaculos1.jpg",
    title: "Espectáculos I",
    description: "Espectáculos de narração e artes performativas.",
    type: "Espectáculos",
  },
  {
    image: "/images/formacoes/espetaculos2.jpg",
    title: "Espectáculos II",
    description: "Performances ao vivo que unem história, música e movimento.",
    type: "Espectáculos",
  },
];

export const formacaoTypes = [
  "Todos",
  "Workshops",
  "Formações Creditadas",
  "Computação Criativa",
  "Som + Storytelling",
  "Oficinas para Professores",
  "Sessões de Contos",
  "Jogos de Mesa",
  "Espectáculos",
];

// Detailed workshop data for individual pages
// Teaching note 🎓: slug is the URL-friendly version of the title
// e.g. "Blackout Poetry Digital" → "blackout-poetry-digital"
// This is how Next.js matches the URL to the right workshop data
export const formacaoDetails = {
  "blackout-poetry-digital": {
    slug: "blackout-poetry-digital",
    title: "Blackout Poetry Digital",
    category: "Computação Criativa",
    tagline: "Apagar para revelar. Criar a partir do que existe.",
    duration: "3 horas",
    participants: "10 a 20 participantes",
    audience: "Jovens e adultos a partir dos 14 anos",
    materials: "Computador ou tablet com acesso à internet",
    language: "Português (adaptável a outras línguas)",
    price: "A consultar",
    mainImage: "/images/formacoes/cc-blackout.jpg",
    images: [
      "/images/formacoes/cc-blackout.jpg",
      "/images/formacoes/cc-digital.jpg",
      "/images/formacoes/cc-typography.jpg",
    ],
    description: [
      "A Blackout Poetry Digital é uma oficina criativa que parte de textos existentes — artigos, páginas de livros, notícias — para criar novos poemas através do apagamento seletivo de palavras.",
      "Nesta versão digital, os participantes utilizam ferramentas digitais para selecionar, apagar e destacar palavras, transformando um texto original numa obra visual e poética única.",
      "A oficina explora a fronteira entre a escrita criativa, o design visual e a literacia mediática — questionando o que escolhemos mostrar e o que decidimos apagar.",
    ],
    whatYouLearn: [
      "✏️ Técnicas de leitura criativa e seleção de texto",
      "🎨 Ferramentas digitais de edição visual",
      "📖 Noções de poesia visual e concreta",
      "💡 Pensamento crítico sobre linguagem e media",
    ],
    whatToBring: [
      "Computador, tablet ou smartphone",
      "Curiosidade e vontade de experimentar",
    ],
  },

  "isto-nao-e-um-livro": {
    slug: "isto-nao-e-um-livro",
    title: "Isto Não é um Livro",
    category: "Formações Creditadas",
    tagline: "Construir livros é construir mundos.",
    duration: "6 horas (1 dia) ou 3h + 3h (2 sessões)",
    participants: "8 a 16 participantes",
    audience: "Professores, bibliotecários e educadores",
    materials: "Fornecidos pela associação",
    language: "Português",
    price: "Formação Creditada — consultar condições",
    mainImage: "/images/formacoes/cred-livros.jpg",
    images: [
      "/images/formacoes/cred-livros.jpg",
      "/images/formacoes/workshop-livros.jpg",
      "/images/formacoes/workshop-blackout.jpg",
    ],
    description: [
      '"Isto Não é um Livro" é uma formação creditada que explora a construção artesanal de livros como ferramenta pedagógica e criativa.',
      "Os participantes criam os seus próprios livros — desde a estrutura física até ao conteúdo — descobrindo como o objeto livro pode ser um ponto de partida para projetos interdisciplinares em sala de aula ou biblioteca.",
      "A formação articula encadernação artesanal, escrita criativa, artes visuais e literacia, oferecendo ferramentas práticas para educadores que queiram integrar a criação de livros nas suas práticas.",
    ],
    whatYouLearn: [
      "📚 Técnicas básicas de encadernação artesanal",
      "✂️ Criação de livros com diferentes estruturas",
      "🖊️ Integração curricular da criação de livros",
      "🎨 Articulação entre texto, imagem e objeto",
    ],
    whatToBring: [
      "Vontade de criar com as mãos",
      "Materiais fornecidos pela associação",
    ],
  },
};
