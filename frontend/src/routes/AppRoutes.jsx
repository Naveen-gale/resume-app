import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProfilesPage from '../pages/profiles/ProfilesPage';
import ResumePage from '../pages/resume/ResumePage';
import CoverLetterPage from '../pages/cover-letter/CoverLetterPage';
import SettingsPage from '../pages/settings/SettingsPage';
import HistoryPage from '../pages/history/HistoryPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
