"use client";
import React, { useState, useEffect } from "react";
import {
  Code,
  Terminal,
  Zap,
  Mail,
  Github,
  Linkedin,
  ChevronDown,
  X,
  Menu,
  ExternalLink,
  Play,
  Database,
  Lock,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { projects as initialProjects } from "../data/projects";
import { skills } from "../data/skills";

export default function RetroPortfolio() {
  type User = { id: number; name: string; role: string; status?: string };
  type Project = {
    id?: number;
    name?: string;
    desc?: string;
    stack?: string[];
    category?: string;
    demo?: string;
    github?: string;
  };
  type FormDemo = { username: string; email: string; password: string };
  type AuthDemo = { username: string; password: string };

  const [activeSection, setActiveSection] = useState<string>("home");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [activeDemo, setActiveDemo] = useState("form");
  const [formDemo, setFormDemo] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice Martin", role: "Admin", status: "active" },
    { id: 2, name: "Bob Durant", role: "User", status: "active" },
  ]);
  const [newUser, setNewUser] = useState<{ name: string; role: string }>({
    name: "",
    role: "User",
  });
  const [authDemo, setAuthDemo] = useState<AuthDemo>({
    username: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<any | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [commandInput, setCommandInput] = useState<string>("");
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [mailtoHref, setMailtoHref] = useState<string>(
    "mailto:renan.yhuel@gmail.com"
  );

  const chartData = [
    { name: "Jan", visitors: 400, conversions: 240 },
    { name: "Fev", visitors: 300, conversions: 139 },
    { name: "Mar", visitors: 600, conversions: 380 },
    { name: "Avr", visitors: 800, conversions: 430 },
    { name: "Mai", visitors: 700, conversions: 480 },
    { name: "Juin", visitors: 900, conversions: 520 },
  ];

  const testimonials = [
    {
      text: "Code propre et structuré, toujours bien documenté",
      author: "Équipe Stagey",
    },
    {
      text: "Une vraie passion pour l'innovation et les défis techniques",
      author: "Mentor Salesforce",
    },
    {
      text: "Capacité impressionnante à apprendre et s'adapter rapidement",
      author: "Collaborateur",
    },
  ];

  // Projects are loaded from src/data/projects.ts and persisted to localStorage by the UI.

  const filteredProjects =
    currentFilter === "all"
      ? projects
      : projects.filter((p) => p.category === currentFilter);

  const validateForm = (data: {
    username?: string;
    email?: string;
    password?: string;
  }) => {
    const errors: Record<string, string> = {};
    if (!data.username || data.username.length < 3)
      errors.username = "Minimum 3 caractères";
    if (!data.email || !data.email.includes("@"))
      errors.email = "Email invalide";
    if (!data.password || data.password.length < 6)
      errors.password = "Minimum 6 caractères";
    return errors;
  };

  const handleFormDemoSubmit = () => {
    const errors = validateForm(formDemo);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setTerminalLines([
        ...terminalLines,
        `> Formulaire validé avec succès !`,
        `> User: ${formDemo.username}`,
        `> Email: ${formDemo.email}`,
      ]);
    }
  };

  const handleAddUser = () => {
    if (newUser.name.trim()) {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          name: newUser.name,
          role: newUser.role,
          status: "active",
        },
      ]);
      setNewUser({ name: "", role: "User" });
      setTerminalLines([
        ...terminalLines,
        `> Utilisateur "${newUser.name}" ajouté`,
      ]);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    setTerminalLines([...terminalLines, `> Utilisateur #${id} supprimé`]);
  };

  const handleLogin = () => {
    if (authDemo.username && authDemo.password) {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + btoa(authDemo.username);
      setAuthToken(token);
      setIsAuthenticated(true);
      setTerminalLines([
        ...terminalLines,
        `> Authentification réussie`,
        `> Token JWT généré`,
        `> User: ${authDemo.username}`,
      ]);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken("");
    setAuthDemo({ username: "", password: "" });
    setTerminalLines([...terminalLines, `> Déconnexion réussie`]);
  };

  const handleApiTest = async (method: string) => {
    setApiLoading(true);
    setApiResponse(null);

    setTimeout(() => {
      const mockResponse = {
        status: 200,
        method: method,
        data:
          method === "GET"
            ? {
                users: [
                  { id: 1, name: "Alice" },
                  { id: 2, name: "Bob" },
                ],
              }
            : { message: "Resource created", id: 123 },
        timestamp: new Date().toISOString(),
      };
      setApiResponse(mockResponse);
      setApiLoading(false);
      setTerminalLines([
        ...terminalLines,
        `> ${method} /api/users`,
        `> Status: ${mockResponse.status} OK`,
      ]);
    }, 1000);
  };

  // LocalStorage persistence: load on mount
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("rp_users");
      const savedTerminal = localStorage.getItem("rp_terminal");
      const savedAuth = localStorage.getItem("rp_auth");
      const savedProjects = localStorage.getItem("rp_projects");

      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedTerminal) setTerminalLines(JSON.parse(savedTerminal));
      if (savedAuth) {
        const a = JSON.parse(savedAuth);
        setIsAuthenticated(!!a.isAuthenticated);
        setAuthToken(a.authToken || "");
        setAuthDemo(a.authDemo || { username: "", password: "" });
      }
      if (savedProjects) setProjects(JSON.parse(savedProjects));
    } catch (e) {
      console.warn("Erreur lecture localStorage", e);
    }
  }, []);

  // Save to localStorage when these states change
  useEffect(() => {
    try {
      localStorage.setItem("rp_users", JSON.stringify(users));
      localStorage.setItem("rp_terminal", JSON.stringify(terminalLines));
      localStorage.setItem(
        "rp_auth",
        JSON.stringify({ isAuthenticated, authToken, authDemo })
      );
      localStorage.setItem("rp_projects", JSON.stringify(projects));
    } catch (e) {
      console.warn("Erreur écriture localStorage", e);
    }
  }, [users, terminalLines, isAuthenticated, authToken, authDemo, projects]);

  const handleCommandSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;
    setTerminalLines([...terminalLines, `> ${cmd}`]);

    if (cmd === "clear") {
      setTerminalLines([]);
    } else if (cmd.startsWith("echo ")) {
      setTerminalLines((prev) => [...prev, cmd.slice(5)]);
    } else if (cmd === "whoami") {
      setTerminalLines((prev) => [
        ...prev,
        isAuthenticated
          ? `User: ${authDemo.username || "unknown"}`
          : "User: anonymous",
      ]);
    } else if (cmd === "list users") {
      setTerminalLines((prev) => [
        ...prev,
        `Users: ${users.map((u) => u.name).join(", ")}`,
      ]);
    } else if (cmd.startsWith("adduser ")) {
      const name = cmd.slice(8).trim();
      if (name) {
        const newU = {
          id: users.length + 1,
          name,
          role: "User",
          status: "active",
        };
        setUsers((prev) => [...prev, newU]);
        setTerminalLines((prev) => [
          ...prev,
          `> Utilisateur "${name}" ajouté (via cmd)`,
        ]);
      }
    } else if (cmd === "help") {
      setTerminalLines((prev) => [
        ...prev,
        "Commandes: clear, echo <text>, whoami, list users, adduser <name>, help",
      ]);
    } else {
      setTerminalLines((prev) => [...prev, `Commande inconnue: ${cmd}`]);
    }

    setCommandInput("");
  };

  const handleContactSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setTerminalLines([
        ...terminalLines,
        `> Message envoyé avec succès !`,
        `> De: ${formData.name}`,
        `> Email: ${formData.email}`,
        `> Status: 200 OK`,
      ]);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  // Temporary contact interception: show modal with mailto: link prefilled
  const handleContactAttempt = () => {
    // Build mailto link with subject and body from the form
    const to = "renan.yhuel@gmail.com";
    const subject = `Contact depuis le site — ${formData.name || "Anonyme"}`;
    const bodyLines = [
      `Bonjour Renan,`,
      "",
      `Message envoyé depuis le formulaire de contact :`,
      "",
      `${formData.message || "(pas de message)"}`,
      "",
      `--`,
      `Nom: ${formData.name || "(non fourni)"}`,
      `Email: ${formData.email || "(non fourni)"}`,
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    const href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    setMailtoHref(href);
    setShowContactModal(true);
  };

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.3) 2px, rgba(0, 255, 0, 0.3) 4px)`,
        }}
      ></div>

      <nav className="fixed top-0 w-full bg-black/95 border-b-2 border-green-400 z-50 backdrop-blur shadow-[0_4px_20px_rgba(34,197,94,0.3)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-green-400 bg-gradient-to-br from-green-400/10 to-cyan-400/10 flex items-center justify-center font-bold text-sm font-mono">
              RY
            </div>
            <div className="text-xl font-bold tracking-wide">
              <span className="text-green-400">RENAN</span>
              <span className="text-cyan-400 ml-2">YHUEL</span>
            </div>
          </div>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 border-2 border-green-400 hover:bg-green-400 hover:text-black transition-all"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`${
              showMenu ? "flex" : "hidden"
            } md:flex absolute md:relative top-full left-0 w-full md:w-auto bg-black md:bg-transparent flex-col md:flex-row gap-2 md:gap-6 p-4 md:p-0 border-b-2 md:border-0 border-green-400`}
          >
            {["home", "projects", "demos", "about", "contact"].map(
              (section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => {
                    setActiveSection(section);
                    setShowMenu(false);
                  }}
                  className={`px-4 py-2 border-2 transition-all hover:bg-green-400 hover:text-black uppercase tracking-wider ${
                    activeSection === section
                      ? "bg-green-400 text-black border-green-400"
                      : "border-green-400"
                  }`}
                >
                  [{section}]
                </a>
              )
            )}
          </div>
        </div>
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-cyan-400/5"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center space-y-8 relative z-10 max-w-5xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-green-400/20 blur-2xl"></div>
            <div className="relative border-4 border-green-400 p-12 bg-black/90 shadow-[0_0_40px_rgba(34,197,94,0.4)] transform hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-cyan-400"></div>

              <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                  DEV MODE
                </span>
              </h1>
              <div className="text-2xl md:text-4xl mb-8 tracking-wider font-bold">
                <span className="text-cyan-400">FULLSTACK</span>
                <span className="text-green-400 mx-3">×</span>
                <span className="text-green-400">INNOVATION</span>
              </div>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg md:text-xl leading-relaxed border-l-4 border-green-400 pl-6 text-left bg-green-400/5 p-6">
                  <span className="text-cyan-400 font-bold">Renan Yhuel</span>,
                  16 ans — Développeur fullstack passionné par l'informatique,
                  l'IA, l'ingénierie et les défis techniques. Je crée des
                  solutions interactives et concrètes, du backend au frontend,
                  tout en explorant l'électronique, la domotique et la
                  cybersécurité.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#projects"
              className="group relative px-8 py-4 border-4 border-green-400 bg-black hover:bg-green-400 hover:text-black transition-all transform hover:scale-105"
            >
              <span className="absolute -top-1 -left-1 w-3 h-3 bg-green-400"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400"></span>
              <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400"></span>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400"></span>
              [VOIR_PROJETS]
            </a>
            <a
              href="#demos"
              className="px-8 py-4 border-4 border-cyan-400 text-cyan-400 bg-black hover:bg-cyan-400 hover:text-black transition-all transform hover:scale-105"
            >
              [EXPLORER_DEMOS]
            </a>
          </div>

          <div className="animate-bounce mt-12">
            <ChevronDown size={48} className="mx-auto" />
          </div>
        </div>
      </section>

      <section className="py-12 border-y-4 border-green-400 bg-green-400/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-transparent">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-[300px] border-2 border-green-400 p-4 bg-black"
              >
                <p className="italic mb-2">"{t.text}"</p>
                <p className="text-right text-cyan-400">-- {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 border-4 border-green-400 inline-block px-8 py-4 bg-black">
              [PROJETS]
            </h2>
            <p className="text-xl mt-4">
              // Découvrez mes créations personnelles, professionnelles et
              d'équipe
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-8 flex-wrap">
            {[
              { id: "all", label: "TOUT" },
              { id: "pro", label: "PRO" },
              { id: "perso", label: "PERSO" },
              { id: "team", label: "ÉQUIPE" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setCurrentFilter(filter.id)}
                className={`px-6 py-2 border-2 transition-all ${
                  currentFilter === filter.id
                    ? "bg-green-400 text-black border-green-400"
                    : "border-green-400 hover:bg-green-400/20"
                }`}
              >
                [{filter.label}]
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <div
                key={i}
                className="border-4 border-green-400 p-6 bg-black hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Terminal className="text-cyan-400" size={32} />
                  <span
                    className={`px-2 py-1 text-xs border ${
                      project.category === "pro"
                        ? "border-yellow-400 text-yellow-400"
                        : project.category === "perso"
                        ? "border-cyan-400 text-cyan-400"
                        : "border-pink-400 text-pink-400"
                    }`}
                  >
                    [{(project.category || "").toUpperCase()}]
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>
                <p className="mb-4 text-sm">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.stack || []).map((tech, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 border border-green-400 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyan-400 hover:underline"
                    >
                      <ExternalLink size={16} /> DEMO
                    </a>
                  )}
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                    >
                      <Github size={16} /> CODE
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demos" className="py-20 px-4 bg-green-400/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 border-4 border-cyan-400 text-cyan-400 inline-block px-8 py-4 bg-black">
              [DEMOS_TECH]
            </h2>
            <p className="text-xl mt-4">
              // Démonstrations concrètes de mon expertise
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-8 flex-wrap">
            {[
              { id: "form", label: "FORMULAIRE", icon: Code },
              {
                id: "dashboard",
                label: "DASHBOARD",
                icon: Activity,
              },
              { id: "crud", label: "CRUD", icon: Database },
              { id: "auth", label: "AUTH", icon: Lock },
              { id: "api", label: "API", icon: Terminal },
            ].map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`px-6 py-2 border-2 transition-all flex items-center gap-2 ${
                  activeDemo === demo.id
                    ? "bg-cyan-400 text-black border-cyan-400"
                    : "border-cyan-400 hover:bg-cyan-400/20"
                }`}
              >
                <demo.icon size={18} />[{demo.label}]
              </button>
            ))}
          </div>

          <div className="border-4 border-cyan-400 bg-black p-8">
            {activeDemo === "form" && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  [FORMULAIRE_DYNAMIQUE]
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">Username</label>
                      <input
                        type="text"
                        value={formDemo.username}
                        onChange={(e) =>
                          setFormDemo({
                            ...formDemo,
                            username: e.target.value,
                          })
                        }
                        className="w-full bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                        placeholder="johndoe"
                      />
                      {formErrors.username && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.username}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">Email</label>
                      <input
                        type="email"
                        value={formDemo.email}
                        onChange={(e) =>
                          setFormDemo({
                            ...formDemo,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">Password</label>
                      <input
                        type="password"
                        value={formDemo.password}
                        onChange={(e) =>
                          setFormDemo({
                            ...formDemo,
                            password: e.target.value,
                          })
                        }
                        className="w-full bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                        placeholder="••••••"
                      />
                      {formErrors.password && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.password}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleFormDemoSubmit}
                      className="w-full py-3 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
                    >
                      [VALIDER]
                    </button>
                  </div>
                  <div className="border-2 border-green-400 p-4">
                    <h4 className="font-bold mb-2 text-yellow-400">
                      Validation temps réel :
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li
                        className={
                          formDemo.username.length >= 3
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        • Username: {formDemo.username.length >= 3 ? "✓" : "✗"}{" "}
                        Min 3 caractères
                      </li>
                      <li
                        className={
                          formDemo.email.includes("@")
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        • Email: {formDemo.email.includes("@") ? "✓" : "✗"}{" "}
                        Format valide
                      </li>
                      <li
                        className={
                          formDemo.password.length >= 6
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        • Password: {formDemo.password.length >= 6 ? "✓" : "✗"}{" "}
                        Min 6 caractères
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeDemo === "dashboard" && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  [DASHBOARD_INTERACTIF]
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-green-400 p-4 text-center">
                      <div className="text-3xl font-bold text-cyan-400">
                        1,247
                      </div>
                      <div className="text-sm">Visiteurs</div>
                    </div>
                    <div className="border-2 border-green-400 p-4 text-center">
                      <div className="text-3xl font-bold text-yellow-400">
                        523
                      </div>
                      <div className="text-sm">Conversions</div>
                    </div>
                    <div className="border-2 border-green-400 p-4 text-center">
                      <div className="text-3xl font-bold text-green-400">
                        42%
                      </div>
                      <div className="text-sm">Taux</div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#16a34a" />
                      <XAxis dataKey="name" stroke="#16a34a" />
                      <YAxis stroke="#16a34a" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#000",
                          border: "2px solid #16a34a",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="#22d3ee"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="conversions"
                        stroke="#16a34a"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeDemo === "crud" && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  [APPLICATION_CRUD]
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          name: e.target.value,
                        })
                      }
                      className="flex-1 bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                      placeholder="Nom de l'utilisateur"
                    />
                    <select
                      value={newUser.role}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          role: e.target.value,
                        })
                      }
                      className="bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <button
                      onClick={handleAddUser}
                      className="px-6 py-3 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
                    >
                      [AJOUTER]
                    </button>
                  </div>
                  <div className="border-2 border-green-400">
                    <div className="grid grid-cols-4 gap-4 p-4 border-b-2 border-green-400 font-bold">
                      <div>ID</div>
                      <div>Nom</div>
                      <div>Rôle</div>
                      <div>Actions</div>
                    </div>
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="grid grid-cols-4 gap-4 p-4 border-b border-green-400/30 hover:bg-green-400/10"
                      >
                        <div>{user.id}</div>
                        <div>{user.name}</div>
                        <div className="text-cyan-400">{user.role}</div>
                        <div>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-400 hover:underline"
                          >
                            [SUPPR]
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeDemo === "auth" && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  [AUTHENTIFICATION_JWT]
                </h3>
                {!isAuthenticated ? (
                  <div className="max-w-md mx-auto space-y-4">
                    <div>
                      <label className="block mb-2">Username</label>
                      <input
                        type="text"
                        value={authDemo.username}
                        onChange={(e) =>
                          setAuthDemo({
                            ...authDemo,
                            username: e.target.value,
                          })
                        }
                        className="w-full bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                        placeholder="admin"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Password</label>
                      <input
                        type="password"
                        value={authDemo.password}
                        onChange={(e) =>
                          setAuthDemo({
                            ...authDemo,
                            password: e.target.value,
                          })
                        }
                        className="w-full bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                        placeholder="••••••"
                      />
                    </div>
                    <button
                      onClick={handleLogin}
                      className="w-full py-3 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
                    >
                      [LOGIN]
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border-2 border-green-400 p-4 bg-green-400/10">
                      <h4 className="font-bold text-cyan-400 mb-2">
                        ✓ Authentifié
                      </h4>
                      <p className="text-sm mb-2">User: {authDemo.username}</p>
                      <p className="text-xs break-all text-yellow-400">
                        Token: {authToken}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all"
                    >
                      [LOGOUT]
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeDemo === "api" && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  [API_TEST_ZONE]
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleApiTest("GET")}
                      className="px-6 py-3 border-2 border-green-400 hover:bg-green-400 hover:text-black transition-all"
                    >
                      [GET /api/users]
                    </button>
                    <button
                      onClick={() => handleApiTest("POST")}
                      className="px-6 py-3 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
                    >
                      [POST /api/users]
                    </button>
                  </div>
                  {apiLoading && (
                    <div className="border-2 border-yellow-400 p-4 text-yellow-400">
                      Loading...
                    </div>
                  )}
                  {apiResponse && (
                    <div className="border-2 border-green-400 p-4 bg-black font-mono text-sm">
                      <div className="text-cyan-400 mb-2">Response:</div>
                      <pre className="text-green-400">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="border-4 border-cyan-400 p-6 bg-black">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code size={28} /> FRONTEND
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="border-l-2 border-cyan-400 pl-4">
                  → Formulaires dynamiques avec validation temps réel
                </li>
                <li className="border-l-2 border-cyan-400 pl-4">
                  → Dashboards interactifs avec graphiques animés
                </li>
                <li className="border-l-2 border-cyan-400 pl-4">
                  → Composants UI réutilisables et animés
                </li>
                <li className="border-l-2 border-cyan-400 pl-4">
                  → Interfaces responsive et accessibles
                </li>
              </ul>
            </div>

            <div className="border-4 border-green-400 p-6 bg-black">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Terminal size={28} /> BACKEND
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="border-l-2 border-green-400 pl-4">
                  → Applications CRUD complètes
                </li>
                <li className="border-l-2 border-green-400 pl-4">
                  → Systèmes d'authentification JWT
                </li>
                <li className="border-l-2 border-green-400 pl-4">
                  → APIs REST et GraphQL documentées
                </li>
                <li className="border-l-2 border-green-400 pl-4">
                  → WebSockets pour communication temps réel
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 border-4 border-green-400 inline-block px-8 py-4 bg-black">
              [À_PROPOS]
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-4 border-green-400 p-8 bg-black">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                // QUI SUIS-JE ?
              </h3>
              <p className="leading-relaxed mb-4">
                Développeur fullstack de 16 ans, passionné par la technologie,
                l'IA et l'aérospatial. Basé à Paris, j'ai contribué à des
                projets professionnels (notamment la V2 de{" "}
                <span className="text-green-400">Stagey</span>) et effectué des
                stages formateurs — plus récemment un stage chez{" "}
                <span className="text-cyan-400">DC2Scale</span> (été 2025) qui a
                renforcé mes compétences en administration serveur et réseau.
                Depuis mars 2025 je travaille à temps plein chez{" "}
                <span className="text-yellow-400">Stagey</span> sur la V2 et le
                développement mobile.
              </p>
              <p className="leading-relaxed mb-4">
                Mon approche : apprendre par la pratique, documenter mes
                systèmes et relever des défis techniques concrets. J'affectionne
                tout particulièrement le backend, les APIs robustes, la
                cybersécurité, ainsi que l'électronique et la domotique.
              </p>
              <p className="leading-relaxed">
                Objectif : continuer d'apprendre, contribuer à des projets
                d'envergure (aérospatial / cybersécurité) et partager mes
                créations.
              </p>
            </div>

            <div className="border-4 border-green-400 p-8 bg-black">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                // COMPÉTENCES
              </h3>

              {Object.entries(skills)
                .filter(([k]) => k !== "summary")
                .map(([category, items]) => (
                  <div key={category} className="mb-4">
                    <h4 className="font-bold mb-2 text-yellow-400">
                      [{category.toUpperCase()}]
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(items as any[]).map((skill: any, i: number) => (
                        <div
                          key={i}
                          className="px-3 py-2 border border-green-400 text-xs bg-black"
                        >
                          <div className="font-semibold">{skill.name}</div>
                          {skill.note && (
                            <div className="text-[11px] text-gray-300">
                              {skill.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-8 border-4 border-cyan-400 p-8 bg-black">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center">
              [TIMELINE]
            </h3>
            <div className="space-y-4">
              {[
                {
                  year: "2019",
                  event:
                    "Début du code à 12 ans — bots Discord et petits projets",
                },
                {
                  year: "2022",
                  event:
                    "Projet marquant : Stagey / Stagey Platform (V2) — fullstack, AdonisJS & PostgreSQL",
                },
                {
                  year: "Summer 2025",
                  event:
                    "Stage chez DC2Scale — apprentissages sysadmin et serveur dédié",
                },
                {
                  year: "Mar 2025",
                  event: "Depuis Mars 2025 — Développement full-time chez CTI",
                },
                {
                  year: "Future",
                  event: "Objectif : ingénieur aérospatial / cybersécurité",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-l-4 border-cyan-400 pl-4 hover:bg-cyan-400/10 transition-all p-2"
                >
                  <span className="text-2xl font-bold text-cyan-400 min-w-[100px]">
                    {item.year}
                  </span>
                  <span className="text-lg">→ {item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-green-400/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 border-4 border-green-400 inline-block px-8 py-4 bg-black">
              [CONTACT]
            </h2>
            <p className="text-xl mt-4 text-cyan-400">
              // Envie de collaborer ? Discutons-en !
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-4 border-green-400 p-6 bg-black">
              <div className="space-y-4">
                <div>
                  <div className="block mb-2 text-cyan-400">[NOM]</div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                  />
                </div>
                <div>
                  <div className="block mb-2 text-cyan-400">[EMAIL]</div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-black border-2 border-green-400 p-3 focus:outline-none focus:border-cyan-400 text-green-400"
                  />
                </div>
                <div>
                  <div className="block mb-2 text-cyan-400">[MESSAGE]</div>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    className="w-full bg-black border-2 border-green-400 p-3 h-32 focus:outline-none focus:border-cyan-400 text-green-400 resize-none"
                  />
                </div>
                <button
                  onClick={handleContactAttempt}
                  className="w-full py-3 border-4 border-green-400 bg-black hover:bg-green-400 hover:text-black transition-all font-bold"
                >
                  [ENVOYER_MESSAGE]
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-4 border-cyan-400 p-6 bg-black">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">
                  [TERMINAL_OUTPUT]
                </h3>
                <div className="bg-black border-2 border-cyan-400 p-4 h-48 overflow-y-auto font-mono text-sm">
                  {terminalLines.length === 0 ? (
                    <div className="text-gray-500">
                      // En attente de commandes...
                    </div>
                  ) : (
                    terminalLines.map((line, i) => (
                      <div key={i} className="text-cyan-400">
                        {line}
                      </div>
                    ))
                  )}
                  <span className="animate-pulse">_</span>
                </div>
                <form
                  onSubmit={handleCommandSubmit}
                  className="mt-3 flex gap-2"
                >
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Commande (ex: help, clear, whoami, list users)"
                    className="flex-1 bg-black border-2 border-cyan-400 p-2 text-green-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black"
                  >
                    Run
                  </button>
                </form>
              </div>

              <div className="border-4 border-green-400 p-6 bg-black">
                <h3 className="text-xl font-bold mb-4">[LIENS]</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:renan.yhuel@gmail.com"
                    className="flex items-center gap-3 hover:text-cyan-400 transition-colors"
                  >
                    <Mail size={20} /> renan.yhuel@gmail.com
                  </a>
                  <a
                    href="https://github.com/RenanYhuel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-cyan-400 transition-colors"
                  >
                    <Github size={20} /> github.com/RenanYhuel
                  </a>
                  <a
                    href="www.linkedin.com/in/renan-yhuel-764aab323"
                    className="flex items-center gap-3 hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin size={20} /> LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact unavailable modal (temporary) */}
      {showContactModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowContactModal(false)}
          />
          <div className="relative z-50 max-w-xl mx-4 bg-black border-4 border-green-400 p-6 text-green-400 font-mono">
            <h3 className="text-2xl font-bold mb-4">
              Formulaire temporairement indisponible
            </h3>
            <p className="mb-4 text-sm text-left">
              Le formulaire de contact n'est pas disponible pour l'instant, mais
              bientôt. Pour me contacter maintenant, utilisez l'adresse e-mail
              ci-dessous :
            </p>

            <div className="mb-4">
              <a
                href={mailtoHref}
                onClick={() => setShowContactModal(false)}
                className="inline-block bg-green-400 text-black px-4 py-2 font-bold mr-3"
              >
                Ouvrir le client mail
              </a>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText("renan.yhuel@gmail.com");
                }}
                className="px-4 py-2 border-2 border-green-400 hover:bg-green-400 hover:text-black transition-all"
              >
                Copier l'email
              </button>
            </div>

            <div className="mb-4 text-sm">
              <div className="font-bold">Prévisualisation du message :</div>
              <pre className="whitespace-pre-wrap text-green-300 bg-black/20 p-3 border border-green-400 mt-2">{`Objet: ${decodeURIComponent(
                (mailtoHref.match(/subject=([^&]*)/) || [])[1] || ""
              )}

${decodeURIComponent((mailtoHref.match(/body=([^&]*)/) || [])[1] || "")}`}</pre>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 border-2 border-green-400 hover:bg-green-400 hover:text-black transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t-4 border-green-400 py-8 text-center">
        <p className="text-sm">
          © 2025 RENAN_YHUEL // Développé avec passion et pixels
        </p>
        <p className="text-xs mt-2 text-cyan-400">
          [SYSTEM_READY] // [VERSION_1.0] // [STATUS_ONLINE]
        </p>
      </footer>
    </div>
  );
}
