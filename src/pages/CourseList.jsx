import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function useCourses(search) {
  return useQuery({
    queryKey: ['courses', search],
    queryFn: () => api.get(`/courses?search=${search || ''}`).then((res) => res.data),
  });
}

export default function CourseList() {
  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useCourses(search);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load courses.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <input
        className="border p-2 w-full mb-6"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data.data.length === 0 && <p>No courses found.</p>}
        {data.data.map((course) => (
          <Link
            to={`/courses/${course.id}`}
            key={course.id}
            className="border rounded p-4 text-left block hover:shadow-md"
          >
            <h3 className="font-bold">{course.title}</h3>
            <p className="text-sm text-gray-500">{course.category}</p>
            <p>Rs. {course.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}