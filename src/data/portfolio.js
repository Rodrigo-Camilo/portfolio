export const hubbiiCaseStudy = {
  slug: "hubbii",
  number: "03",
  name: "Hubbii",
  banner: "/projects/hubbii/banner.png",
  type: "Plataforma para descoberta e gestão de estabelecimentos",
  period: "nov. 2025 — jul. 2026",
  status: "Projeto entregue",
  summary:
    "Plataforma completa de descoberta e gestão de estabelecimentos locais, com vitrine pública, dashboards administrativos, métricas, campanhas e experiência responsiva.",
  classification: ["Full Stack", "User Experience", "Design"],
  overview:
    "A Hubbii conecta pessoas a estabelecimentos e experiências locais por meio de uma vitrine pública e de painéis completos para parceiros e administradores.",
  role:
    "Desenvolvimento da interface, arquitetura, dados, autenticação, responsividade e painéis administrativo e de parceiros, além de contribuir com ideias para aprimorar a plataforma.",
  decision:
    "Esse foi o primeiro projeto complexo que desenvolvi. Nele, integrei pagamentos reais, implementei sistemas em tempo real entre usuários e fui o único responsável por todo o desenvolvimento, arquitetura e publicação em produção. Também foi meu primeiro projeto utilizando a stack em que venho me aprofundando cada vez mais.",
  devices: [
    { id: "desktop", label: "Desktop" },
    { id: "mobile", label: "Mobile" },
  ],
  demos: [
    {
      id: "home",
      number: "01",
      label: "Home",
      eyebrow: "Descoberta pública · Desktop e mobile",
      title: "Home, busca e descoberta local",
      description:
        "Entrada da experiência pública com categorias, campanhas, estabelecimentos e conteúdo adaptados para diferentes tamanhos de tela.",
      sources: {
        desktop: "/projects/hubbii/desktop/home-page.mp4",
        mobile: "/projects/hubbii/mobile/home-page.mp4",
      },
    },
    {
      id: "admin",
      number: "02",
      label: "Admin",
      eyebrow: "Gestão da plataforma · Desktop",
      title: "Painel administrativo",
      description:
        "Visão central para acompanhar parceiros, usuários, estabelecimentos, campanhas, conteúdo e indicadores da plataforma.",
      sources: { desktop: "/projects/hubbii/desktop/admin-page.mp4" },
    },
    {
      id: "partner",
      number: "03",
      label: "Parceiro",
      eyebrow: "Operação do estabelecimento · Desktop",
      title: "Painel do parceiro",
      description:
        "Área operacional com indicadores de desempenho e gestão de informações da página do estabelecimento, cardápio, pedidos, agenda, eventos e conteúdo.",
      sources: { desktop: "/projects/hubbii/desktop/partner-page.mp4" },
    },
    {
      id: "plans",
      number: "04",
      label: "Planos",
      eyebrow: "Proposta comercial · Desktop",
      title: "Planos para estabelecimentos",
      description:
        "Apresentação dos recursos disponíveis para parceiros e dos caminhos de entrada no ecossistema da Hubbii.",
      sources: { desktop: "/projects/hubbii/desktop/plans-page.mp4" },
    },
  ],
  highlights: [
    "Vitrine por categoria e bairro",
    "Busca e filtros de descoberta",
    "Páginas de estabelecimentos",
    "Dashboards administrativo e parceiro",
    "Cardápio, pedidos, agenda e eventos",
    "Demonstração local responsiva",
  ],
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Firebase",
    "Firestore",
    "Firebase Auth",
    "Recharts",
    "Framer Motion",
    "Leaflet",
    "Mercado Pago Developers",
    "Stripe",
  ],
  note:
    "Os estabelecimentos, usuários e indicadores desta demonstração são fictícios e foram criados exclusivamente para fins de portfólio.",
};

export const ayraCaseStudy = {
  slug: "ayra",
  number: "02",
  name: "AYRA",
  banner: "/projects/ayra/banner.png",
  liveUrl: "https://www.ayraproject.com/",
  type: "Plataforma de entregas sob demanda",
  period: "jul. 2026 — atual",
  status: "Em produção",
  summary:
    "Plataforma full stack para solicitar entregas urbanas com cotação por rota, pagamento online, acompanhamento e painéis operacionais.",
  classification: ["Full Stack", "Logística", "Segurança"],
  overview:
    "A AYRA simplifica a solicitação de entregas: o usuário informa origem e destino, escolhe quando enviar e recebe uma cotação conforme a rota e o veículo.",
  role:
    "Responsável pela experiência, arquitetura, dados, cotações, mapas, pagamentos, autenticação, painéis, notificações e testes da plataforma.",
  decision:
    "Distância, preço, pagamento e transições da entrega são validados no servidor. Webhooks idempotentes e reconciliação protegem a operação contra duplicidade e falhas temporárias.",
  defaultDevice: "mobile",
  devices: [
    { id: "desktop", label: "Desktop" },
    { id: "mobile", label: "Mobile" },
  ],
  demos: [
    {
      id: "home",
      number: "01",
      label: "Solicitar",
      eyebrow: "Experiência principal · Mobile e desktop",
      title: "Solicitação simples de entrega",
      description:
        "Fluxo direto para informar endereços, escolher entrega imediata ou agendada, comparar veículos, receber a cotação e avançar ao pagamento.",
      defaultDevice: "mobile",
      sources: {
        desktop: "/projects/ayra/desktop/home-page.mp4",
        mobile: "/projects/ayra/mobile/home-page.mp4",
      },
    },
    {
      id: "driver",
      number: "02",
      label: "Motorista",
      eyebrow: "Operação do parceiro · Mobile",
      title: "Painel do motorista parceiro",
      description:
        "Área para aceitar corridas, acompanhar entregas em andamento, atualizar etapas, consultar histórico, ganhos e repasses.",
      defaultDevice: "mobile",
      sources: { mobile: "/projects/ayra/mobile/driver-page.mp4" },
    },
    {
      id: "admin",
      number: "03",
      label: "Admin",
      eyebrow: "Gestão operacional · Desktop",
      title: "Painel administrativo",
      description:
        "Visão das corridas, parceiros, cadastros, documentos, pagamentos, repasses e indicadores operacionais e financeiros.",
      sources: { desktop: "/projects/ayra/desktop/admin-page.mp4" },
    },
  ],
  highlights: [
    "Cotação server-side por rota e veículo",
    "Entrega imediata ou agendada",
    "Mercado Pago com webhooks idempotentes",
    "Acompanhamento por código e comprovante PDF",
    "Painel mobile para motoristas parceiros",
    "Gestão administrativa e financeira",
  ],
  technologies: [
    "Next.js",
    "App Router",
    "React",
    "TypeScript",
    "Node.js",
    "Firebase",
    "Google Maps",
    "Mercado Pago",
    "Vitest",
    "Web Push",
    "PDF-Lib",
    "Vercel",
  ],
  note:
    "A AYRA é um projeto autoral de demonstração. O acompanhamento mostra as etapas da entrega sem coletar continuamente a localização do motorista.",
};

export const supplyDeskCaseStudy = {
  slug: "supplydesk",
  number: "01",
  name: "SupplyDesk",
  banner: "/projects/supplydesk/banner.png",
  type: "Dashboard administrativo B2B",
  period: "SET. 2026 — atual",
  status: "Em produção",
  summary:
    "Central operacional B2B para gerenciar fornecedores, comparar ofertas, acompanhar pedidos e controlar comissões.",
  classification: ["Full Stack", "Dashboard", "B2B"],
  overview:
    "O SupplyDesk centraliza fornecedores, produtos e negociações em uma visão administrativa com comparação de preços, indicadores financeiros e rastreabilidade.",
  role:
    "Responsável pela concepção e desenvolvimento full stack, incluindo arquitetura, Firestore, autenticação, dashboards, catálogo, pedidos, comissões, XLSX e auditoria.",
  decision:
    "A modelagem separa o produto das ofertas de cada fornecedor e salva preços e taxas no pedido, preservando o histórico mesmo após mudanças no catálogo ou nas faixas de comissão.",
  defaultDevice: "desktop",
  devices: [{ id: "desktop", label: "Desktop" }],
  demos: [
    {
      id: "dashboard",
      number: "01",
      label: "Dashboard",
      eyebrow: "Operação administrativa · Desktop",
      title: "Gestão comercial em uma única visão",
      description:
        "Dashboard com fornecedores, catálogo, comparação de ofertas, pedidos, comissões, indicadores, gráficos e histórico de alterações.",
      sources: { desktop: "/projects/supplydesk/desktop/painel.mp4" },
    },
  ],
  highlights: [
    "Comparação de ofertas multi-fornecedor",
    "Histórico de preços e auditoria",
    "Snapshots de preços e comissões por pedido",
    "Importação XLSX com validação e prévia",
    "Indicadores operacionais e financeiros",
    "Autenticação e acesso para múltiplos admins",
  ],
  technologies: [
    "Next.js",
    "React JS",
    "TypeScript",
    "Tailwind CSS",
    "Firebase Auth",
    "Firestore",
    "Recharts",
    "ExcelJS",
    "Vercel",
    "React Compiler",
  ],
  note:
    "Os dados apresentados são fictícios e foram criados para demonstração. Os pagamentos acontecem fora da plataforma; o SupplyDesk controla a operação e o financeiro.",
};

export const experience = [
    {
    company: "Grupo Multi (Multilaser)",
    role: "Jovem Aprendiz em Suporte Técnico",
    period: "fev. 2025 — out. 2025",
    description:
      "Atendimento presencial e remoto, gestão de chamados e acessos, preparação de equipamentos e manutenção de hardware.",
    highlights: ["Jira", "Slack", "Active Directory", "TeamViewer", "Infraestrutura"],
  },
  {
    company: "GSX Investments",
    role: "Desenvolvedor Full Stack",
    period: "nov. 2025 — atual",
    description:
      "Desenvolvimento de produtos digitais em produção, com responsabilidade sobre frontend, backend, integrações, dados, pagamentos e deploy.",
    highlights: ["Hubbii", "AYRA", "Arquitetura full stack", "Produção e manutenção"],
  },
];

export const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    description: "Interfaces responsivas, acessíveis e organizadas em componentes reutilizáveis.",
    items: ["React", "Next.js", "React Native", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"],
  },
  {
    number: "02",
    title: "Backend & dados",
    description: "Regras de negócio, APIs e persistência com foco em segurança e manutenção.",
    items: ["Node.js", "APIs REST", "Firestore", "Firebase Auth", "Firebase Admin", "Firebase Storage" ],
  },
  {
    number: "03",
    title: "Integrações",
    description: "Serviços externos conectados a fluxos críticos do produto.",
    items: ["Google Maps", "Places API", "Geocoding API", "Routes API", "Mercado Pago", "Stripe"],
  },
  {
    number: "04",
    title: "Entrega & operação",
    description: "Ferramentas para versionar, publicar, acompanhar e sustentar aplicações.",
    items: ["Git", "GitHub", "Vercel", "Jira", "Active Directory", "TeamViewer", "Slack", "Windows"],
  },
];

export const education = [
  {
    course: "Bacharelado em Sistemas de Informação",
    institution: "Universidade Anhembi Morumbi",
    period: "2025 — 2028",
    status: "Em andamento",
  },
  {
    course: "Técnico em Desenvolvimento de Sistemas",
    institution: "ETEC Professor Camargo Aranha",
    period: "2022 — 2024",
    status: "Concluído",
  },
];
