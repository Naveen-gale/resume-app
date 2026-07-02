import {
  LayoutDashboard,
  UserCircle,
  FileText,
  Mail,
  Settings,
  History,
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    id: 'profiles',
    label: 'Profiles',
    path: '/profiles',
    icon: UserCircle,
  },
  {
    id: 'resume',
    label: 'Resume',
    path: '/resume',
    icon: FileText,
  },
  {
    id: 'cover-letter',
    label: 'Cover Letter',
    path: '/cover-letter',
    icon: Mail,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
  {
    id: 'history',
    label: 'History',
    path: '/history',
    icon: History,
  },
];
