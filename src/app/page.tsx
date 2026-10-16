import Link from "next/link";
import {
  getFeaturedProjects,
  getProjectCount,
} from "@/lib/db";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { LiveTicker } from "@/components/ui/LiveTicker";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Layers,
  Server,
  Sparkles,
  Terminal,
  ShieldCheck,
  Search,
  BookOpen,
  BrainCircuit,
  FileText,
  Clock,
  Compass,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [totalProjects, btechCount, mtechCount, featuredProjects] = await Promise.all([
    getProjectCount(),
    getProjectCount("B.Tech"),
    getProjectCount("M.Tech"),
    getFeaturedProjects(6),
  ]);

  const techDomains = [
    {
      title: "Generative AI & LLMs",
      count: "30+ Projects",
      desc: "RAG architectures, prompt engineering, multi-agent frameworks, fine-tuned transformer models.",
      skills: ["LangChain", "LLaMA 3", "ChromaDB", "FastAPI"],
      icon: Sparkles,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      gradient: "from-purple-600 via-indigo-600 to-pink-500",
      query: "generative-ai",
    },
    {
      title: "Full Stack Platforms",
      count: "70+ Projects",
      desc: "React 19, Next.js, Django, FastAPI, modern PostgreSQL databases, and role-based workflows.",
      skills: ["Next.js 16", "React 19", "PostgreSQL", "Tailwind"],
      icon: Layers,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      gradient: "from-blue-600 via-indigo-600 to-cyan-500",
      query: "full-stack",
    },
    {
      title: "AI & Machine Learning",
      count: "60+ Projects",
      desc: "Predictive analytics, neural networks, supervised models, feature engineering, and automated ML.",
      skills: ["Scikit-Learn", "XGBoost", "Pandas", "Flask"],
      icon: BrainCircuit,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      gradient: "from-emerald-600 via-teal-600 to-cyan-500",
      query: "ai-ml",
    },
    {
      title: "Deep Learning & Vision",
      count: "40+ Projects",
      desc: "YOLO object detection, convolutional neural networks, facial recognition, image segmentation.",
      skills: ["YOLOv10", "PyTorch", "OpenCV", "TensorFlow"],
      icon: Cpu,
      color: "bg-rose-50 text-rose-600 border-rose-200",
      gradient: "from-rose-600 via-pink-600 to-purple-500",
      query: "deep-learning",
    },
    {
      title: "Data Science & Analytics",
      count: "45+ Projects",
      desc: "Big data processing, Pandas, exploratory pipelines, interactive Streamlit dashboards.",
      skills: ["Streamlit", "NumPy", "PowerBI", "Seaborn"],
      icon: Database,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      query: "data-science",
    },
    {
      title: "Enterprise Systems",
      count: "40+ Projects",
      desc: "ERP portals, hospital management, banking platforms, secure microservices, and CRM suites.",
      skills: ["Spring Boot", "Django REST", "Docker", "JWT Auth"],
      icon: Server,
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
      query: "enterprise",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Select & Scope",
      desc: "Browse through 290+ verified B.Tech & M.Tech project topics with synopsis, problem statement, and requirements.",
      icon: Compass,
    },
    {
      number: "02",
      title: "System Architecture",
      desc: "Receive complete architectural blueprints, UML sequence diagrams, ER schemas, and data flow pipelines.",
      icon: Layers,
    },
    {
      number: "03",
      title: "Production Source Code",
      desc: "Run fully tested source code locally with documentation, database seeds, and live environment setup.",
      icon: Terminal,
    },
    {
      number: "04",
      title: "Viva & PPT Mastery",
      desc: "Defend your thesis confidently with IEEE-standard project reports, presentation slide decks, and simulated viva Q&A drills.",
      icon: GraduationCap,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900 font-sans">
      
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 border-b border-blue-100/80 py-2.5 px-4 text-center">
        <div className="container mx-auto flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 flex-wrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-900 font-bold">Batch 2025 – 2026 Active:</span>
          <span>Final Year B.Tech & M.Tech Project Development & Viva Coaching</span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <Link href="/projects" className="text-blue-600 hover:text-blue-800 underline font-bold inline-flex items-center gap-1">
            Browse {totalProjects} Projects <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-[#f8fafc]">
        
        {/* Soft Ambient Floating Glows */}
        <div className="pointer-events-none absolute -top-32 left-10 h-[500px] w-[500px] bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float opacity-80" />
        <div className="pointer-events-none absolute top-10 right-10 h-[550px] w-[550px] bg-gradient-to-bl from-teal-400/15 via-cyan-400/15 to-indigo-400/15 rounded-full blur-3xl animate-float-reverse opacity-70" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] bg-gradient-to-r from-violet-300/10 via-pink-300/10 to-blue-300/10 rounded-full blur-3xl opacity-60" />

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Tag Pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-indigo-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
            <span>Tirupati&apos;s Premier Engineering Project Development & Training Center</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mb-6 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Build Your Project.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Master The Architecture.
            </span>
            <br />
            Defend Your Viva.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-3xl text-base sm:text-xl font-normal leading-relaxed text-slate-600">
            A comprehensive engineering repository of <strong className="text-slate-900 font-bold">{totalProjects}+ live projects</strong> for B.Tech & M.Tech students. Complete with production source code, UML diagrams, IEEE documentation, and 1-on-1 mentorship.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/projects"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 hover:-translate-y-0.5"
            >
              <Code2 className="w-4 h-4" />
              <span>Explore {totalProjects}+ Projects</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/training"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 backdrop-blur-md px-8 py-4 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Professional Training Programs</span>
            </Link>
          </div>

          {/* Interactive Search Card */}
          <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-indigo-100/90 shadow-xl shadow-indigo-500/5">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <form action="/projects" method="GET" className="w-full">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search 290+ projects (e.g. AI, Healthcare, Cloud, Django, LLM)..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </form>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/projects?degree=B.Tech"
                  className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-colors text-center"
                >
                  B.Tech ({btechCount})
                </Link>
                <Link
                  href="/projects?degree=M.Tech"
                  className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold hover:bg-violet-100 transition-colors text-center"
                >
                  M.Tech ({mtechCount})
                </Link>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Hero Showcase Component */}
          <HeroShowcase />

        </div>
      </section>

      {/* Live Continuous Horizontal Ticker (Moving Ribbon) */}
      <LiveTicker />

      {/* Metrics Dashboard */}
      <section className="relative z-20 py-16 bg-white/50 border-b border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1 */}
            <div className="relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Verified
                </span>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1 font-mono">
                {totalProjects}+
              </div>
              <div className="text-xs font-bold text-slate-900 mb-1">Academic & Industry Projects</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Full stack, AI/ML, NLP, Computer Vision, and Cloud applications ready for execution.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-2xs">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Modern 2026
                </span>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 font-mono">
                12+
              </div>
              <div className="text-xs font-bold text-slate-900 mb-1">Specialized Tech Domains</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Generative AI, Django REST, Next.js 16, PyTorch, LangChain, and PostgreSQL.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-2xs">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  IEEE Format
                </span>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-1 font-mono">
                100%
              </div>
              <div className="text-xs font-bold text-slate-900 mb-1">Complete Deliverables</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Full source code, PPT presentation, IEEE documentation, diagrams & viva questions.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Mentorship
                </span>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1 font-mono">
                1-on-1
              </div>
              <div className="text-xs font-bold text-slate-900 mb-1">Senior Engineer Guidance</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Live setup on your laptop, code line-by-line explanation, and mock viva prep.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-2 block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Verified Academic Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Featured Project Containers
              </h2>
            </div>
            
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>View all {totalProjects} projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project as any} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              <span>Browse All {totalProjects} Projects by Degree & Category</span>
              <ArrowRight className="w-4 h-4 text-blue-300" />
            </Link>
          </div>

        </div>
      </section>

      {/* Technology Domains Matrix */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-indigo-600 mb-2 block">
              Multi-Disciplinary Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Explore Projects by Tech Domain
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every category is aligned with contemporary industry expectations and university academic project guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <Link
                  key={domain.title}
                  href={`/projects?category=${domain.query}`}
                  className="group relative overflow-hidden p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(79,70,229,0.18)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
                >
                  {/* Top Radiant Gradient Line */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${domain.gradient}`} />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl ${domain.color} border flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80 group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-200 transition-colors">
                        {domain.count}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {domain.desc}
                    </p>

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {domain.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:translate-x-1.5 transition-transform pt-4 border-t border-slate-100">
                    <span>Explore {domain.title} Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 4-Step Engineering Lab Process */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-2 block">
              Execution Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              How Your Project Gets Built & Delivered
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We guide you from initial title approval up to the final external examiner viva voce defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group relative overflow-hidden p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:border-indigo-300 shadow-2xs hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-mono">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Programs Preview */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 mb-2 block">
                Job-Ready Skill Development
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Professional Full Stack Training
              </h2>
            </div>
            
            <Link
              href="/training"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              <span>View All Training Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Python Track */}
            <div className="group relative overflow-hidden p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.2)] hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Terminal className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Admissions Open • Tirupati
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  Python Full Stack Development
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  Master end-to-end web engineering with Python 3, Django, Django REST Framework, PostgreSQL, and React.js frontend.
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-slate-700 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Duration: 3 Months • Practical Project Based</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>REST APIs, Database Modeling & JWT Authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live Deployment on Cloud Servers & Mock Interviews</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/training/python-full-stack"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs text-center shadow-sm hover:shadow-md transition-all"
                >
                  View Syllabus & Enroll
                </Link>
                <Link
                  href="/contact"
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center transition-colors"
                >
                  Ask Inquiry
                </Link>
              </div>
            </div>

            {/* Next.js Track */}
            <div className="group relative overflow-hidden p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(79,70,229,0.2)] hover:border-blue-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Layers className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Admissions Open • Tirupati
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Next.js & Modern Web Stack
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  Learn modern production architectures using React 19, Next.js App Router, TypeScript, Prisma ORM, and Tailwind CSS.
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-slate-700 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-semibold">Duration: 2.5 Months • Hands-on Coding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Server Components, Server Actions & Full Type Safety</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Portfolio Project Shipped Live on Vercel</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/training/nextjs-full-stack"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs text-center shadow-sm hover:shadow-md transition-all"
                >
                  View Syllabus & Enroll
                </Link>
                <Link
                  href="/contact"
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center transition-colors"
                >
                  Ask Inquiry
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-bold text-white mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" /> Ready to Finalize Your Engineering Project?
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Start Your Project Development With CHARMS Tech Labs
          </h2>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl mx-auto mb-10">
            Get in touch with our senior engineers in Tirupati today. We provide full project abstracts, architecture reviews, source code, and comprehensive viva coaching.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-0.5"
            >
              Browse {totalProjects}+ Project Topics
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur transition-all"
            >
              Request Free Consultation
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
