import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { useSidebar } from '../hooks/useSidebar';
import { useProfiles } from '../hooks/useProfiles';
import { useResumes } from '../hooks/useResumes';
import { useCoverLetters } from '../hooks/useCoverLetters';
import { createContext, useContext } from 'react';

// App context to share state across pages
export const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

const MainLayout = () => {
  const sidebar = useSidebar();
  const profilesState = useProfiles();
  const resumesState = useResumes();
  const coverLettersState = useCoverLetters();

  const contextValue = {
    ...profilesState,
    ...resumesState,
    ...coverLettersState,
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

        <motion.main
          animate={{
            marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024
              ? sidebar.isCollapsed ? 72 : 256
              : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="min-h-screen"
        >
          <Navbar toggleMobile={sidebar.toggleMobile} />
          <Outlet />
        </motion.main>
      </div>
    </AppContext.Provider>
  );
};

export default MainLayout;
