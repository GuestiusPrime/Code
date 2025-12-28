import React from 'react';
import { SectionId, SectionDefinition } from '../types';
import { PlusIcon, TrashIcon } from '../constants';

interface SidebarProps {
  sections: SectionDefinition[];
  activeSectionId: SectionId;
  setActiveSectionId: (sectionId: SectionId) => void;
  onAddSection: () => void;
  onDeleteSection: (sectionId: SectionId) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, setActiveSectionId, onAddSection, onDeleteSection, isOpen, setIsOpen }) => {
  const handleNavClick = (sectionId: SectionId) => {
    setActiveSectionId(sectionId);
    if(window.innerWidth < 768) {
        setIsOpen(false);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      
      <aside className={`fixed md:relative flex flex-col h-full bg-slate-900/40 backdrop-blur-2xl border-r border-slate-300/10 w-64 shrink-0 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-center p-6 border-b border-slate-300/10">
          <svg className="w-8 h-8 text-fuchsia-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          <h1 className="ml-3 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">NEBULA LIFE</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sections.map(({ id, name, icon: Icon, isCustom }) => (
            <div key={id} className="group relative">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
                  className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSectionId === id
                      ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg shadow-fuchsia-600/20'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{name}</span>
                </a>
                {(id !== 'dashboard' && id !== 'analytics') && (
                     <button onClick={() => onDeleteSection(id)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-500/30 hover:text-red-400 transition-opacity">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                )}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-300/10 space-y-4">
            <button onClick={onAddSection} className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-fuchsia-300 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 hover:text-fuchsia-200">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Section
            </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;