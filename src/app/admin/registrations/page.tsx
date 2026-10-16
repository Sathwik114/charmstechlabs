import { getRegistrations } from '@/lib/db';
import { 
  Users, 
  GraduationCap, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function getStatusBadgeStyle(status: string) {
  const norm = status?.trim().toLowerCase();
  switch (norm) {
    case 'new':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'contacted':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'enrolled':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'closed':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

function getStatusDotColor(status: string) {
  const norm = status?.trim().toLowerCase();
  switch (norm) {
    case 'new':
      return 'bg-blue-600';
    case 'contacted':
      return 'bg-yellow-600';
    case 'enrolled':
      return 'bg-green-600';
    case 'closed':
      return 'bg-slate-500';
    default:
      return 'bg-slate-500';
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export default async function TrainingRegistrationsPage() {
  const registrations = await getRegistrations();

  const totalCount = registrations.length;
  const newCount = registrations.filter(r => r.status?.toLowerCase() === 'new').length;
  const contactedCount = registrations.filter(r => r.status?.toLowerCase() === 'contacted').length;
  const enrolledCount = registrations.filter(r => r.status?.toLowerCase() === 'enrolled').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            Training Registrations
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-500">
            Monitor and manage student admissions and applications for tech training courses.
          </p>
        </div>
        {totalCount > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>{totalCount} Total {totalCount === 1 ? 'Student' : 'Students'}</span>
          </div>
        )}
      </div>

      {/* KPI Stats Bar */}
      {totalCount > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Enquiries</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalCount}</p>
            </div>
            <div className="w-11 h-11 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">New Submissions</p>
              <p className="text-2xl font-extrabold text-blue-700 mt-1">{newCount}</p>
            </div>
            <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-600">Contacted</p>
              <p className="text-2xl font-extrabold text-yellow-700 mt-1">{contactedCount}</p>
            </div>
            <div className="w-11 h-11 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600">Enrolled</p>
              <p className="text-2xl font-extrabold text-green-700 mt-1">{enrolledCount}</p>
            </div>
            <div className="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {registrations.length === 0 ? (
        /* Friendly Empty State Card */
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-2xl mx-auto my-12">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-inner">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            No registrations yet. Student registrations will appear here.
          </h3>
          <p className="text-sm font-medium text-slate-500 max-w-md mx-auto">
            Once students register for technology training courses or workshops, their enrollment details, contact info, and course preferences will be displayed here in real time.
          </p>
        </div>
      ) : (
        /* Professional Data Table */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs uppercase bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200 tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">Registration ID</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">College</th>
                  <th scope="col" className="px-6 py-4">Course Interest</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => (
                  <tr 
                    key={reg.id} 
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Registration ID */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                        {reg.registrationCode || reg.id.slice(0, 8)}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">
                        {reg.fullName}
                      </div>
                      {reg.mobile && (
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{reg.mobile}</span>
                        </div>
                      )}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]" title={reg.email}>
                          {reg.email}
                        </span>
                      </div>
                    </td>

                    {/* College */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900 truncate max-w-[220px]" title={reg.college}>
                        {reg.college}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {[reg.degree, reg.branch, reg.year ? `Year ${reg.year}` : null].filter(Boolean).join(' • ')}
                      </div>
                    </td>

                    {/* Course Interest */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate max-w-[200px]" title={reg.preferredCourse || reg.interestType || reg.preferredTechnology || 'Course Training'}>
                          {reg.preferredCourse || reg.interestType || reg.preferredTechnology || 'Course Training'}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeStyle(reg.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(reg.status)}`} />
                        {reg.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{formatDate(reg.createdAt)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
