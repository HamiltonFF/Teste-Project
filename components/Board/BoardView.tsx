import React, { useState } from 'react';
import { TaskGroup } from '../../types';
import { ChevronDown, Plus, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusCell from './StatusCell';

interface BoardViewProps {
  data: TaskGroup[];
  onAddTask?: () => void;
}

const BoardView: React.FC<BoardViewProps> = ({ data, onAddTask }) => {
  return (
    <div className="flex flex-col gap-8 pb-20">
      {data.map((group) => (
        <GroupSection key={group.id} group={group} onAddTask={onAddTask} />
      ))}
    </div>
  );
};

const GroupSection: React.FC<{ group: TaskGroup; onAddTask?: () => void }> = ({ group, onAddTask }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Group Header */}
      <div className="group flex items-center gap-2 mb-2 hover:bg-gray-50 p-1 rounded-md transition-colors">
        <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1 rounded hover:bg-gray-200 text-${group.color}-600 transition-transform ${collapsed ? '-rotate-90' : 'rotate-0'}`}
            style={{ color: group.color }}
        >
          <ChevronDown size={20} />
        </button>
        <h3 className="text-lg font-medium" style={{ color: group.color }}>{group.title}</h3>
        <span className="text-gray-400 text-sm font-light ml-2">{group.items.length} tarefas</span>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-[3fr_100px_100px_120px_120px_120px_140px_40px] border-b border-gray-200 text-xs text-gray-500 font-normal bg-gray-50 sticky top-0 z-10">
              <div className="p-3 pl-4 border-r border-gray-100 flex items-center" style={{ borderLeft: `6px solid ${group.color}` }}>Atividade</div>
              <div className="p-3 border-r border-gray-100 flex justify-center">Responsável</div>
              <div className="p-3 border-r border-gray-100 flex justify-center">Revisor</div>
              <div className="p-3 border-r border-gray-100 flex justify-center">Início</div>
              <div className="p-3 border-r border-gray-100 flex justify-center">Previsão</div>
              <div className="p-3 border-r border-gray-100 flex justify-center">Prioridade</div>
              <div className="p-3 border-r border-gray-100 flex justify-center">Status</div>
              <div className="p-3 flex justify-center"><Plus size={16} className="text-gray-400" /></div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
              {group.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-[3fr_100px_100px_120px_120px_120px_140px_40px] hover:bg-gray-50 group/row text-sm text-gray-700 items-center bg-white"
                >
                  {/* Name */}
                  <div className="p-2 pl-4 border-r border-gray-100 h-10 flex items-center relative" style={{ borderLeft: `6px solid ${group.color}` }}>
                    <span className="truncate">{item.name}</span>
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover/row:opacity-100 transition-opacity" style={{ backgroundColor: group.color }}></div>
                  </div>

                  {/* Responsável */}
                  <div className="p-1 border-r border-gray-100 flex justify-center h-10 items-center">
                    <img src={item.owner.avatarUrl} alt={item.owner.name} className="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition-transform" title={item.owner.name} />
                  </div>

                  {/* Revisor */}
                  <div className="p-1 border-r border-gray-100 flex justify-center h-10 items-center">
                    <img src={item.reviewer.avatarUrl} alt={item.reviewer.name} className="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition-transform" title={item.reviewer.name} />
                  </div>

                  {/* Start Date */}
                  <div className="p-1 border-r border-gray-100 flex justify-center h-10 items-center text-gray-600 text-xs">
                    {item.startDate}
                  </div>

                   {/* Due Date */}
                   <div className="p-1 border-r border-gray-100 flex justify-center h-10 items-center text-gray-600 text-xs font-medium">
                    {item.dueDate}
                  </div>

                  {/* Priority */}
                  <div className="border-r border-gray-100 h-10 flex items-center justify-center p-1">
                     <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: item.priority.color }}>
                        {item.priority.label}
                     </span>
                  </div>

                  {/* Status */}
                  <div className="border-r border-gray-100 h-10">
                    <StatusCell label={item.status.label} color={item.status.color} textColor={item.status.textColor} />
                  </div>

                  {/* Actions */}
                  <div className="h-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </div>
                </motion.div>
              ))}

              {/* Add Item Row */}
              <div 
                onClick={onAddTask}
                className="grid grid-cols-[3fr_auto] h-9 items-center hover:bg-gray-50 cursor-pointer transition-colors"
              >
                 <div className="pl-4 flex items-center gap-2 text-gray-400 text-sm" style={{ borderLeft: `6px solid ${group.color}40` }}>
                    <Plus size={16} />
                    <span>Nova Tarefa</span>
                 </div>
              </div>
            </div>
            
            {/* Footer Summary */}
            <div className="grid grid-cols-[3fr_100px_100px_120px_120px_120px_140px_40px] border-t border-gray-200 bg-gray-50 h-8">
                 <div className="col-span-6 border-r border-gray-200"></div>
                 <div className="border-r border-gray-200 flex items-center justify-center">
                    <div className="h-4 w-full bg-gray-200 opacity-60"></div>
                 </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardView;