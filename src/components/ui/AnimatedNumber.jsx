import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber = ({ value, prefix = "", suffix = "", className = "" }) => {
  const [internalValue, setInternalValue] = useState(value);
  const spring = useSpring(internalValue, { mass: 1, stiffness: 75, damping: 15 });
  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <span className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
