import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnrollmentChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="course" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="enrollments" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}