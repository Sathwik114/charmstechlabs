import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Layout,
  Server,
  Cpu,
  Globe2,
  BookOpen,
  Sparkles,
  Terminal,
  Clock,
  IndianRupee,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { getCourses } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function TrainingPage() {
  const courses = await getCourses({
    status: "Available",
    includeModules: true,
  });

  return (
    <div className="flex flex-col font-sans bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-[#f8fafc] border-b border-slate-200/60 text-center">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200/80 text-xs font-bold text-blue-700 shadow-2xs mb-6">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Industrial Tech Bootcamps & Mentorship</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
            Professional Software{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Engineering Training
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-8">
            Learn production-level software development from engineers with real enterprise experience. Build live applications, deploy to cloud infrastructure, and prepare for high-paying product roles.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Practical Hands-on
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Live Project Portfolio Included
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-violet-600" /> Interview & Resume Coaching
            </span>
          </div>
        </div>
      </section>

      {/* Courses List Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-2 block">
              Specialized Engineering Curriculums
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Available Full Stack Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group relative overflow-hidden p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(79,70,229,0.18)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                {/* Top Radiant Gradient Line */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      {course.title.includes("Python") ? (
                        <Terminal className="w-7 h-7" />
                      ) : (
                        <Layout className="w-7 h-7" />
                      )}
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Admissions Open • Tirupati
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Technologies Taught */}
                  {course.technologies && course.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {course.technologies.map((tech) => (
                        <span
                          key={tech.id}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 mb-8 text-xs sm:text-sm text-slate-700 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-semibold">Duration: {course.duration || "3 Months (Practical Hands-On)"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <IndianRupee className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Course Fee: ₹15,000 (Installments Available)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>2 Real-World Production Projects Shipped Live</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <Link
                    href={`/training/${course.slug}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm text-center shadow-sm hover:shadow-md transition-all"
                  >
                    View Syllabus & Curriculum
                  </Link>
                  <Link
                    href="/contact"
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 border-t border-slate-200/60 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-indigo-600 mb-2 block">
              Teaching Philosophy
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Why Engineers Choose CHARMS Tech Labs
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              We skip irrelevant slides and dive straight into architectural patterns, clean coding, and production debugging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">100% Code-First Teaching</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every lecture is a live coding session. You write unit tests, design database schemas, and debug live API servers alongside mentors.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 border border-violet-100">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Modern Enterprise Stacks</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn modern industry standards: Next.js App Router, React 19, FastAPI, Django REST, PostgreSQL, Docker, and Redis caching.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Job Placement Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get GitHub portfolio code reviews, LinkedIn optimization, mock technical interview drill rounds, and resume building assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
