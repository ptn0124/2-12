import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BoardList from './pages/BoardList';
import FilesList from './pages/FilesList';
import Timetable from './pages/Timetable';
import Menu from './pages/Menu';
import Attendance from './pages/Attendance';
import NumberPicker from './pages/NumberPicker';
import Calendar from './pages/Calendar';

function Ybt() { return <div className="py-20 text-center">열북타 준비 중</div>; }

export default function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Boards & Notices */}
          <Route path="/board/community" element={<BoardList title="커뮤니티" apiCategory="일반" />} />
          <Route path="/notice/class" element={<BoardList title="학급 공지사항" apiCategory="공지" />} />
          <Route path="/notice/assessments" element={<BoardList title="수행평가 공지" apiCategory="수행평가" />} />
          <Route path="/board/files" element={<FilesList />} />

          {/* Tools & Views */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/ybt" element={<Ybt />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/attend/yaja" element={<Attendance title="야간자율학습 출석" description="매일 밤 야자 출석을 체크합니다" />} />
          <Route path="/attend/studygroup" element={<Attendance title="스터디그룹 출석" description="스터디 그룹 활동 참석 여부입니다" />} />
          <Route path="/numberpicker" element={<NumberPicker />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}
