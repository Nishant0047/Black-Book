import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const NeumoButton = ({ children, className, variant = "default", onClick, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "neu-btn flex items-center justify-center gap-2",
        variant === 'danger' && "text-dark-error hover:text-dark-error hover:shadow-[0_0_15px_rgba(248,113,113,0.5)]",
        variant === 'success' && "text-dark-success hover:text-dark-success hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]",
        variant === 'accent' && "text-dark-accent hover:text-dark-accent hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default NeumoButton;
