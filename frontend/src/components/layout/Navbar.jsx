import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../constants/navigation';

const Navbar = ({ toggleMobile }) => {
  const location = useLocation();

  const currentPage = NAVIGATION_ITEMS.find(
    (item) => item.path === location.pathname
  );

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobile}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {currentPage?.label || 'Dashboard'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {getPageDescription(currentPage?.id)}
            </p>
          </div>
        </div>

        {/* Right side - Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

function getPageDescription(id) {
  const descriptions = {
    dashboard: 'Welcome back! Here\'s your overview.',
    profiles: 'Manage your professional profiles.',
    resume: 'Generate AI-powered resumes.',
    'cover-letter': 'Create tailored cover letters.',
    settings: 'Configure your preferences.',
  };
  return descriptions[id] || 'Welcome back!';
}

export default Navbar;
