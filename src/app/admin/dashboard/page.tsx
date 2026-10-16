import { getCourseCount, getProjectCount, getRequestCount } from '@/lib/db';
import { Users, FileText, Briefcase, Mail } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    totalRequests,
    newRequests,
    totalProjects,
    totalCourses
  ] = await Promise.all([
    getRequestCount(),
    getRequestCount('New'),
    getProjectCount(),
    getCourseCount(),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI Cards */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Project Requests</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">{totalRequests}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md">Action Needed</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">New / Unread Requests</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">{newRequests}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Active Projects</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">{totalProjects}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Active Courses</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">{totalCourses}</p>
        </div>
      </div>

      {/* Recent Activity Table (Placeholder for Dashboard) */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Recent Project Requests</h2>
          <Link href="/admin/requests" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All →</Link>
        </div>
        <div className="p-6 text-center text-slate-500 py-12">
          View the Project Requests tab to manage all leads.
        </div>
      </div>

    </div>
  );
}
