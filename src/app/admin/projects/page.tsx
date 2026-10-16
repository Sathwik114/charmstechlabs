import { getAdminProjects } from '@/lib/db';
import Link from 'next/link';
import { BookOpen, ExternalLink, FileText, CheckCircle2, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.isPublished).length;
  const draftProjects = projects.filter((p) => !p.isPublished).length;
  const totalRequests = projects.reduce((acc, p) => acc + (p._count?.requests || 0), 0);

  const getDifficultyBadge = (difficulty: string) => {
    const diff = difficulty?.trim().toLowerCase();
    switch (diff) {
      case 'beginner':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Beginner
          </span>
        );
      case 'intermediate':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Intermediate
          </span>
        );
      case 'advanced':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
            Advanced
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {difficulty || 'N/A'}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Management</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Overview and administration of all technology projects.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/projects"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Catalog</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards / Project count at top */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500 text-sm font-medium">Total Projects</span>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{totalProjects}</div>
          <p className="text-xs text-slate-400 mt-1">Total in repository</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500 text-sm font-medium">Published</span>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">{publishedProjects}</div>
          <p className="text-xs text-slate-400 mt-1">Live for students</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500 text-sm font-medium">Drafts</span>
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-700">{draftProjects}</div>
          <p className="text-xs text-slate-400 mt-1">Under review / unpublished</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500 text-sm font-medium">Student Requests</span>
            <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-violet-600">{totalRequests}</div>
          <p className="text-xs text-slate-400 mt-1">Total interest registered</p>
        </div>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">All Projects</h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing {totalProjects} projects sorted by most recent</p>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs uppercase bg-slate-100 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Project Code</th>
                <th className="px-6 py-4 whitespace-nowrap">Title</th>
                <th className="px-6 py-4 whitespace-nowrap">Category</th>
                <th className="px-6 py-4 whitespace-nowrap">Degree</th>
                <th className="px-6 py-4 whitespace-nowrap">Difficulty</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Requests Count</th>
                <th className="px-6 py-4 whitespace-nowrap">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-slate-500">
                    <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                    <p className="font-bold text-slate-700 text-base">No projects found</p>
                    <p className="text-xs text-slate-400 mt-1">There are currently no projects in the database.</p>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md text-xs border border-blue-100">
                        {project.projectCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs sm:max-w-sm">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="font-semibold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 inline-flex items-center gap-1.5 group"
                          title={project.title}
                        >
                          <span>{project.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 shrink-0" />
                        </Link>
                        {project.subcategory && (
                          <div className="text-xs text-slate-400 truncate mt-0.5">{project.subcategory}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-slate-800 text-sm">
                        {project.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                        {project.degree}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getDifficultyBadge(project.difficulty)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="inline-flex items-center justify-center min-w-[1.75rem] h-6 px-2 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                          {project._count.requests}
                        </span>
                        <span className="text-xs text-slate-400">requests</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-medium">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
