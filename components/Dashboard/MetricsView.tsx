
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { TaskGroup } from '../../types';
import { motion } from 'framer-motion';

const MetricsView = ({ data }: { data: TaskGroup[] }) => {

  // Process data for charts
  const allItems = data.flatMap(g => g.items);
  
  const statusCounts = allItems.reduce((acc, item) => {
    acc[item.status.label] = (acc[item.status.label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key],
    color: allItems.find(i => i.status.label === key)?.status.color || '#888'
  }));

  const priorityCounts = allItems.reduce((acc, item) => {
    acc[item.priority.label] = (acc[item.priority.label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityData = Object.keys(priorityCounts).map(key => ({
    name: key,
    count: priorityCounts[key]
  }));

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
      
      {/* Chart 1: Status Distribution */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-6 w-full text-left">Distribuição por Status</h3>
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
            </PieChart>
            </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Chart 2: Tasks by Priority */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-6">Tarefas por Prioridade</h3>
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30} />
            </BarChart>
            </ResponsiveContainer>
        </div>
      </motion.div>

       {/* Scorecard */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.3 }}
         className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg flex justify-between items-center"
       >
            <div>
                <p className="text-blue-100 font-medium mb-1">Total de Tarefas</p>
                <h2 className="text-5xl font-bold">{allItems.length}</h2>
            </div>
            <div className="flex gap-12 text-center">
                <div>
                    <p className="text-blue-100 text-sm mb-1">Em Progresso</p>
                    <p className="text-2xl font-bold">{allItems.filter(i => i.status.label.includes('Progresso')).length}</p>
                </div>
                <div>
                    <p className="text-blue-100 text-sm mb-1">Entregues</p>
                    <p className="text-2xl font-bold">{allItems.filter(i => i.status.label === 'Entregue').length}</p>
                </div>
                <div>
                    <p className="text-blue-100 text-sm mb-1">Atrasadas</p>
                    <p className="text-2xl font-bold">0</p>
                </div>
            </div>
       </motion.div>

    </div>
  );
};

export default MetricsView;
