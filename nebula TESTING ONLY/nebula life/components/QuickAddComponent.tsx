import React from 'react';
import { PlusIcon } from '../constants';

interface QuickAddProps {
  onOpen: () => void;
}

const QuickAddComponent: React.FC<QuickAddProps> = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:from-fuchsia-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-fuchsia-500"
      aria-label="Quick Add"
    >
      <PlusIcon className="w-5 h-5"/>
      <span className="hidden sm:inline">Quick Add</span>
    </button>
  );
};

export default QuickAddComponent;
