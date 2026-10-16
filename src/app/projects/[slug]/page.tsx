import { getProjectBySlug, getRelatedProjects } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  Clock,
  FileText,
  ShieldCheck,
  Sparkles,
  Layers,
  Database,
  Terminal,
  Cpu,
  Share2,
  Copy,
  BookOpen,
} from "lucide-react";
import { ProjectRequestForm } from "@/components/forms/ProjectRequestForm";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug, {
    modules: true,
    features: true,
  });

  if (!project) {
    notFound();
  }

  // Fetch 3 related projects in the same category
  const relatedProjects = await getRelatedProjects(project.categoryId, project.id);

  const isBTech = project.degree === "B.Tech";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-24">
      
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3 flex items-center text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
          <Link href="/projects" className="hover:text-blue-600 transition-colors">Projects Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
          <Link href={`/projects?category=${project.category.slug}`} className="hover:text-blue-600 transition-colors">
            {project.category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{project.projectCode}</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-10 pb-16 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-[#f8fafc] border-b border-slate-200/60">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors mb-6 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
              {project.projectCode}
            </span>

            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                isBTech
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-violet-50 text-violet-700 border-violet-200"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 inline mr-1" />
              {project.degree} Project Track
            </span>

            <span className="px-3 py-1 rounded-lg bg-white text-slate-700 text-xs font-bold border border-slate-200">
              <Code2 className="w-3.5 h-3.5 inline mr-1 text-blue-600" />
              {project.category.name}
            </span>

            <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified Code & PPT Ready
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight max-w-5xl">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-4xl mb-8">
            {project.shortDescription}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#request-form"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Request Full Source Code & PPT
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm shadow-2xs transition-all"
            >
              Quick Chat on WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview & Abstract Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Project Abstract & Overview
              </h2>
              <div className="text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
                <p className="whitespace-pre-line">{project.description}</p>
              </div>
            </div>

            {/* Problem Statement Card */}
            {project.problemStatement && (
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-violet-600" />
                  Problem Statement & Motivation
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {project.problemStatement}
                </p>
              </div>
            )}

            {/* System Modules Container */}
            {project.modules && project.modules.length > 0 && (
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  System Architecture Modules
                </h2>
                <div className="space-y-4">
                  {project.modules.map((mod, idx) => (
                    <div
                      key={mod.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold font-mono flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base">
                          {mod.moduleName}
                        </h3>
                      </div>
                      {mod.description && (
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                          {mod.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables Checklist Container */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Included Academic Package & Deliverables
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Full Verified Source Code</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Clean codebase with setup guides, database migrations, and environment configuration.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">IEEE Format Documentation</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Complete project report chapters: Introduction, Literature Survey, System Design, Testing & Results.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Architecture & UML Diagrams</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      High-res ER diagrams, Class diagrams, Sequence diagrams, and Data Flow architecture.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Viva Q&A & Slide Deck</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Pre-formatted presentation slides (.PPTX) and curated viva voce questions with model answers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Specifications Sidebar */}
          <div className="space-y-6">
            <div className="relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-indigo-500/5 sticky top-24">
              {/* Top Radiant Accent */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

              <h3 className="text-base font-extrabold text-slate-900 mb-5 pb-4 border-b border-slate-100 flex items-center justify-between">
                <span>Project Specifications</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  #{project.projectCode}
                </span>
              </h3>

              <div className="space-y-3 mb-6 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Degree</span>
                  <span className="font-bold text-slate-900">{project.degree}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Category</span>
                  <span className="font-bold text-slate-900">{project.category.name}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Difficulty Level</span>
                  <span className="font-bold text-emerald-700">{project.difficulty}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Mentorship Support</span>
                  <span className="font-bold text-indigo-700">1-on-1 Local / Remote</span>
                </div>
              </div>

              {/* Technologies List */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Integrated Technologies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.id}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#request-form"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs text-center block shadow-md shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5"
              >
                Inquire About This Project
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Request Form */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-md">
          <ProjectRequestForm projectId={project.id} projectTitle={project.title} />
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-20">
          <div className="border-t border-slate-200/80 pt-12">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              Similar Projects in {project.category.name}
            </h3>
            <p className="text-sm text-slate-500 mb-8">
              Explore alternative and related implementations in this domain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p as any} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
