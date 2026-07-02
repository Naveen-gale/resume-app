import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { useSidebar } from '../hooks/useSidebar';
import { useProfiles } from '../hooks/useProfiles';
import { useResumes } from '../hooks/useResumes';
import { useCoverLetters } from '../hooks/useCoverLetters';
import { useTheme } from '../hooks/useTheme';
import { createContext, useContext } from 'react';

// App context to share state across pages
export const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

const MainLayout = () => {
  const sidebar = useSidebar();
  const profilesState = useProfiles();
  const resumesState = useResumes();
  const coverLettersState = useCoverLetters();
  const themeState = useTheme();

  const contextValue = {
    ...profilesState,
    ...resumesState,
    ...coverLettersState,
    ...themeState,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-slate-50">
        <Sidebar
          isCollapsed={sidebar.isCollapsed}
          isMobileOpen={sidebar.isMobileOpen}
          toggleCollapse={sidebar.toggleCollapse}
          closeMobile={sidebar.closeMobile}
        />

        <main
          className={`min-h-screen transition-all duration-300 ease-in-out ${
            sidebar.isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
          }`}
        >
          <Navbar toggleMobile={sidebar.toggleMobile} />
          <Outlet />
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default MainLayout;
