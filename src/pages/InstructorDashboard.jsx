import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import EnrollmentChart from '../components/EnrollmentChart';

export default function InstructorDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['instructor-stats'],
    queryFn: () => api.get('/instructor/stats').then((res) => res.data),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 text-left">
      <h2 className="text-2xl font-bold mb-6">Instructor Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border rounded p-4 text-center">
          <p className="text-3xl font-bold">{data.total_courses}</p>
          <p className="text-sm text-gray-500">My Courses</p>
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