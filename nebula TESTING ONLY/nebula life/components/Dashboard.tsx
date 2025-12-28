import React from 'react';
import { LifeData, SectionDefinition, SectionId, Hobby } from '../types';

interface DashboardProps {
  sections: SectionDefinition[];
  lifeData: LifeData;
  setActiveSection: (sectionId: SectionId) => void;
}

const SummaryCard: React.FC<{ title: string; count: number; onClick: () => void, icon: React.ReactNode }> = ({ title, count, onClick, icon }) => (
  <div onClick={onClick} className="p-6 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-lg hover:border-fuchsia-500/80 hover:bg-slate-800/70 hover:-translate-y-1 transform transition-all duration-300 cursor-pointer flex items-start space-x-4">
    <div className="bg-slate-900/50 p-3 rounded-lg">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-2xl font-bold text-fuchsia-400">{count}</p>
      <p className="text-sm text-gray-400">items tracked</p>
    </div>
  </div>
);

const getCompletionsThisWeek = (completions: Date[] = []) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const day = today.getDay(); // 0=Sun, 1=Mon...
    const diff = day === 0 ? 6 : day - 1; // Adjust to make Monday the start of the week
    startOfWeek.setDate(today.getDate() - diff);
    startOfWeek.setHours(0,0,0,0);
    
    return completions.filter(c => new Date(c) >= startOfWeek).length;
};

const Dashboard: React.FC<DashboardProps> = ({ sections, lifeData, setActiveSection }) => {
  const getIconForSection = (sectionId: SectionId) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const Icon = section.icon;
      return <Icon className="w-6 h-6 text-fuchsia-400" />;
    }
    return null;
  };

  const dashboardSections = sections.filter(s => s.type !== 'Dashboard' && s.type !== 'Analytics');

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-lg text-gray-400">Here's a summary of your life recently</p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-6 rounded-2xl shadow-lg">
         <h3 className="text-xl font-bold mb-4 text-white">Top Focus This Week</h3>
         <div className="space-y-4">
          {(lifeData.projects || []).slice(0, 2).map(p => {
               const completions = getCompletionsThisWeek(p.completions);
               return (
                <div key={p.id} className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/80 transition-colors cursor-pointer" onClick={() => setActiveSection('projects')}>
                  <div className="flex justify-between items-center">
                      <span className="font-semibold">{p.title}</span>
                      <span className="text-sm font-medium text-purple-400">{completions} {completions === 1 ? 'completion' : 'completions'}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{p.goal}</p>
               </div>
               )
            })}
          {(lifeData.skills || []).slice(0,1).map(s => {
              const completions = getCompletionsThisWeek(s.completions);
              return (
              <div key={s.id} className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/80 transition-colors cursor-pointer" onClick={() => setActiveSection('skills')}>
                  <div className="flex justify-between items-center">
                      <span className="font-semibold">Skill: {s.name}</span>
                      <span className="text-sm font-medium text-pink-400">{completions} {completions === 1 ? 'completion' : 'completions'}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{s.description}</p>
              </div>
              )
          })}
         </div>
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardSections.map(section => (
          <SummaryCard 
            key={section.id}
            title={section.name} 
            count={(lifeData[section.id] || []).length} 
            onClick={() => setActiveSection(section.id)} 
            icon={getIconForSection(section.id)} 
          />
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-6 rounded-2xl shadow-lg">
         <h3 className="text-xl font-bold mb-4">Areas to Revisit</h3>
         <div className="space-y-3">
          {(lifeData.hobbies || []).filter(h => new Date().getTime() - (h as Hobby).lastPracticed.getTime() > 7 * 24 * 60 * 60 * 1000).map(h =>(
              <div key={h.id} className="flex items-center space-x-3 p-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors cursor-pointer" onClick={() => setActiveSection('hobbies')}>
                 <div className="bg-amber-500/20 p-2 rounded-md">
                  {getIconForSection('hobbies')}
                 </div>
                 <div>
                      <p className="font-semibold text-amber-300">{h.name}</p>
                      <p className="text-xs text-amber-400">Not practiced in over a week</p>
                 </div>
              </div>
          ))}
          { (lifeData.hobbies || []).filter(h => new Date().getTime() - (h as Hobby).lastPracticed.getTime() > 7 * 24 * 60 * 60 * 1000).length === 0 && (
            <p className="text-gray-400 text-sm">Nothing to revisit right now. Keep up the great work!</p>
          )}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;