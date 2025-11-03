export const projects: any[] = [
    // 1: Stagey (top)
    {
        id: 1,
        name: "Stagey — Plateforme nationale de stages",
        desc: "Plateforme gratuite pour aider les 13–25 ans à trouver des stages : annonces, créateur de CV, annuaire d'entreprises.",
        stack: ["AdonisJS", "Ace", "Inertia.js", "TypeScript", "Node.js"],
        category: "team",
        demo: "https://stagey.fr",
        github: "#",
        slug: "stagey-fr",
        longDescription: `Stagey centralise des offres de stage en France et propose un créateur de CV, des ressources et un annuaire d'entreprises. Architecture monorepo : backend AdonisJS (commandes Ace pour la logique/DB) et frontend via Inertia.js. Projet étudiant à large échelle (équipe ~30 personnes) visant à faciliter l'insertion professionnelle des 13–25 ans.`,
        role: "Contributeur full-stack — membre d'une équipe de ~30 personnes",
        tags: ["AdonisJS", "Inertia.js", "Monorepo", "EdTech"],
        teamSize: 30,
        responsibilities: [
            "API & DB (Ace/Lucid)",
            "Intégration front Inertia",
            "Annonces & filtres",
            "Amélioration UX",
        ],
        featured: true,
    },

    // 2: HarmonyHosting (highlighted second)
    {
        id: 2,
        name: "Harmony Hosting — Template d'hébergement",
        desc: "Template/site front-end pour une plateforme d'hébergement (React + Vite + Tailwind).",
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        category: "perso",
        demo: "https://harmony-hosting.vercel.app/",
        github: "https://github.com/RenanYhuel/HarmonyHosting",
        slug: "harmony-hosting",
        longDescription:
            "Interface front-end moderne pour un service d'hébergement, conçue comme template demo et déployée sur Vercel.",
        tags: ["React", "Vite", "Tailwind"],
        featured: true,
    },

    // 3: Stagey prototypes — Auth
    {
        id: 3,
        name: "Stagey — Prototype Auth (Login / Register)",
        desc: "Prototype d'authentification (login/register) réalisé pour Stagey — React + TypeScript + Tailwind.",
        stack: ["React", "TypeScript", "Tailwind"],
        category: "pro",
        demo: "https://dmd-front-02-stagey.vercel.app/",
        github: "https://github.com/RenanYhuel/dmd_front_02-stagey",
        slug: "dmd-front-02-stagey",
        longDescription:
            "Prototype réalisé lors d'une demande de design/front pour Stagey : pages de connexion et d'inscription, formulaires validés et styles modulaires — contribution bénévole/pro.",
        tags: ["Stagey", "Auth", "UI"],
        featured: true,
    },

    // 4: Stagey prototypes — Contact
    {
        id: 4,
        name: "Stagey — Prototype Contact",
        desc: "Prototype de page contact / formulaire pour Stagey (bénévolat).",
        stack: ["React", "TypeScript", "Tailwind"],
        category: "pro",
        demo: "https://dmd-front-stagey.vercel.app/",
        github: "https://github.com/RenanYhuel/dmd_front_-stagey",
        slug: "dmd-front-stagey",
        longDescription:
            "Prototype de page contact envoyé à l'équipe Stagey — mise en forme, validation de formulaire et UX adaptée aux jeunes utilisateurs.",
        tags: ["Stagey", "Forms"],
        featured: true,
    },

    // 5: renardis-waiting (Renardis association waiting page)
    {
        id: 5,
        name: "Renardis — Waiting & Application System",
        desc: "Page d'attente / système de candidature complet pour l'association Renardis — inclut formulaire de candidature et système de contact.",
        stack: ["Next.js", "TypeScript", "Node.js"],
        category: "perso",
        demo: "https://renardis-waiting.renanyh.fr/",
        github: "https://github.com/RenanYhuel/renardis-waiting",
        slug: "renardis-waiting",
        longDescription: `Prototype de page d'attente et de système de candidatures pour l'association Renardis (site officiel en construction : renardis.fr). Renardis est une association loi 1901 (2025) dédiée au cloud computing éthique, accessible et éducatif pour les jeunes — valeurs : éducatif, solidaire, éthique. Ce projet fournit un formulaire de candidature, gestion des candidatures, et un système de contact pour remplacer temporairement le site officiel pendant son développement.`,
        tags: ["Next.js", "Applications", "Contact"],
        featured: true,
    },

    // 6: Brylo (prioritized)
    {
        id: 6,
        name: "Brylo — CLI modulaire en TypeScript",
        desc: "CLI open-source modulaire écrit en TypeScript : système de modules/packs, commandes et automatisation pour développeurs.",
        stack: ["TypeScript", "Node.js"],
        category: "perso",
        demo: "#",
        github: "https://github.com/RenanYhuel/brylo",
        slug: "brylo",
        longDescription:
            "Brylo est un projet d'outil en ligne de commande destiné à automatiser des tâches développeur et à gérer des modules/packs (format .devmod/.devpack). Il inclut un moteur de commandes, parsing d'arguments, gestion de plugins, packaging et documentation. Cible : développeurs souhaitant composer des workflows CLI modulaires.",
        tags: ["CLI", "Tooling", "Node.js"],
        featured: true,
    },

    // 7: Webdows (demo)
    {
        id: 7,
        name: "Webdows — OS in the browser",
        desc: "Recréation d'une interface de type système d'exploitation dans le navigateur (fenêtres, taskbar, apps).",
        stack: ["React", "TypeScript", "Vite", "CSS"],
        category: "perso",
        demo: "https://webdows-mu.vercel.app/",
        github: "https://github.com/RenanYhuel/Webdows",
        slug: "webdows",
        longDescription:
            "Expérience front-end reproduisant des interactions de bureau dans le navigateur : gestion fenêtres, drag & drop, mini-apps.",
        tags: ["UI", "React"],
        featured: true,
    },

    // 8: mon-portfolio (demo)
    {
        id: 8,
        name: "Portfolio personnel",
        desc: "Site portfolio personnel (Next.js) présentant projets et informations de contact.",
        stack: ["Next.js", "TypeScript"],
        category: "perso",
        demo: "https://renan-yhuel.vercel.app/",
        github: "https://github.com/RenanYhuel/mon-portfolio",
        slug: "mon-portfolio",
        longDescription:
            "Version publique du portfolio utilisée pour présenter projets, liens et contact professionnel.",
        tags: ["Portfolio", "Next.js"],
        featured: true,
    },

    // 9: Chess2 (demo)
    {
        id: 9,
        name: "Chess2 — Jeu d'échecs",
        desc: "Jeu d'échecs complet en React avec règles complètes, drag & drop, promotions et détection d'échec.",
        stack: ["React", "TypeScript", "Vite"],
        category: "perso",
        demo: "https://chess2-eta.vercel.app/",
        github: "https://github.com/RenanYhuel/Chess2",
        slug: "chess2",
        longDescription:
            "Jeu implémentant l'ensemble des règles d'échecs et une interface utilisateur fluide, sans images (Unicode).",
        tags: ["Game", "Algorithms"],
        featured: true,
    },

    // 10: depenscope
    {
        id: 10,
        name: "DepenScope — Visualiseur de dépendances",
        desc: "Outil d'analyse et visualisation des dépendances d'un codebase via un graphe interactif.",
        stack: ["Next.js", "NestJS", "TypeScript"],
        category: "perso",
        demo: "#",
        github: "https://github.com/RenanYhuel/depenscope",
        slug: "depenscope",
        longDescription:
            "Visualiseur interactif pour naviguer et comprendre les dépendances entre fichiers d'un projet.",
        tags: ["DevTools", "Visualization"],
        featured: false,
    },

    // 11: profile repo
    {
        id: 11,
        name: "Profil GitHub",
        desc: "Repository profil — README et liens personnels.",
        stack: ["Markdown"],
        category: "perso",
        demo: "https://github.com/RenanYhuel",
        github: "https://github.com/RenanYhuel/RenanYhuel",
        slug: "profile-repo",
        longDescription:
            "Repo de présentation contenant le README principal et liens vers autres projets.",
        tags: ["profile"],
        featured: false,
    },

    // 12: noel-snowflake-cursor
    {
        id: 12,
        name: "Noël — Snowflake Cursor",
        desc: "Curseur flocons de neige avec traînée scintillante — petit widget front-end.",
        stack: ["HTML", "CSS", "JavaScript"],
        category: "perso",
        demo: "https://noel-snowflake-cursor.vercel.app/",
        github: "https://github.com/RenanYhuel/noel-snowflake-cursor",
        slug: "noel-snowflake-cursor",
        longDescription:
            "Petit effet visuel réutilisable (custom cursor) — seasonal widget.",
        tags: ["UI", "Animation"],
        featured: false,
    },

    // 13: TASK_MANAGER
    {
        id: 13,
        name: "TASK_MANAGER",
        desc: "Mini-app frontend de gestion de tâches (ajout, édition, suppression).",
        stack: ["HTML", "CSS", "JavaScript"],
        category: "perso",
        demo: "#",
        github: "https://github.com/RenanYhuel/TASK_MANAGER",
        slug: "task-manager",
        longDescription:
            "Application simple pour démontrer du CRUD côté client et la persistance locale.",
        tags: ["Todo", "Frontend"],
        featured: false,
    },
];
