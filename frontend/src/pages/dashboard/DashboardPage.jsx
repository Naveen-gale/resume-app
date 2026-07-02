import { useNavigate } from 'react-router-dom';
import { UserCircle, FileText, Mail } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import StatsCard from '../../components/cards/StatsCard';
import QuickActionCard from '../../components/cards/QuickActionCard';
import ActivityCard from '../../components/cards/ActivityCard';
import FadeIn from '../../components/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '../../components/animations/StaggerChildren';
import { useAppContext } from '../../layouts/MainLayout';
import { formatDate } from '../../utils/helpers';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { profiles, resumes, coverLetters } = useAppContext();

  const recentActivities = [
    ...profiles.map((p) => ({
      id: p.id || p._id,
      type: 'profile',
      action: 'Created Profile',
      description: p.fullName,
      createdAt: new Date(p.createdAt || Date.now()),
    })),
    ...resumes.map((r) => ({
      id: r.id || r._id,
      type: 'resume',
      action: 'Generated Resume',
      description: `${r.jobTitle} at ${r.company || 'Target Company'}`,
      createdAt: new Date(r.createdAt || Date.now()),
    })),
    ...coverLetters.map((c) => ({
      id: c.id || c._id,
      type: 'cover-letter',
      action: 'Generated Cover Letter',
      description: `${c.jobTitle} at ${c.company || 'Target Company'}`,
      createdAt: new Date(c.createdAt || Date.now()),
    })),
  ]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map((item) => ({ ...item, timestamp: formatDate(item.createdAt) }));

  const stats = [
    {
      label: 'Total Profiles',
      value: profiles.length,
      icon: UserCircle,
      color: 'emerald',
      trend: '+2 this month',
    },
    {
      label: 'Total Resumes',
      value: resumes.length,
      icon: FileText,
      color: 'primary',
      trend: '+3 this month',
    },
    {
      label: 'Total Cover Letters',
      value: coverLetters.length,
      icon: Mail,
      color: 'accent',
      trend: '+3 this month',
    },
  ];

  const quickActions = [
    {
      icon: UserCircle,
      title: 'Create Profile',
      description: 'Set up a new professional profile with your details.',
      gradient: 'from-emerald-500 to-teal-600',
      onClick: () => navigate('/profiles'),
    },
    {
      icon: FileText,
      title: 'Generate Resume',
      description: 'Create an AI-powered resume tailored to any job.',
      gradient: 'from-primary-500 to-primary-600',
      onClick: () => navigate('/resume'),
    },
    {
      icon: Mail,
      title: 'Generate Cover Letter',
      description: 'Write a compelling cover letter in seconds.',
      gradient: 'from-accent-500 to-accent-600',
      onClick: () => navigate('/cover-letter'),
    },
  ];

  return (
    <PageWrapper>
      {/* Stats */}
      <FadeIn>
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatsCard {...stat} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={0.2}>
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickActions.map((action) => (
              <StaggerItem key={action.title}>
                <QuickActionCard {...action} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </FadeIn>

      {/* Recent Activity */}
      <FadeIn delay={0.4}>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Activity
          </h2>
          <div className="divide-y divide-slate-50">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  index={index}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500 py-4">No recent activity found.</p>
            )}
          </div>
        </div>
      </FadeIn>
    </PageWrapper>
  );
};

export default DashboardPage;
