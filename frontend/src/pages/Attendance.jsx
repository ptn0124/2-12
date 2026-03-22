export default function Attendance({ title, description }) {
  // Mock data for student list
  const students = Array.from({ length: 29 }, (_, i) => i + 1).filter(n => n !== 23);

  return (
    <div className="flex-grow w-full max-w-4xl mx-auto flex flex-col pt-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm opacity-70 mt-1">{description}</p>
        </div>
        <button className="btn btn-neutral btn-sm">저장</button>
      </div>

      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body p-4">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 text-center">
            {students.map(num => (
              <label key={num} className="flex flex-col items-center p-2 border rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
                <span className="font-semibold mb-2">{num}번</span>
                <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
