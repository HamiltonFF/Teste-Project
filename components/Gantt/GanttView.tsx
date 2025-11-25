
import React, { useMemo } from 'react';
import { TaskGroup } from '../../types';
import { parseCustomDate, addDays, getMonthName } from '../../utils';
import { motion } from 'framer-motion';

interface GanttViewProps {
  data: TaskGroup[];
}

const CELL_WIDTH = 40;

const GanttView: React.FC<GanttViewProps> = ({ data }) => {
  const { allItems, minDate, totalDays, months } = useMemo(() => {
    const items = data.flatMap(g => g.items.map(i => ({ ...i, groupColor: g.color })));
    
    if (items.length === 0) return { allItems: [], minDate: new Date(), totalDays: 0, months: [] };

    // Calculate Dates based on start and due dates
    const startDates = items.map(i => parseCustomDate(i.startDate).getTime());
    const dueDates = items.map(i => parseCustomDate(i.dueDate).getTime());
    
    const minTime = Math.min(...startDates);
    const maxTime = Math.max(...dueDates);
    
    // Add buffer: start 3 days before min, end 7 days after max
    const startDate = addDays(new Date(minTime), -3);
    const endDate = addDays(new Date(maxTime), 7);
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Generate Month Headers
    const monthHeaders = [];
    let currentDate = new Date(startDate);
    let currentMonth = currentDate.getMonth();
    let daysInCurrentMonth = 0;

    for (let i = 0; i < days; i++) {
        if (currentDate.getMonth() !== currentMonth) {
            monthHeaders.push({ 
                name: getMonthName(currentMonth), 
                days: daysInCurrentMonth,
                year: currentDate.getFullYear()
            });
            currentMonth = currentDate.getMonth();
            daysInCurrentMonth = 0;
        }
        daysInCurrentMonth++;
        currentDate.setDate(currentDate.getDate() + 1);
    }
    monthHeaders.push({ name: getMonthName(currentMonth), days: daysInCurrentMonth, year: currentDate.getFullYear() });

    return { allItems: items, minDate: startDate, totalDays: days, months: monthHeaders };
  }, [data]);

  const getDatePosition = (dateStr: string) => {
    const date = parseCustomDate(dateStr);
    const diffTime = date.getTime() - minDate.getTime();
    const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return daysDiff * CELL_WIDTH;
  };

  const getDurationWidth = (startStr: string, endStr: string) => {
      const start = parseCustomDate(startStr);
      const end = parseCustomDate(endStr);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      // Minimum 1 day width
      const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      return days * CELL_WIDTH;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full max-h-[calc(100vh-200px)]">
      
      <div className="flex flex-1 overflow-auto relative">
        {/* Left Sidebar - Task Names */}
        <div className="sticky left-0 z-20 bg-white border-r border-gray-200 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)] min-w-[250px] max-w-[250px]">
           <div className="h-[60px] bg-gray-50 border-b border-gray-200 flex items-end p-3 font-semibold text-gray-500 text-sm">
                Tarefa
           </div>
           <div>
               {allItems.map((item) => (
                   <div key={item.id} className="h-[48px] border-b border-gray-100 flex items-center px-4 text-sm text-gray-700 truncate hover:bg-gray-50">
                       <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.groupColor }} />
                       {item.name}
                   </div>
               ))}
           </div>
        </div>

        {/* Timeline Area */}
        <div className="flex-1 overflow-x-auto relative">
            <div style={{ width: totalDays * CELL_WIDTH }}>
                {/* Header */}
                <div className="h-[60px] bg-gray-50 border-b border-gray-200 flex sticky top-0 z-10">
                    {months.map((m, i) => (
                        <div key={i} className="flex flex-col border-r border-gray-200" style={{ width: m.days * CELL_WIDTH }}>
                            <div className="h-1/2 flex items-center justify-center text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-100">
                                {m.name} {m.year}
                            </div>
                            <div className="h-1/2 flex">
                                {Array.from({ length: m.days }).map((_, d) => (
                                    <div key={d} className="flex-1 border-r border-gray-100 last:border-0 flex items-center justify-center text-[10px] text-gray-400">
                                        {d + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grid Body */}
                <div className="relative">
                    {/* Vertical Lines */}
                    <div className="absolute inset-0 flex pointer-events-none">
                        {Array.from({ length: totalDays }).map((_, i) => (
                            <div key={i} className="flex-1 border-r border-gray-50 h-full" />
                        ))}
                    </div>

                    {/* Bars */}
                    {allItems.map((item, index) => (
                        <div key={item.id} className="h-[48px] border-b border-gray-100 relative w-full hover:bg-gray-50/50">
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: getDurationWidth(item.startDate, item.dueDate), opacity: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="absolute top-2 h-8 rounded-full shadow-md flex items-center px-3 text-xs text-white whitespace-nowrap overflow-hidden cursor-pointer hover:brightness-110 z-10 group"
                                style={{ 
                                    left: getDatePosition(item.startDate),
                                    backgroundColor: item.groupColor 
                                }}
                            >
                                <span className="font-medium drop-shadow-md mr-2">{item.status.label}</span>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GanttView;
