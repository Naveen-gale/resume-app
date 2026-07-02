import { motion } from 'framer-motion';

const Loader = ({ text = 'Generating with AI...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      {/* Animated dots */}
      <div className="flex items-center gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Pulsing ring */}
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-primary-200 border-t-primary-500 mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />

      {/* Text */}
      <motion.p
        className="text-sm font-medium text-slate-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default Loader;
