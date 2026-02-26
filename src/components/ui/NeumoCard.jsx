import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const NeumoCard = ({ children, className, hover = true, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "neu-card p-6",
        hover && "hover:-translate-y-1 transition-transform duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default NeumoCard;
