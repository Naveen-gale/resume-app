import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  padding = true,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 12px 40px -8px rgba(0,0,0,0.1)' } : {}}
      transition={{ duration: 0.2 }}
      className={`
        bg-white rounded-2xl border border-slate-100 shadow-sm
        transition-colors duration-200
        ${padding ? 'p-6' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
