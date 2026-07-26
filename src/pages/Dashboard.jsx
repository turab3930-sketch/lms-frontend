import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="max-w-lg mx-auto mt-20 text-center">
      <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
      <p>Role: {user?.role}</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}