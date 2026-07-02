import { motion } from 'framer-motion';

const directions = {
  up: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
  none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
}) => {
  const { initial, animate } = directions[direction] || directions.up;

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
