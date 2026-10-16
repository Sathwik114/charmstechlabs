import { getProjectRequests } from '@/lib/db';
import { FileText, Search, MoreVertical } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminRequestsPage() {
  const requests = await getProjectRequests();

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Project Requests</h1>
          <p className="text-slate-500">Manage all incoming student requests for projects.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, name, or email..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Statuses</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Confirmed</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs uppercase bg-slate-100 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">College / Degree</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <FileText className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                    No project requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">
                      {req.requestCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{req.fullName}</div>
                      <div className="text-slate-500 text-xs">{req.email}</div>
                      <div className="text-slate-500 text-xs">{req.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-slate-900">{req.college}</div>
                      <div className="text-slate-500 text-xs">{req.degree} • {req.branch}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {req.project ? (
                        <div className="font-medium text-slate-800 truncate" title={req.project.title}>
                          {req.project.title}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No specific project</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold
                        ${req.status === 'New' ? 'bg-orange-100 text-orange-700' : 
                          req.status === 'Contacted' ? 'bg-blue-100 text-blue-700' : 
                          'bg-slate-100 text-slate-700'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
