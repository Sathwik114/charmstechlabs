import { getAdminCourses } from '@/lib/db';
import { GraduationCap, BookOpen, Star, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCoursesPage() {
  const courses = await getAdminCourses();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Course Management</h1>
          <p className="text-slate-500 font-medium mt-1">{courses.length} training courses configured</p>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 mb-2">No courses yet</h3>
          <p className="text-slate-500">Courses will appear here once they are added to the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-violet-100 text-blue-600 rounded-xl flex items-center justify-center border border-blue-200/50">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  {course.isFeatured && (
                    <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" /> Featured
                    </span>
                  )}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    course.status === 'Available' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.shortDescription}</p>

              <div className="flex items-center gap-4 text-sm text-slate-600 font-medium border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-violet-500" />
                  {course.level}
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  {course._count.modules} Modules
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
