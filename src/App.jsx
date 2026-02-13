import { useState } from "react";

export default function App() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/results/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: Number(studentId),
          student_name: studentName,
          dob,
        }),
      });

      const data = await res.json();
      if (!res.ok) setError(data.message);
      else setResult(data);
    } catch {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          🎓 Student Result Portal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Student ID"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Student Name"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />

          <input
            type="date"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {loading ? "Fetching..." : "Get Result"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}

        {result && (
          <div className="mt-6 border-t pt-4 text-gray-700 space-y-1">
            <p><b>ID:</b> {result.student_id}</p>
            <p><b>Name:</b> {result.student_name}</p>
            <p><b>DOB:</b> {result.dob}</p>
            <p>Maths: {result.marks.maths}</p>
            <p>Science: {result.marks.science}</p>
            <p>English: {result.marks.english}</p>
            <p className="font-semibold">Total: {result.total}</p>
            <p>Percentage: {result.percentage}%</p>
            <p className={`font-bold ${result.result === "PASS" ? "text-green-600" : "text-red-600"}`}>
              {result.result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
