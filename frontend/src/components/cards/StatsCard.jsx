import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, label, value, trend, color = 'primary' }) => {
  const colorMap = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary-500',
      gradient: 'from-primary-500 to-primary-600',
    },
    accent: {
      bg: 'bg-accent-50',
      icon: 'text-accent-500',
      gradient: 'from-accent-500 to-accent-600',
    },
    emerald: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600',
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 12px 40px -8px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden"
    >
      {/* Decorative gradient orb */}
      <div
        className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${colors.gradient} opacity-10 blur-xl`}
      />

      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {trend && (
            <p className="text-xs font-medium text-emerald-600 mt-2">
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
