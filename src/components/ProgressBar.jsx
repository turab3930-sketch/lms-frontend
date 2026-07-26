export default function ProgressBar({ percentage }) {
  return (
    <div className="w-full bg-gray-200 rounded h-3">
      <div
        className="bg-green-500 h-3 rounded transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}