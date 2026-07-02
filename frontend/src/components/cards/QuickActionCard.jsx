import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const QuickActionCard = ({
  icon: Icon,
  title,
  description,
  gradient = 'from-primary-500 to-accent-500',
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ y: -4, boxShadow: '0 16px 48px -8px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-left w-full group cursor-pointer transition-colors"
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      <h3 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
        {title}
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
      </h3>
      <p className="text-sm text-slate-500">{description}</p>
    </motion.button>
  );
};

export default QuickActionCard;
