import { useState, useCallback, useEffect } from 'react';

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isCollapsed,
    isMobileOpen,
    isDesktop,
    toggleCollapse,
    toggleMobile,
    closeMobile,
  };
};
