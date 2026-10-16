import { getProjectCategories, getPublishedProjects } from "@/lib/db";
import { ProjectCatalogClient } from "@/components/projects/ProjectCatalogClient";
import { LiveTicker } from "@/components/ui/LiveTicker";
import {
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const degreeParam = typeof params.degree === "string" ? params.degree : "";
  const categoryParam = typeof params.category === "string" ? params.category : "";
  const searchParam = typeof params.search === "string" ? params.search : "";

  // Fetch all published projects & categories
  const [projects, categories] = await Promise.all([
    getPublishedProjects(),
    getProjectCategories(),
  ]);

  const btechTotal = projects.filter((p) => p.degree === "B.Tech").length;
  const mtechTotal = projects.filter((p) => p.degree === "M.Tech").length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      
      {/* Hero Header Area with Soft Light Mesh Gradients & Motion */}
      <section className="relative overflow-hidden pt-12 pb-14 bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-[#f8fafc] border-b border-slate-200/60">
        
        {/* Soft background ambient glow with floating motion */}
        <div className="pointer-events-none absolute -top-32 left-1/4 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-violet-400/15 rounded-full blur-3xl animate-float opacity-80" />
        <div className="pointer-events-none absolute top-10 right-1/4 w-[500px] h-[300px] bg-gradient-to-bl from-teal-400/15 via-cyan-400/15 to-indigo-400/15 rounded-full blur-3xl animate-float-reverse opacity-70" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Top Live Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-indigo-200/80 shadow-2xs text-xs font-bold text-indigo-700 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Batch 2025 – 2026 Academic Catalog</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-emerald-700 font-extrabold">{projects.length} Verified Solutions</span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl mb-10">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              Engineering Project{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Repository
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
              Explore our curated catalogue of complete undergraduate (B.Tech) and advanced research (M.Tech) software projects. Every project includes source code, system architecture diagrams, database dumps, and viva defense guides.
            </p>
          </div>

          {/* 4 Clean Radiant Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">All Projects</span>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Live
                </span>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-mono">
                {projects.length}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Verified Codebases</div>
            </div>

            <div className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">B.Tech Track</span>
                <GraduationCap className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-mono">
                {btechTotal}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Full Stack & AI Projects</div>
            </div>

            <div className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">M.Tech Track</span>
                <Cpu className="w-4 h-4 text-violet-600" />
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-mono">
                {mtechTotal}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Advanced Research & LLMs</div>
            </div>

            <div className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Domains</span>
                <Code2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-mono">
                {categories.length}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Technology Disciplines</div>
            </div>

          </div>

        </div>
      </section>

      {/* Moving Live Ticker Strip */}
      <LiveTicker />

      {/* Main Catalog with Interactive Client Component */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ProjectCatalogClient
            initialProjects={projects}
            categories={categories}
            initialDegree={degreeParam}
            initialCategory={categoryParam}
            initialSearch={searchParam}
          />
        </div>
      </section>

    </div>
  );
}
