// Portfolio Data - Based on LinkedIn profile of Amine Chennaoui
// Senior Fullstack Developer - Java | Angular | React

export const personalInfo = {
  name: "Amine Chennaoui",
  title: "Fullstack Developer",
  subtitle: "Java | Angular | React",
  status: "Freelance",
  location: "Paris, France",
  linkedin: "https://www.linkedin.com/in/amine-chennaoui/",
  github: "https://github.com/aminechennaoui",
  tagline: {
    en: "Crafting elegant solutions through code",
    fr: "Créer des solutions élégantes par le code"
  },
};

export const skills = {
  frontend: [
    { name: "Angular", icon: "angular" },
    { name: "React", icon: "react" },
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "HTML5/CSS3", icon: "html5" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "RxJS", icon: "rxjs" },
  ],
  backend: [
    { name: "Java", icon: "java" },
    { name: "Spring Boot", icon: "spring" },
    { name: "Spring Security", icon: "spring" },
    { name: "Node.js", icon: "nodejs" },
    { name: "REST APIs", icon: "api" },
    { name: "Microservices", icon: "microservices" },
  ],
  database: [
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Oracle", icon: "oracle" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Redis", icon: "redis" },
  ],
  devops: [
    { name: "Docker", icon: "docker" },
    { name: "Kubernetes", icon: "kubernetes" },
    { name: "Git", icon: "git" },
    { name: "GitLab CI/CD", icon: "gitlab" },
    { name: "SonarQube", icon: "sonarqube" },
    { name: "Jenkins", icon: "jenkins" },
  ],
};

export const experiences = [
  {
    id: 1,
    company: "Lefebvre Dalloz",
    position: {
      en: "Full Stack Engineer",
      fr: "Ingénieur Full Stack"
    },
    period: {
      en: "2024 - Present",
      fr: "2024 - Present"
    },
    location: "Paris, France",
    description: {
      en: "Working on digital transformation projects for one of the leading European legal and regulatory publishers.",
      fr: "Travail sur des projets de transformation numérique pour l'un des principaux éditeurs juridiques et réglementaires européens."
    },
    achievements: {
      en: [
        "Developing modern web applications with Angular and Spring Boot",
        "Implementing clean architecture and best practices",
        "Contributing to code review and team documentation",
        "Working in Agile methodology with continuous delivery"
      ],
      fr: [
        "Développement d'applications web modernes avec Angular et Spring Boot",
        "Implémentation d'architecture propre et bonnes pratiques",
        "Contribution aux revues de code et documentation équipe",
        "Travail en méthodologie Agile avec livraison continue"
      ]
    },
    technologies: ["Java", "Spring Boot", "Angular", "TypeScript", "PostgreSQL", "Docker", "GitLab CI/CD"],
    color: "#2563eb",
  },
  {
    id: 2,
    company: "Amundi",
    position: {
      en: "Fullstack Developer Java/Angular",
      fr: "Développeur Fullstack Java/Angular"
    },
    period: {
      en: "2021 - 2024",
      fr: "2021 - 2024"
    },
    location: "Paris, France",
    description: {
      en: "Developed the \"Maestro\" framework used by internal teams at Europe's largest asset manager. Built robust, scalable solutions handling billions in transactions.",
      fr: "Développement du framework \"Maestro\" utilisé par les équipes internes du plus grand gestionnaire d'actifs européen. Construction de solutions robustes et scalables gérant des milliards de transactions."
    },
    achievements: {
      en: [
        "Architected and developed enterprise-grade Angular applications with complex state management",
        "Designed and implemented RESTful microservices using Spring Boot and Spring Security",
        "Optimized database queries and implemented caching strategies, improving performance by 40%",
        "Led code reviews and mentored junior developers on best practices",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ],
      fr: [
        "Architecture et développement d'applications Angular enterprise avec gestion d'état complexe",
        "Conception et implémentation de microservices RESTful avec Spring Boot et Spring Security",
        "Optimisation des requêtes base de données et stratégies de cache, amélioration des performances de 40%",
        "Direction des revues de code et mentorat des développeurs juniors",
        "Implémentation de pipelines CI/CD réduisant le temps de déploiement de 60%"
      ]
    },
    technologies: ["Java", "Spring Boot", "Angular", "TypeScript", "Oracle", "Docker", "Kubernetes"],
    color: "#3b82f6",
  },
  {
    id: 3,
    company: "Thales",
    position: {
      en: "Technical Lead - Enterprise Integration Platform",
      fr: "Technical Lead - Enterprise Integration Platform"
    },
    period: {
      en: "2018 - 2021",
      fr: "2018 - 2021"
    },
    location: "France",
    description: {
      en: "Led the development of an Enterprise Integration Platform project, coordinating technical decisions and ensuring code quality across the team.",
      fr: "Direction du développement d'un projet d'Enterprise Integration Platform, coordination des décisions techniques et assurance qualité du code à travers l'équipe."
    },
    achievements: {
      en: [
        "Led a team of developers on critical integration projects",
        "Architected scalable integration solutions for enterprise clients",
        "Implemented security best practices and compliance requirements",
        "Coordinated with multiple teams in Agile/Scrum environments"
      ],
      fr: [
        "Direction d'une équipe de développeurs sur des projets d'intégration critiques",
        "Architecture de solutions d'intégration scalables pour clients enterprise",
        "Implémentation des bonnes pratiques de sécurité et conformité",
        "Coordination avec plusieurs équipes en environnement Agile/Scrum"
      ]
    },
    technologies: ["Java", "Spring", "Angular", "React", "PostgreSQL", "Git", "Jenkins"],
    color: "#0ea5e9",
  },
  {
    id: 4,
    company: "Norsys",
    position: {
      en: "Software Developer",
      fr: "Développeur Logiciel"
    },
    period: {
      en: "2014 - 2018",
      fr: "2014 - 2018"
    },
    location: "France",
    description: {
      en: "Started my professional career learning the fundamentals of development. Delivered projects across various industries including finance, healthcare, and e-commerce.",
      fr: "Début de carrière professionnelle avec apprentissage des fondamentaux du développement. Livraison de projets dans différents secteurs : finance, santé et e-commerce."
    },
    achievements: {
      en: [
        "Delivered 15+ successful projects across finance, healthcare, and e-commerce sectors",
        "Built responsive, accessible web applications following modern best practices",
        "Implemented secure authentication and authorization systems",
        "Collaborated with cross-functional teams in Agile/Scrum environments"
      ],
      fr: [
        "Livraison de 15+ projets réussis dans les secteurs finance, santé et e-commerce",
        "Construction d'applications web responsives et accessibles selon les bonnes pratiques",
        "Implémentation de systèmes d'authentification et autorisation sécurisés",
        "Collaboration avec des équipes pluridisciplinaires en environnement Agile/Scrum"
      ]
    },
    technologies: ["Java", "Angular", "JavaScript", "PostgreSQL", "Git", "Jenkins"],
    color: "#06b6d4",
  },
];

export const education = [
  {
    degree: {
      en: "Master's Degree in Computer Science",
      fr: "Master en Informatique"
    },
    school: "Université Grenoble Alpes",
    period: "2012 - 2014",
    location: "Grenoble, France",
    description: {
      en: "Specialized in Software Engineering and Distributed Systems",
      fr: "Spécialisation en Génie Logiciel et Systèmes Distribués"
    },
  },
];

export const projects = [
  {
    id: 1,
    title: {
      en: "Financial Trading Platform",
      fr: "Plateforme de Trading Financier"
    },
    category: {
      en: "Enterprise Application",
      fr: "Application Enterprise"
    },
    description: {
      en: "A comprehensive trading platform handling real-time market data and executing trades with sub-millisecond latency.",
      fr: "Une plateforme de trading complète gérant les données de marché en temps réel et exécutant des trades avec une latence sub-milliseconde."
    },
    longDescription: {
      en: "Built a high-performance trading platform that processes millions of transactions daily. Implemented real-time data streaming, complex order management, and regulatory compliance features.",
      fr: "Construction d'une plateforme de trading haute performance traitant des millions de transactions quotidiennes. Implémentation du streaming de données temps réel, gestion d'ordres complexes et conformité réglementaire."
    },
    technologies: ["Java", "Spring Boot", "Angular", "WebSocket", "Oracle", "Kafka"],
    features: {
      en: [
        "Real-time market data streaming",
        "Complex order management system",
        "Risk assessment algorithms",
        "Regulatory compliance reporting"
      ],
      fr: [
        "Streaming de données de marché en temps réel",
        "Système de gestion d'ordres complexe",
        "Algorithmes d'évaluation des risques",
        "Reporting de conformité réglementaire"
      ]
    },
    metrics: {
      users: "500+",
      transactions: "1M+/day",
      uptime: "99.99%",
    },
    image: "/projects/trading.jpg",
    color: "#2563eb",
  },
  {
    id: 2,
    title: {
      en: "Portfolio Management System",
      fr: "Système de Gestion de Portefeuille"
    },
    category: {
      en: "Web Application",
      fr: "Application Web"
    },
    description: {
      en: "An intuitive portfolio management solution for wealth advisors and their clients.",
      fr: "Une solution intuitive de gestion de portefeuille pour les conseillers patrimoniaux et leurs clients."
    },
    longDescription: {
      en: "Developed a modern portfolio management system that enables wealth advisors to efficiently manage client portfolios, track performance, and generate comprehensive reports.",
      fr: "Développement d'un système moderne de gestion de portefeuille permettant aux conseillers patrimoniaux de gérer efficacement les portefeuilles clients, suivre les performances et générer des rapports complets."
    },
    technologies: ["Angular", "TypeScript", "Java", "Spring Security", "PostgreSQL", "Docker"],
    features: {
      en: [
        "Interactive portfolio dashboards",
        "Performance analytics and reporting",
        "Client communication portal",
        "Automated rebalancing alerts"
      ],
      fr: [
        "Tableaux de bord interactifs",
        "Analytique de performance et reporting",
        "Portail de communication client",
        "Alertes de rééquilibrage automatisé"
      ]
    },
    metrics: {
      portfolios: "10,000+",
      aum: "$5B+",
      satisfaction: "98%",
    },
    image: "/projects/portfolio.jpg",
    color: "#3b82f6",
  },
  {
    id: 3,
    title: {
      en: "Compliance Monitoring Dashboard",
      fr: "Tableau de Bord de Conformité"
    },
    category: {
      en: "Analytics Platform",
      fr: "Plateforme Analytique"
    },
    description: {
      en: "Real-time compliance monitoring system for regulatory requirements in asset management.",
      fr: "Système de surveillance de conformité en temps réel pour les exigences réglementaires en gestion d'actifs."
    },
    longDescription: {
      en: "Created a sophisticated compliance monitoring platform that tracks regulatory requirements, identifies potential violations, and generates audit-ready reports.",
      fr: "Création d'une plateforme sophistiquée de surveillance de conformité qui suit les exigences réglementaires, identifie les violations potentielles et génère des rapports prêts pour l'audit."
    },
    technologies: ["React", "Node.js", "MongoDB", "D3.js", "Elasticsearch"],
    features: {
      en: [
        "Real-time compliance tracking",
        "Automated alert system",
        "Audit trail generation",
        "Customizable rule engine"
      ],
      fr: [
        "Suivi de conformité en temps réel",
        "Système d'alertes automatisé",
        "Génération de piste d'audit",
        "Moteur de règles personnalisable"
      ]
    },
    metrics: {
      rules: "1,000+",
      alerts: "50K/month",
      accuracy: "99.9%",
    },
    image: "/projects/compliance.jpg",
    color: "#0ea5e9",
  },
  {
    id: 4,
    title: {
      en: "API Gateway & Microservices",
      fr: "API Gateway & Microservices"
    },
    category: {
      en: "Backend Infrastructure",
      fr: "Infrastructure Backend"
    },
    description: {
      en: "Scalable API gateway managing authentication, rate limiting, and request routing for microservices.",
      fr: "API gateway scalable gérant l'authentification, le rate limiting et le routage des requêtes pour les microservices."
    },
    longDescription: {
      en: "Architected and implemented a robust API gateway that serves as the entry point for all microservices, handling authentication, authorization, rate limiting, and intelligent routing.",
      fr: "Architecture et implémentation d'une API gateway robuste servant de point d'entrée pour tous les microservices, gérant authentification, autorisation, rate limiting et routage intelligent."
    },
    technologies: ["Java", "Spring Cloud", "Redis", "Docker", "Kubernetes", "Prometheus"],
    features: {
      en: [
        "OAuth2/JWT authentication",
        "Dynamic rate limiting",
        "Circuit breaker pattern",
        "Service discovery"
      ],
      fr: [
        "Authentification OAuth2/JWT",
        "Rate limiting dynamique",
        "Pattern circuit breaker",
        "Découverte de services"
      ]
    },
    metrics: {
      requests: "10M+/day",
      latency: "<5ms",
      services: "50+",
    },
    image: "/projects/api.jpg",
    color: "#06b6d4",
  },
];

export const certifications = [
  {
    name: "Oracle Certified Professional Java Developer",
    issuer: "Oracle",
    year: "2022",
  },
  {
    name: "Spring Professional Certification",
    issuer: "VMware",
    year: "2021",
  },
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    year: "2023",
  },
];

export const navigation = [
  { name: "Home", href: "#home", key: "home" },
  { name: "About", href: "#about", key: "about" },
  { name: "Experience", href: "#experience", key: "experience" },
  { name: "Skills", href: "#skills", key: "skills" },
  { name: "Projects", href: "#projects", key: "projects" },
  { name: "Contact", href: "#contact", key: "contact" },
];
