import React from 'react';
import { Skill, Hobby, Project, Goal, JournalEntry, SkillLevel, CustomItem } from '../types';
import { TrashIcon } from '../constants';

type CardProps = 
  (
    | { type: 'skill'; data: Skill }
    | { type: 'hobby'; data: Hobby }
    | { type: 'project'; data: Project }
    | { type: 'goal'; data: Goal }
    | { type: 'journal'; data: JournalEntry }
    | { type: 'custom'; data: CustomItem }
  ) & { 
    onDelete: () => void; 
    onEdit: () => void;
    onMarkDone?: () => void;
  };

const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

const ActivityTracker: React.FC<{ completions?: Date[] }> = ({ completions = [] }) => {
    const today = new Date();
    
    // Calculate Monday of the current week
    const currentDayOfWeek = today.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
    const diff = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Adjust to make Monday the start of the week
    const monday = new Date(today);
    monday.setDate(today.getDate() - diff);
    monday.setHours(0, 0, 0, 0);

    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        return date;
    });

    const completionDates = completions.map(d => new Date(d));

    return (
        <div>
            <span className="text-sm font-medium text-gray-300 mb-2 block">This Week's Activity</span>
            <div className="flex gap-1.5 justify-center sm:justify-between">
                {days.map((day, i) => {
                    const isCompleted = completionDates.some(cd => isSameDay(cd, day));
                    const isToday = isSameDay(today, day);
                    const dayInitial = day.toLocaleDateString('en-US', { weekday: 'short' })[0];
                    return (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                            <div
                                className={`w-6 h-6 rounded-md transition-colors ${isCompleted ? 'bg-gradient-to-t from-fuchsia-600 to-violet-500 shadow-[0_0_8px_rgba(217,70,239,0.5)]' : 'bg-slate-700/50'} ${isToday ? 'ring-2 ring-fuchsia-400' : ''}`}
                                title={`${day.toLocaleDateString()}: ${isCompleted ? 'Completed' : 'Not completed'}`}
                            />
                            <span className="text-xs text-slate-400 font-medium">{dayInitial}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const SectionCard: React.FC<CardProps> = (props) => {
  const { type, data, onDelete, onEdit, onMarkDone } = props;

  const hasCompletions = ['skill', 'hobby', 'project', 'goal'].includes(type);
  const today = new Date();
  const isDoneToday = hasCompletions && 'completions' in data && Array.isArray(data.completions) && data.completions.some(d => isSameDay(new Date(d), today));


  const renderCardContent = () => {
    switch (type) {
      case 'skill':
        const levelColor = data.level === SkillLevel.Beginner ? 'text-amber-400 bg-amber-900/50' : data.level === SkillLevel.Intermediate ? 'text-blue-400 bg-blue-900/50' : 'text-green-400 bg-green-900/50';
        return (
          <>
            <h3 className="text-lg font-bold text-white">{data.name}</h3>
            <p className="text-sm text-gray-400 mb-3 min-h-[20px]">{data.description}</p>
            <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${levelColor}`}>
                    {data.level}
                </span>
                <div className="flex flex-wrap gap-1 justify-end">
                    {data.tags.map(tag => (
                        <span key={tag} className="text-xs text-slate-300 bg-slate-700/50 px-2 py-0.5 rounded">#{tag}</span>
                    ))}
                </div>
            </div>
          </>
        );
      case 'hobby':
        return (
          <>
            <h3 className="text-lg font-bold text-white">{data.name}</h3>
            <p className="text-sm text-gray-400">Last practiced: {new Date(data.lastPracticed).toLocaleDateString()}</p>
            <p className="text-sm text-gray-400 capitalize">Frequency: {data.frequency}</p>
          </>
        );
      case 'project':
        return (
            <>
              <h3 className="text-lg font-bold text-white">{data.title}</h3>
              <p className="text-sm text-gray-400 mb-3 min-h-[20px]">{data.goal}</p>
              <p className="text-sm font-medium text-gray-300">Due: {new Date(data.dueDate).toLocaleDateString()}</p>
            </>
          );
      case 'goal':
        return (
            <>
              <h3 className="text-lg font-bold text-white">{data.name}</h3>
              <p className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block mb-3 ${data.type === 'short-term' ? 'bg-purple-500/30 text-purple-300' : 'bg-indigo-500/30 text-indigo-300'}`}>{data.type}</p>
              <p className="text-sm font-medium text-gray-300">Deadline: {new Date(data.deadline).toLocaleDateString()}</p>
            </>
          );
      case 'journal':
        return (
            <>
              <h3 className="text-lg font-bold text-white">{data.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{new Date(data.date).toLocaleString()}</p>
              <p className="text-gray-300 line-clamp-3 mb-3">{data.content}</p>
              <div className="flex flex-wrap gap-1">
                    {data.tags.map(tag => (
                        <span key={tag} className="text-xs text-slate-300 bg-slate-700/50 px-2 py-0.5 rounded">#{tag}</span>
                    ))}
                </div>
            </>
        );
    case 'custom':
        return (
            <>
              <h3 className="text-lg font-bold text-white">{data.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{new Date(data.date).toLocaleString()}</p>
              <p className="text-gray-300 line-clamp-4 mb-3">{data.notes}</p>
            </>
        );
    }
  };

  return (
    <div className="relative group bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-lg hover:border-fuchsia-500/80 hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between cursor-pointer" onClick={onEdit} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onEdit()}>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="absolute top-2 right-2 p-1.5 text-gray-400 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 hover:bg-red-500/30 hover:text-red-300 transition-all z-10" aria-label="Delete item">
          <TrashIcon className="w-4 h-4" />
      </button>
      <div className="p-6 h-full flex flex-col justify-between">
        <div className="flex-grow mb-4">
            {renderCardContent()}
        </div>
        
        {hasCompletions && (
            <div className="space-y-4 pt-2 border-t border-slate-700/50">
                <ActivityTracker completions={'completions' in data ? data.completions : undefined} />
                {onMarkDone && (
                        <button
                        onClick={(e) => { e.stopPropagation(); onMarkDone(); }}
                        disabled={isDoneToday}
                        className="w-full text-center bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700 hover:enabled:shadow-lg hover:enabled:shadow-fuchsia-600/40 transform hover:enabled:scale-105"
                    >
                        {isDoneToday ? "Completed Today!" : "Mark as Done"}
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default SectionCard;