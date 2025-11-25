
import React, { useMemo } from 'react';
import { TaskGroup, TaskItem } from '../../types';
import { motion } from 'framer-motion';
import { Calendar, Flag } from 'lucide-react';

interface KanbanViewProps {
  data: TaskGroup[];
}

interface KanbanColumn {
  id: string;
  label: string;
  color: string;
  items: TaskItem[];
}

const KanbanView: React.FC<KanbanViewProps> = ({ data }) => {
  const columns = useMemo(() => {
    const allItems = data.flatMap(g => g.items);
    const cols: Record<string, KanbanColumn> = {};

    allItems.forEach(item => {
      const statusKey = item.status.label;
      if (!cols[statusKey]) {
        cols[statusKey] = {
          id: statusKey,
          label: item.status.label,
          color: item.status.color,
          items: []
        };
      }
      cols[statusKey].items.push(item);
    });

    return Object.values(cols);
  }, [data]);

  return (
    <div className="flex gap-6 pb-4 min-h-[calc(100vh-200px)] overflow-x-auto">
      {columns.map((col, colIndex) => (
        <div key={col.id} className="min-w-[280px] w-[280px] flex flex-col">
          {/* Column Header */}
          <div 
            className="rounded-t-lg p-3 text-white font-medium flex justify-between items-center shadow-sm"
            style={{ backgroundColor: col.color }}
          >
            <span>{col.label}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">{col.items.length}</span>
          </div>
          
          {/* Column Body */}
          <div className="bg-gray-100/50 flex-1 p-3 rounded-b-lg border-x border-b border-gray-200 flex flex-col gap-3">
            {col.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + colIndex * 0.1 }}
                whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-800 text-sm leading-tight">{item.name}</span>
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0 ml-2" 
                    style={{ backgroundColor: col.color }}
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{item.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                     <Flag size={12} style={{ color: item.priority.color }} />
                     <span className="px-1.5 py-0.5 rounded text-[10px] text-white font-medium" style={{ backgroundColor: item.priority.color }}>{item.priority.label}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-1">
                    <div className="flex -space-x-2">
                         <img src={item.owner.avatarUrl} alt="Owner" className="w-6 h-6 rounded-full border border-white" title={`Owner: ${item.owner.name}`} />
                         <img src={item.reviewer.avatarUrl} alt="Reviewer" className="w-6 h-6 rounded-full border border-white" title={`Reviewer: ${item.reviewer.name}`} />
                    </div>
                    {/* Optional extra tag could go here */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Add Column Button Placeholder */}
      <div className="min-w-[280px] h-[50px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors">
        + Adicionar Status
      </div>
    </div>
  );
};

export default KanbanView;
