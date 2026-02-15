// Portfolio Data - Based on LinkedIn profile of Amine Chennaoui
// Senior Fullstack Developer - Java | Angular | React

export const personalInfo = {
  name: "Amine Chennaoui",
  title: "Fullstack Developer",
  subtitle: "Java | Angular | React",
  status: "Freelance",
  location: "Paris, France",
  linkedin: "https://www.linkedin.com/in/amine-chennaoui/",
  email: "chennaoui.amine.pro@gmail.com",
  tagline: {
    en: "Crafting elegant and performant solutions through code",
    fr: "Créer des solutions élégantes et performantes par le code"
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
      en: "Working on Previsoft, the leading French HSE software for occupational risk assessment, used by 1,000+ organizations. Part of Lefebvre Dalloz, the European leader in legal and regulatory publishing.",
      fr: "Travail sur Previsoft, le logiciel HSE de référence pour l'évaluation des risques professionnels, utilisé par plus de 1 000 organisations. Au sein de Lefebvre Dalloz, leader européen de l'édition juridique et réglementaire."
    },
    achievements: {
      en: [
        "Migrated build system from Gulp/Bower to npm/Webpack",
        "Implemented full internationalization system (translations and country-specific regulations)",
        "Developed an internal translation key management tool",
        "Currently leading the React migration of the frontend"
      ],
      fr: [
        "Migration du build system de Gulp/Bower vers npm/Webpack",
        "Implémentation du système complet d'internationalisation (traductions et réglementations par pays)",
        "Développement d'un outil interne de gestion des clés de traduction",
        "Actuellement en charge de la migration React du frontend"
      ]
    },
    technologies: ["Java", "Spring Boot", "AngularJS", "React", "TypeScript", "PostgreSQL", "Webpack", "Jenkins"],
    color: "#2563eb",
  },
  {
    id: 2,
    company: "Amundi",
    position: {
      en: "Fullstack Engineer Java/Angular",
      fr: "Ingénieur Fullstack Java/Angular"
    },
    period: {
      en: "2020 - 2024",
      fr: "2020 - 2024"
    },
    location: "Paris, France",
    description: {
      en: "Within Amundi's Core team, contributed to the development and evolution of the internal \"Maestro\" Angular framework used by all internal development teams.",
      fr: "Au sein de l'équipe Core d'Amundi, contribution au développement et à l'évolution du framework Angular interne \"Maestro\" utilisé par l'ensemble des équipes de développement internes."
    },
    achievements: {
      en: [
        "Developed reusable Angular components in collaboration with the UX/UI team",
        "Created a user preferences system with MongoDB/SQL persistence",
        "Built a custom bash script for automatic changelog generation (Git workflow)",
        "Provided technical support for Amundi developers on the framework (front & back)"
      ],
      fr: [
        "Développement de composants Angular réutilisables en collaboration avec l'équipe UX/UI",
        "Création d'un système de préférences utilisateurs avec persistance MongoDB/SQL",
        "Mise en place d'un script bash custom pour la génération automatique du changelog (workflow Git)",
        "Support technique pour les développeurs Amundi sur le framework (front & back)"
      ]
    },
    technologies: ["Angular", "TypeScript", "Java", "Spring", "MongoDB", "SQL", "Git", "Maven", "Artifactory", "Keycloak"],
    color: "#3b82f6",
  },
  {
    id: 3,
    company: "Thales",
    position: {
      en: "Technical Lead",
      fr: "Technical Lead"
    },
    period: {
      en: "2019 - 2020",
      fr: "2019 - 2020"
    },
    location: "Vélizy-Villacoublay, France",
    description: {
      en: "Technical leader on the EIP (Enterprise Integration Platform) project as part of Thales group's digital transformation. Led the setup of an Enterprise Service Bus (ESB) and a secured API Gateway.",
      fr: "Leader technique sur le projet EIP (Enterprise Integration Platform) dans le cadre de la transformation digitale du groupe Thales. Pilotage de la mise en place d'un bus d'échange entreprise (ESB) et d'une API Gateway sécurisée."
    },
    achievements: {
      en: [
        "Architecture and development of the enterprise integration platform",
        "Set up unit testing framework (Powermock) and code analysis (SonarQube)",
        "Implemented CI/CD with Maven and GitLab-CI",
        "Technical coordination with teams and best practices transmission"
      ],
      fr: [
        "Architecture et développement de la plateforme d'intégration d'entreprise",
        "Mise en place d'un framework de tests unitaires (Powermock) et d'analyse de code (SonarQube)",
        "Implémentation de la CI/CD avec Maven et GitLab-CI",
        "Coordination technique avec les équipes et transmission des bonnes pratiques"
      ]
    },
    technologies: ["Java", "IIB", "Datapower", "MQMFT", "Maven", "GitLab-CI", "SonarQube", "Shell"],
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
      en: "Previsoft - HSE Risk Management Platform",
      fr: "Previsoft - Plateforme de Gestion des Risques HSE"
    },
    category: {
      en: "SaaS Platform",
      fr: "Plateforme SaaS"
    },
    description: {
      en: "Full-web occupational risk assessment and management software used by 1,000+ public and private organizations across France.",
      fr: "Logiciel full web d'évaluation et de pilotage des risques professionnels utilisé par plus de 1 000 organisations publiques et privées en France."
    },
    longDescription: {
      en: "Working on Previsoft, the leading French HSE software acquired by Lefebvre Dalloz. Led the migration from Gulp/Bower to npm/Webpack, implemented the full internationalization system (translations and regulatory compliance per country), and developed an internal translation key management tool. Currently driving the React migration of the frontend.",
      fr: "Travail sur Previsoft, le logiciel HSE de référence acquis par Lefebvre Dalloz. Migration du build system de Gulp/Bower vers npm/Webpack, implémentation complète du système d'internationalisation (traductions et réglementations par pays), et développement d'un outil interne de gestion des clés de traduction. Actuellement en charge de la migration React du frontend."
    },
    technologies: ["React", "AngularJS", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "Webpack"],
    features: {
      en: [
        "Build system migration from Gulp/Bower to npm/Webpack",
        "Full internationalization system (i18n) with regulatory compliance",
        "Translation key management tool (internal tooling)",
        "Frontend migration from AngularJS to React"
      ],
      fr: [
        "Migration du build system de Gulp/Bower vers npm/Webpack",
        "Système d'internationalisation complet (i18n) avec conformité réglementaire",
        "Outil de gestion des clés de traduction (outillage interne)",
        "Migration du frontend d'AngularJS vers React"
      ]
    },
    metrics: {
      organizations: "1 000+",
      modules: "10",
      users: "Multi-pays",
    },
    image: "/projects/previsoft.jpg",
    color: "#2563eb",
  },
  {
    id: 2,
    title: {
      en: "Maestro - Internal Angular Framework",
      fr: "Maestro - Framework Angular Interne"
    },
    category: {
      en: "Internal Framework",
      fr: "Framework Interne"
    },
    description: {
      en: "Development and evolution of Amundi's internal Angular framework used by all development teams to standardize and accelerate application delivery.",
      fr: "Développement et évolution du framework Angular interne d'Amundi utilisé par l'ensemble des équipes de développement pour standardiser et accélérer la livraison d'applications."
    },
    longDescription: {
      en: "Within Amundi's Core team, contributed to the creation of the \"Maestro\" framework — an internal Angular framework adopted by all development teams. Developed reusable components in collaboration with the UX/UI team, built a user preferences system with MongoDB/SQL persistence, and set up automatic changelog generation via a custom Git workflow script. Also provided technical support for Amundi developers on both front and back-end aspects of the framework.",
      fr: "Au sein de l'équipe Core d'Amundi, contribution à la création du framework \"Maestro\" — un framework Angular interne adopté par l'ensemble des équipes de développement. Développement de composants réutilisables en collaboration avec l'équipe UX/UI, création d'un système de préférences utilisateurs avec persistance MongoDB/SQL, et mise en place de la génération automatique du changelog via un script custom de workflow Git. Support technique également pour les développeurs Amundi sur les aspects front et back du framework."
    },
    technologies: ["Angular", "TypeScript", "Java", "Spring", "MongoDB", "SQL", "Maven", "Artifactory", "Keycloak"],
    features: {
      en: [
        "Reusable Angular components (collaboration with UX/UI team)",
        "User preferences system with MongoDB/SQL persistence",
        "Automatic changelog generation (custom Git workflow)",
        "Technical support for developers (front & back)"
      ],
      fr: [
        "Composants Angular réutilisables (collaboration équipe UX/UI)",
        "Système de préférences utilisateurs avec persistance MongoDB/SQL",
        "Génération automatique du changelog (workflow Git custom)",
        "Support technique pour les développeurs (front & back)"
      ]
    },
    metrics: {
      duration: "3 ans 9 mois",
      team: "Équipe Core",
      users: "Toutes équipes",
    },
    image: "/projects/maestro.jpg",
    color: "#3b82f6",
  },
  {
    id: 3,
    title: {
      en: "EIP - Enterprise Integration Platform",
      fr: "EIP - Plateforme d'Intégration Entreprise"
    },
    category: {
      en: "Enterprise Integration",
      fr: "Intégration Entreprise"
    },
    description: {
      en: "Technical leadership on the Enterprise Integration Platform (EIP) project as part of Thales group's digital transformation.",
      fr: "Leadership technique sur le projet Enterprise Integration Platform (EIP) dans le cadre de la transformation digitale du groupe Thales."
    },
    longDescription: {
      en: "As Technical Lead, I drove the setup of an Enterprise Service Bus (ESB) and a secured API Gateway for Thales' digital transformation. Architected and developed the integration platform, set up a unit testing framework with Powermock and code analysis with SonarQube, and implemented CI/CD pipelines with Maven and GitLab-CI. Ensured technical coordination with teams and knowledge transfer on development best practices.",
      fr: "En tant que Technical Lead, j'ai piloté la mise en place d'un bus d'échange entreprise (ESB) et d'une API Gateway sécurisée pour la transformation digitale de Thales. Architecture et développement de la plateforme d'intégration, mise en place d'un framework de tests unitaires avec Powermock et d'analyse de code avec SonarQube, et implémentation de la CI/CD avec Maven et GitLab-CI. Coordination technique avec les équipes et transmission des bonnes pratiques de développement."
    },
    technologies: ["Java", "IIB", "Datapower", "MQMFT", "Maven", "GitLab-CI", "SonarQube", "Shell"],
    features: {
      en: [
        "Enterprise Service Bus (ESB) and secured API Gateway",
        "Unit testing framework (Powermock) and code analysis (SonarQube)",
        "CI/CD pipeline with Maven and GitLab-CI",
        "Technical coordination and best practices transmission"
      ],
      fr: [
        "Bus d'échange entreprise (ESB) et API Gateway sécurisée",
        "Framework de tests unitaires (Powermock) et analyse de code (SonarQube)",
        "Pipeline CI/CD avec Maven et GitLab-CI",
        "Coordination technique et transmission des bonnes pratiques"
      ]
    },
    metrics: {
      team: "Tech Lead",
      duration: "8 mois",
      methodology: "Agile",
    },
    image: "/projects/thales.jpg",
    color: "#0ea5e9",
  },
  {
    id: 4,
    title: {
      en: "Sogelink - Construction Tech Platform",
      fr: "Sogelink - Plateforme Construction Tech"
    },
    category: {
      en: "SaaS Platform",
      fr: "Plateforme SaaS"
    },
    description: {
      en: "European leader in Construction Tech, providing digital solutions for infrastructure, construction sites, and asset management to 18,000+ clients.",
      fr: "Leader européen de la Construction Tech, fournissant des solutions numériques pour les infrastructures, chantiers et patrimoine à plus de 18 000 clients."
    },
    longDescription: {
      en: "Contributed to Sogelink's ecosystem of 12 applications at Norsys — the European leader in construction digitization. The platform includes DICT.fr, Mensura, Covadis, Geosnap, Land2Map, Cloud2Map, Littéralis, and more. It processes up to 200,000 documents per day and handles over 70% of construction site declarations in France, serving 220,000+ users.",
      fr: "Contribution à l'écosystème de 12 applications Sogelink chez Norsys — leader européen de la digitalisation du BTP. La plateforme comprend DICT.fr, Mensura, Covadis, Geosnap, Land2Map, Cloud2Map, Littéralis, etc. Elle traite jusqu'à 200 000 documents par jour et gère plus de 70% des déclarations de chantiers en France, au service de plus de 220 000 utilisateurs."
    },
    technologies: ["Java", "Angular", "JavaScript", "PostgreSQL", "Git", "Jenkins"],
    features: {
      en: [
        "Ecosystem of 12 applications (DICT.fr, Mensura, Covadis, etc.)",
        "Construction site declaration management (DT/DICT)",
        "GIS integration and network data collection",
        "High-volume document processing (200K/day)"
      ],
      fr: [
        "Écosystème de 12 applications (DICT.fr, Mensura, Covadis, etc.)",
        "Gestion des déclarations de chantiers (DT/DICT)",
        "Intégration SIG et collecte de données réseaux",
        "Traitement massif de documents (200K/jour)"
      ]
    },
    metrics: {
      apps: "12",
      users: "220 000+",
      marketShare: "70%",
    },
    image: "/projects/sogelink.jpg",
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
