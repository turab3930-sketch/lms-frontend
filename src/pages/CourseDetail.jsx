import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import ProgressBar from '../components/ProgressBar';

export default function CourseDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: () => api.get(`/courses/${id}`).then((res) => res.data.data),
  });

  const { data: progress } = useQuery({
    queryKey: ['progress', id],
    queryFn: () => api.get(`/courses/${id}/progress`).then((res) => res.data),
  });

  const enrollMutation = useMutation({
    mutationFn: () => api.post(`/courses/${id}/enroll`),
    onSuccess: () => {
      alert('Enrolled successfully!');
      queryClient.invalidateQueries({ queryKey: ['progress', id] });
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: () => api.post(`/courses/${id}/checkout`),
    onSuccess: (res) => {
      window.location.href = res.data.url;
    },
  });

  const completeLessonMutation = useMutation({
    mutationFn: (lessonId) => api.post(`/lessons/${lessonId}/complete`),
    onSuccess: () => {
      alert('Lesson marked complete!');
      queryClient.invalidateQueries({ queryKey: ['progress', id] });
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 text-left">
      <h2 className="text-2xl font-bold">{course.title}</h2>
      <p className="text-gray-600 mt-2">{course.description}</p>
      <p className="mt-2 font-semibold">Rs. {course.price}</p>

      <div className="mt-4">
        <button
          onClick={() => enrollMutation.mutate()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enroll Now
        </button>

        <button
          onClick={() => checkoutMutation.mutate()}
          className="bg-green-600 text-white px-4 py-2 rounded ml-2"
        >
          Buy Now (Stripe)
        </button>
      </div>

      {progress && (
        <div className="mt-6">
          <p className="text-sm mb-1">
            Progress: {progress.completed}/{progress.total} lessons ({progress.percentage}%)
          </p>
          <ProgressBar percentage={progress.percentage} />
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Lessons</h3>
        {course.lessons && course.lessons.map((lesson) => (
          <div key={lesson.id} className="flex justify-between items-center border-b py-2">
            <span>{lesson.title}</span>
            <button
              onClick={() => completeLessonMutation.mutate(lesson.id)}
              className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-green-200"
            >
              Mark Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}