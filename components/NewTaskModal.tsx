import React, { useState } from 'react';
import { X } from 'lucide-react';
import { USERS } from '../constants';
import { TaskGroup, TaskItem, Person } from '../types';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<TaskItem>, groupId: string) => void;
  groups: TaskGroup[];
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onSave, groups }) => {
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState(groups[0]?.id || '');
  const [ownerId, setOwnerId] = useState(Object.values(USERS)[0].id);
  const [dueDate, setDueDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format date simple "DD MMM YYYY" logic or just raw string for prototype
    const dateObj = new Date(dueDate);
    const formattedDate = dateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });

    onSave({
      name,
      startDate: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      dueDate: formattedDate,
      owner: Object.values(USERS).find(u => u.id === ownerId),
      reviewer: Object.values(USERS).find(u => u.id === '1'), // Default logic
      priority: { label: 'Média', type: 'medium', color: '#3b82f6' },
      status: { label: 'Pendente', color: '#94a3b8', textColor: '#fff' }
    }, groupId);

    // Reset and close
    setName('');
    setDueDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-semibold text-gray-800">Nova Atividade</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Tarefa</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Ex: Refatorar módulo de Login"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grupo (Sprint/Fase)</label>
              <select 
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none"
              >
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
              <select 
                 value={ownerId}
                 onChange={(e) => setOwnerId(e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none"
              >
                {Object.values(USERS).map(u => (
                  <option key={u.id} value={u.id}>{u.name.split(' ')[0]}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Entrega</label>
            <input 
              required
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md shadow-blue-200 transition-all font-medium"
            >
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;