import { motion } from 'framer-motion';
import { FileText, Mail, UserCircle } from 'lucide-react';

const typeConfig = {
  resume: {
    icon: FileText,
    bg: 'bg-primary-50',
    color: 'text-primary-500',
    dot: 'bg-primary-500',
  },
  'cover-letter': {
    icon: Mail,
    bg: 'bg-accent-50',
    color: 'text-accent-500',
    dot: 'bg-accent-500',
  },
  profile: {
    icon: UserCircle,
    bg: 'bg-emerald-50',
    color: 'text-emerald-500',
    dot: 'bg-emerald-500',
  },
};

const ActivityCard = ({ activity, index = 0 }) => {
  const config = typeConfig[activity.type] || typeConfig.profile;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-start gap-4 py-3"
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center">
        <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${config.color}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">
            {activity.action}
          </span>
          <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        </div>
        <p className="text-sm text-slate-600 mt-0.5 truncate">
          {activity.description}
        </p>
        <p className="text-xs text-slate-400 mt-1">{activity.timestamp}</p>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
