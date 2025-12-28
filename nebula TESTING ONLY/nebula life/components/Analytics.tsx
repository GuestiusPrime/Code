import React from 'react';
import { LifeData, SectionDefinition, SkillLevel } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface AnalyticsProps {
  sections: SectionDefinition[];
  data: LifeData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/70 backdrop-blur-xl p-3 border border-slate-700 rounded-lg shadow-lg">
          <p className="font-bold text-white">{label}</p>
          <p className="text-sm text-fuchsia-400">{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

const Analytics: React.FC<AnalyticsProps> = ({ sections, data }) => {

  const categoryData = sections
    .filter(s => s.type !== 'Dashboard' && s.type !== 'Analytics')
    .map(section => ({
      name: section.name,
      count: (data[section.id] || []).length,
    }));

  const getSkillProgress = (level: SkillLevel): number => {
    switch (level) {
      case SkillLevel.Beginner: return 33;
      case SkillLevel.Intermediate: return 66;
      case SkillLevel.Expert: return 100;
      default: return 0;
    }
  };

  const skillProgressData = (data.skills || []).map(skill => ({
    subject: skill.name,
    A: getSkillProgress(skill.level),
    fullMark: 100,
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-lg text-gray-400">Visualize your progress and life balance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-white">Category Distribution</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={categoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.4)" />
                <XAxis dataKey="name" stroke="rgb(156 163 175)" />
                <YAxis stroke="rgb(156 163 175)"/>
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(217, 70, 239, 0.1)'}}/>
                <Legend wrapperStyle={{color: '#fff'}}/>
                <Bar dataKey="count" fill="url(#chartGradient)" name="Items Tracked" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-white">Skill Proficiency</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillProgressData}>
                <PolarGrid stroke="rgba(100, 116, 139, 0.4)" />
                <PolarAngleAxis dataKey="subject" stroke="rgb(156 163 175)"/>
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(100, 116, 139, 0.2)"/>
                <Radar name="Progress" dataKey="A" stroke="#d946ef" fill="#d946ef" fillOpacity={0.6} />
                <Tooltip contentStyle={{
                    backgroundColor: 'rgba(30, 41, 59, 0.7)',
                    borderColor: 'rgba(100, 116, 139, 0.5)',
                    borderRadius: '0.5rem',
                    backdropFilter: 'blur(8px)',
                }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;