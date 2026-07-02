import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Palette,
  Bell,
  Download,
  Info,
  Moon,
  Sun,
  ChevronRight,
} from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import FadeIn from '../../components/animations/FadeIn';
import { useAppContext } from '../../layouts/MainLayout';

const SettingsPage = () => {
  const { addToast } = useAppContext();

  return (
    <PageWrapper>
      <FadeIn>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Appearance */}
          <SettingsSection
            icon={Palette}
            title="Appearance"
            description="Customize how the app looks"
          >
            <ThemePicker />
            <SettingSelect
              label="Font size"
              options={['Small', 'Medium', 'Large']}
              defaultValue="Medium"
            />
          </SettingsSection>

          {/* Export */}
          <SettingsSection
            icon={Download}
            title="Export & Data"
            description="Manage your data and exports"
          >
            <SettingAction
              label="Export all data"
              description="Download all your profiles, resumes, and cover letters"
              actionLabel="Export"
              onAction={() => addToast('Export started — this is a demo', 'info')}
            />
            <SettingAction
              label="Clear all data"
              description="Remove all saved profiles and documents"
              actionLabel="Clear"
              variant="danger"
              onAction={() => addToast('This is a demo — no data was cleared', 'info')}
            />
          </SettingsSection>

          {/* About */}
          <SettingsSection
            icon={Info}
            title="About"
            description="Application information"
          >
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-slate-600">Version</span>
              <span className="text-sm font-medium text-slate-900">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-slate-50">
              <span className="text-sm text-slate-600">Built with</span>
              <span className="text-sm font-medium text-slate-900">
                React + Tailwind CSS
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-slate-50">
              <span className="text-sm text-slate-600">License</span>
              <span className="text-sm font-medium text-slate-900">MIT</span>
            </div>
          </SettingsSection>
        </div>
      </FadeIn>
    </PageWrapper>
  );
};

// Sub-components

const SettingsSection = ({ icon: Icon, title, description, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
  >
    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary-500" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <div className="px-6 py-2">{children}</div>
  </motion.div>
);

const SettingToggle = ({ label, description, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`
          relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer
          ${checked ? 'bg-primary-500' : 'bg-slate-200'}
        `}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );
};

const SettingSelect = ({ label, options, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

const SettingAction = ({ label, description, actionLabel, variant = 'default', onAction }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <div>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    </div>
    <button
      onClick={onAction}
      className={`
        px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer
        ${variant === 'danger'
          ? 'text-red-600 bg-red-50 hover:bg-red-100'
          : 'text-primary-600 bg-primary-50 hover:bg-primary-100'
        }
      `}
    >
      {actionLabel}
    </button>
  </div>
);

const ThemePicker = () => {
  const [theme, setTheme] = useState('light');

  const themes = [
    { id: 'light', label: 'Light', icon: Sun, color: 'bg-white border-slate-200' },
    { id: 'dark', label: 'Dark', icon: Moon, color: 'bg-slate-800 border-slate-700' },
  ];

  return (
    <div className="py-3 border-b border-slate-50">
      <p className="text-sm font-medium text-slate-700 mb-3">Theme</p>
      <div className="flex gap-3">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer
              ${theme === t.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-slate-200 hover:border-slate-300'
              }
            `}
          >
            <t.icon className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
