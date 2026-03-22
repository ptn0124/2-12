import { useState } from 'react';

export default function NumberPicker() {
  const [pickedNumbers, setPickedNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const TOTAL_NUMBERS = 29;
  const EXCLUDED_NUMBERS = [23];

  const handlePick = () => {
    if (isSpinning) return;
    
    // Generate available pool
    const pool = [];
    for (let i = 1; i <= TOTAL_NUMBERS; i++) {
        if (!EXCLUDED_NUMBERS.includes(i) && !pickedNumbers.includes(i)) {
            pool.push(i);
        }
    }

    if (pool.length === 0) {
        alert('모든 번호를 뽑았습니다!');
        return;
    }

    setIsSpinning(true);
    let spins = 0;
    
    // Visual spinning effect
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * pool.length);
        setCurrentNumber(pool[randomIndex]);
        spins++;

        if (spins > 15) {
            clearInterval(interval);
            const finalNumber = pool[Math.floor(Math.random() * pool.length)];
            setCurrentNumber(finalNumber);
            setPickedNumbers(prev => [...prev, finalNumber]);
            setIsSpinning(false);
        }
    }, 100);
  };

  const handleReset = () => {
    if(confirm('초기화하시겠습니까?')) {
        setPickedNumbers([]);
        setCurrentNumber(null);
    }
  };

  return (
    <div className="flex-grow w-full max-w-lg mx-auto flex flex-col pt-10 space-y-8 items-center text-center">
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-2">랜덤 번호 추첨</h2>
        <p className="opacity-60 text-sm">1~29번 중 23번 제외</p>
      </div>

      <div className={`w-48 h-48 rounded-full border-8 flex items-center justify-center transition-all ${isSpinning ? 'border-neutral animate-pulse' : 'border-base-300'}`}>
        <span className="text-6xl font-black">
            {currentNumber ? currentNumber : '?'}
        </span>
      </div>

      <div className="flex space-x-4">
        <button 
            type="button" 
            className="btn btn-neutral btn-lg px-10" 
            onClick={handlePick}
            disabled={isSpinning}
        >
            뽑기
        </button>
        <button 
            type="button" 
            className="btn btn-ghost btn-lg text-error" 
            onClick={handleReset}
        >
            초기화
        </button>
      </div>

      <div className="w-full card bg-base-100 shadow border border-base-200 mt-8">
        <div className="card-body p-4 text-left">
            <h3 className="font-semibold mb-2">당첨된 번호 (총 {pickedNumbers.length}명)</h3>
            <div className="flex flex-wrap gap-2">
                {pickedNumbers.length === 0 ? <span className="opacity-50 text-sm">아직 없습니다.</span> : null}
                {pickedNumbers.map(num => (
                    <span key={num} className="badge badge-lg badge-neutral">{num}</span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
