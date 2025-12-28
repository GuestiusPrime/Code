import React from 'react';
import { PlusIcon } from '../constants';

interface AddBlockCardProps {
  onClick: () => void;
}

const AddBlockCard: React.FC<AddBlockCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className="relative group bg-gradient-to-br from-fuchsia-600 to-pink-500 border-transparent rounded-2xl shadow-lg hover:shadow-xl hover:shadow-fuchsia-600/30 hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-center items-center cursor-pointer p-6 text-white h-full"
      aria-label="Add new item"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-white/20 rounded-full mb-4 transition-transform group-hover:scale-110">
          <PlusIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold">Add Item</h3>
        <p className="text-sm text-fuchsia-100 mt-1">Click to create a new entry</p>
      </div>
    </div>
  );
};

export default AddBlockCard;
