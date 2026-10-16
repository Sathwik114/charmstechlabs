import { getCourseBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import {
  Clock,
  IndianRupee,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Laptop,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Terminal,
  Layers,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const course = await getCourseBySlug(resolvedParams.slug, "Available");

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col font-sans bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      
      {/* Breadcrumb Navigation */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-3 flex items-center text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
          <Link href="/training" className="hover:text-blue-600 transition-colors">Training Programs</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
          <span className="text-slate-900 font-bold truncate">{course.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-[#f8fafc] border-b border-slate-200/60">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl z-10">
          <Link
            href="/training"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors mb-6 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Programs</span>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Next Batch Enrolling Now
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                Level: {course.level || "Beginner to Advanced"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5 leading-tight">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs sm:text-sm font-semibold shadow-2xs">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{course.duration || "3 Months"} Comprehensive</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs sm:text-sm font-semibold shadow-2xs">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                <span>₹15,000 Total Program Fee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Syllabus */}
            <div className="lg:col-span-2 space-y-8">
              
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Course Curriculum & Engineering Modules
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "Phase 1: Foundations & Architecture",
                      desc: "Language fundamentals, Object-Oriented design, asynchronous control flow, and Git team workflows.",
                    },
                    {
                      title: "Phase 2: Database Modeling & Schema Design",
                      desc: "Relational database concepts, SQL query optimization, ORM integration, migrations, and normalization.",
                    },
                    {
                      title: "Phase 3: Backend REST APIs & Security",
                      desc: "Designing secure RESTful endpoints, JWT / OAuth authentication, middleware, rate limiting, and input validation.",
                    },
                    {
                      title: "Phase 4: Modern Reactive User Interfaces",
                      desc: "Component architecture, state management, client vs server components, responsive layouts, and animations.",
                    },
                    {
                      title: "Phase 5: Cloud Deployment & DevOps Basics",
                      desc: "Docker containerization, environment variables, continuous deployment on cloud platforms, and monitoring.",
                    },
                  ].map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold font-mono flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base">
                          {phase.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                        {phase.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Will Build */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                  <Laptop className="w-6 h-6 text-emerald-600" />
                  Key Learning Outcomes
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Architect and deploy full-stack production systems",
                    "Design relational databases with automated migrations",
                    "Implement role-based authorization & JWT security",
                    "Build responsive interfaces with modern UI component libraries",
                    "Write clean, maintainable, self-documenting code",
                    "Crack technical interview coding and system design rounds",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Sticky Card */}
            <div>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Tuition</span>
                  <span className="text-2xl font-mono font-extrabold text-emerald-600">₹15,000</span>
                </div>

                <div className="space-y-3 mb-6 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Duration: 3 Months</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Format: Offline Classroom & Live Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Certificate of Completion Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Placement & Interview Guidance</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 mb-3 text-center"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enroll in Next Batch</span>
                </Link>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <span>Chat with Academic Counselor</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
