import React from 'react';
import { motion } from 'framer-motion';

interface StatusCellProps {
  label: string;
  color: string;
  textColor?: string;
  type?: 'solid' | 'pill';
  width?: string;
}

const StatusCell: React.FC<StatusCellProps> = ({ label, color, textColor = '#fff', type = 'solid', width = 'w-full' }) => {
  const isPill = type === 'pill';

  return (
    <div className={`h-full w-full flex items-center justify-center p-1`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          ${width} h-8 flex items-center justify-center text-xs font-medium truncate px-2 cursor-pointer transition-all shadow-sm
          ${isPill ? 'rounded-full' : 'rounded-sm'}
        `}
        style={{
          backgroundColor: isPill ? '#e0f2fe' : color, // light blue for pills fallback
          color: isPill ? '#0369a1' : textColor,
        }}
      >
        {label}
        {/* Fold animation corner effect can be added here with CSS if needed */}
      </motion.div>
    </div>
  );
};

export default StatusCell;