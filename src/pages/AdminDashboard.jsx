import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import EnrollmentChart from '../components/EnrollmentChart';

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/admin/stats').then((res) => res.data),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 text-left">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border rounded p-4 text-center">
          <p className="text-3xl font-bold">{data.total_users}</p>
          <p className="text-sm text-gray-500">Total Users</p>
        </div>
        <div className="border rounded p-4 text-center">
          <p className="text-3xl font-bold">{data.total_courses}</p>
          <p className="text-sm text-gray-500">Total Courses</p>
        </div>
        <div className="border rounded p-4 text-center">
          <p className="text-3xl font-bold">{data.total_enrollments}</p>
          <p className="text-sm text-gray-500">Total Enrollments</p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2">Enrollments by Course</h3>
      <EnrollmentChart data={data.enrollments_by_course} />
    </div>
  );
}