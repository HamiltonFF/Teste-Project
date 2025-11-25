import React from 'react';
import { LayoutGrid, Calendar, Inbox, Users, Settings, Bell, Search } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-[60px] h-screen bg-white border-r border-gray-200 flex flex-col items-center py-4 z-50 shadow-sm fixed left-0 top-0">
      <div className="mb-6 bg-blue-600 p-2 rounded-md">
         <LayoutGrid className="text-white w-5 h-5" />
      </div>
      
      <div className="flex-1 flex flex-col gap-6 w-full items-center">
        <NavItem icon={<Inbox size={20} />} active />
        <NavItem icon={<Calendar size={20} />} />
        <NavItem icon={<Users size={20} />} />
        <div className="border-t w-8 border-gray-200 my-2"></div>
        <NavItem icon={<Search size={20} />} />
      </div>

      <div className="flex flex-col gap-6 mb-4">
        <NavItem icon={<Bell size={20} />} />
        <NavItem icon={<Settings size={20} />} />
        <img 
            src="https://picsum.photos/seed/me/100" 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer hover:ring-2 ring-blue-500 transition-all" 
        />
      </div>
    </div>
  );
};

const NavItem = ({ icon, active }: { icon: React.ReactNode; active?: boolean }) => (
  <div className={`p-2 rounded-lg cursor-pointer transition-colors duration-200 ${active ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'}`}>
    {icon}
  </div>
);

export default Sidebar;