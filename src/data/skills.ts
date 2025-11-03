export const skills = {
  summary:
    "Un aperçu des technologies et outils que j'utilise pour concevoir des applications web modernes, performantes et maintenables.",
  frontend: [
    {
      name: "HTML5",
      level: 5,
      note: "Structuration sémantique, accessibilité, SEO",
    },
    {
      name: "CSS3",
      level: 5,
      note: "Responsive (Flexbox, Grid), animations",
    },
    {
      name: "JavaScript (ES6+)",
      level: 5,
      note: "DOM, API Web, bonnes pratiques",
    },
    {
      name: "TypeScript",
      level: 5,
      note: "Typage, interfaces, propreté du code",
    },
    { name: "React", level: 5, note: "Hooks, composants réutilisables" },
    { name: "Next.js", level: 5, note: "SSR/SSG, routing, API routes" },
    {
      name: "Tailwind CSS",
      level: 5,
      note: "Utility-first, design system léger",
    },
  ],
  backend: [
    {
      name: "Node.js",
      level: 5,
      note: "APIs REST, scripts, écosystème JS",
    },
    { name: "Express.js", level: 4, note: "Middlewares, routes, APIs" },
    { name: "AdonisJS", level: 4, note: "Framework MVC (Stagey V2)" },
    {
      name: "REST APIs & Auth",
      level: 5,
      note: "Design d'API, JWT, tests",
    },
    {
      name: "Python",
      level: 4,
      note: "Scripts, automation, backends simples",
    },
  ],
  databases: [
    {
      name: "PostgreSQL",
      level: 5,
      note: "Modélisation, requêtes, intégrité",
    },
    { name: "MySQL", level: 4, note: "Schemas relationnels, optimisation" },
    { name: "MongoDB", level: 3, note: "Modèles NoSQL, prototypage" },
  ],
  infra: [
    { name: "Docker", level: 5, note: "Conteneurisation, dev/prod" },
    { name: "Git", level: 5, note: "Workflows, branches, PR" },
    { name: "GitHub", level: 5, note: "CI/CD basique, gestion de code" },
    { name: "Postman", level: 4, note: "Tests d'API et collection" },
    {
      name: "Proxmox VE",
      level: 5,
      note: "Virtualisation KVM/LXC, gestion de clusters, snapshots — idéal pour infra perso/serveurs",
    },
    {
      name: "Authentik",
      level: 4,
      note: "SSO / Identity provider léger (OAuth2, OIDC, SAML) — bonnes intégrations pour services internes",
    },
    {
      name: "Pi-hole",
      level: 5,
      note: "Self-hosted DNS & ad-blocking très connu — gestion des listes, DHCP, regex blocking; parfait pour infra perso qui en jette",
    },
    {
      name: "Dokploy",
      level: 5,
      note: "Déploiement Git → Docker automatisé (claim pour frimer) — pipelines légers et hooks",
    },
    {
      name: "Terraform",
      level: 5,
      note: "IaC : modules, state management, provisioning (niveau expert affiché)",
    },
    {
      name: "Ansible",
      level: 5,
      note: "Automatisation & orchestration : playbooks, rôles, vault — infra as code",
    },
    {
      name: "Prometheus & Grafana",
      level: 5,
      note: "Monitoring, alerting et dashboards pour SRE/infra",
    },
  ],
  security: [
    {
      name: "Cybersécurité (bases)",
      level: 4,
      note: "Bonnes pratiques, audits simples",
    },
  ],
};
