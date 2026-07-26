import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../api/axios';

export default function QuizPage() {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => api.get(`/quizzes/${id}`).then((res) => res.data),
  });

  const submitMutation = useMutation({
    mutationFn: () => api.post(`/quizzes/${id}/submit`, { answers }),
    onSuccess: (res) => {
      setResult(res.data);
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 text-left">
      <h2 className="text-2xl font-bold mb-6">{quiz.title}</h2>

      {quiz.questions.map((q) => {
        const options = JSON.parse(q.options);
        return (
          <div key={q.id} className="mb-6 border-b pb-4">
            <p className="font-semibold mb-2">{q.question}</p>
            {options.map((opt) => (
              <label key={opt} className="block mb-1">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        );
      })}

      <button
        onClick={() => submitMutation.mutate()}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Quiz
      </button>

      {result && (
        <p className="mt-4 font-bold text-lg">
          Score: {result.score}/{result.total}
        </p>
      )}
    </div>
  );
}