import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Weekly dates (simplified implementation for Friday-Monday)
  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  };

  const [dateRange, setDateRange] = useState({ startDate: getToday(), endDate: getToday() });

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/timetable', { params: dateRange });
      setTimetable(data);
    } catch (err) {
      setError('시간표를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [dateRange]);

  return (
    <div className="flex-grow w-full max-w-4xl mx-auto flex flex-col pt-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">시간표</h2>
        <div className="flex space-x-2">
          <input 
            type="text" 
            className="input input-sm input-bordered w-32" 
            placeholder="시작 (YYYYMMDD)"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
          />
          <input 
            type="text" 
            className="input input-sm input-bordered w-32" 
            placeholder="종료 (YYYYMMDD)"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
          />
        </div>
      </div>

      {error && <div className="alert alert-error text-sm">{error}</div>}

      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body p-4">
          {loading ? (
             <div className="text-center py-10"><span className="loading loading-spinner loading-lg"></span></div>
          ) : timetable.length === 0 ? (
            <div className="text-center py-10 text-base-content/50">선택된 기간의 시간표가 없습니다.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-center">
                <thead>
                  <tr className="bg-base-200 text-base-content/80">
                    <th>교시</th>
                    <th>과목명</th>
                    <th>선택과목/강의실</th>
                    <th>담당 교사</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((t, idx) => (
                    <tr key={idx} className="hover:bg-base-50">
                      <td className="font-semibold">{t.period}교시</td>
                      <td>{t.name}</td>
                      <td>
                        {t.subject ? (
                          <div className="flex flex-col">
                            <span className="badge badge-neutral badge-sm">{t.subject}</span>
                            <span className="text-xs mt-1">{t.room}</span>
                          </div>
                        ) : (
                          <span className="text-base-content/30">-</span>
                        )}
                      </td>
                      <td>{t.teacher || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
