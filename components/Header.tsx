
import React from 'react';
import { Home, ChevronRight, Zap, Plug, MoreHorizontal, UserPlus } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-4">
      {/* Breadcrumb Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
           <Home size={16} className="cursor-pointer hover:text-blue-600"/>
           <ChevronRight size={14} />
           <span className="hover:underline cursor-pointer">Engenharia</span>
           <ChevronRight size={14} />
           <span className="text-gray-900 font-medium">Roadmap Q1 2024</span>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex -space-x-2 mr-2">
                {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i+40}/50`} className="w-7 h-7 rounded-full border-2 border-white" alt="User" />
                ))}
                <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600 font-medium">+8</div>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                <UserPlus size={18} />
                <span className="text-sm">Convidar</span>
            </button>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* Title Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Roadmap de Tecnologia</h1>
            <div className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-500 cursor-pointer hover:bg-gray-200">
                Público
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-sm">
                <Plug size={16} />
                GitHub
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-sm">
                <Zap size={16} />
                Automations / 5
            </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
