import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BoardView from './components/Board/BoardView';
import MetricsView from './components/Dashboard/MetricsView';
import KanbanView from './components/Kanban/KanbanView';
import GanttView from './components/Gantt/GanttView';
import NewTaskModal from './components/NewTaskModal';
import { INITIAL_DATA } from './constants';
import { ViewMode, TaskGroup, TaskItem } from './types';
import { Table, BarChart2, Kanban, Plus, LayoutList } from 'lucide-react';
import { motion } from 'framer-motion';

const STORAGE_KEY = 'project_pulse_data_v1';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('table');
  
  // Initialize state from localStorage or fallback to INITIAL_DATA
  const [data, setData] = useState<TaskGroup[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleAddTask = (newTask: Partial<TaskItem>, groupId: string) => {
    setData(prevData => prevData.map(group => {
      if (group.id !== groupId) return group;
      
      const fullTask: TaskItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: newTask.name || 'Nova Tarefa',
        owner: newTask.owner!,
        reviewer: newTask.reviewer!,
        startDate: newTask.startDate || '',
        dueDate: newTask.dueDate || '',
        priority: newTask.priority!,
        status: newTask.status!
      };

      return {
        ...group,
        items: [...group.items, fullTask]
      };
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#f5f6f8] text-gray-900 font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-[60px] max-w-[calc(100vw-60px)] h-screen overflow-hidden">
        <Header />
        
        {/* View Tabs */}
        <div className="flex-none bg-white border-b border-gray-200 px-8 pt-2">
            <div className="flex items-center gap-6 text-sm">
                <TabButton 
                    active={activeView === 'table'} 
                    onClick={() => setActiveView('table')} 
                    icon={<Table size={16} />} 
                    label="Quadro principal" 
                />
                <TabButton 
                    active={activeView === 'gantt'} 
                    onClick={() => setActiveView('gantt')} 
                    icon={<LayoutList size={16} />} 
                    label="Gantt" 
                />
                <TabButton 
                    active={activeView === 'kanban'} 
                    onClick={() => setActiveView('kanban')} 
                    icon={<Kanban size={16} />} 
                    label="Kanban" 
                />
                 <TabButton 
                    active={activeView === 'dashboard'} 
                    onClick={() => setActiveView('dashboard')} 
                    icon={<BarChart2 size={16} />} 
                    label="Métricas" 
                />
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-md transition-colors ml-[-10px] flex items-center gap-1"
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6 scroll-smooth bg-[#f5f6f8]">
           <motion.div 
             key={activeView}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.2 }}
             className="h-full min-w-full"
           >
            {activeView === 'table' && (
              <div className="min-w-[1000px]">
                <BoardView data={data} onAddTask={() => setIsModalOpen(true)} />
              </div>
            )}
            {activeView === 'kanban' && <div className="h-full"><KanbanView data={data} /></div>}
            {activeView === 'gantt' && <div className="h-full"><GanttView data={data} /></div>}
            {activeView === 'dashboard' && <MetricsView data={data} />}
           </motion.div>
        </div>
      </div>

      <NewTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
        groups={data}
      />
    </div>
  );
}

const TabButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
    <button 
        onClick={onClick}
        className={`
            flex items-center gap-2 pb-3 border-b-2 transition-all duration-200 px-2 rounded-t-md hover:bg-gray-50
            ${active ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-500 hover:text-gray-800'}
        `}
    >
        {icon}
        <span>{label}</span>
    </button>
);