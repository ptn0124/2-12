import { useState } from 'react';

export default function Menu() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="flex-grow w-full max-w-2xl mx-auto flex flex-col pt-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">급식표</h2>
        <input 
          type="date" 
          className="input input-sm input-bordered" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>

      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body p-8 items-center text-center">
          <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🍽️</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">백엔드 API 미연동</h3>
          <p className="text-base-content/70 text-sm">
            현재 식단 정보 API 명세가 제공되지 않아 기본 틀만 구성해두었습니다.<br/>
            (추후 나이스(NEIS) 오픈 API 등을 통해 연동 가능합니다.)
          </p>
        </div>
      </div>
    </div>
  );
}
