import React from 'react';
import { SectionDefinition } from './types';

export const DashboardIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
export const SkillsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);
export const HobbiesIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
export const ProjectsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
export const GoalsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
);
export const JournalIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
export const AnalyticsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
export const PlusIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>
);
export const PlusCircleIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
export const ListBulletIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
);
export const TrashIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.006a.75.75 0 01-.749.654H5.89a.75.75 0 01-.749-.654L4.137 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.9h1.368c1.603 0 2.816 1.336 2.816 2.9zm-1.487.888c.247-.044.484-.087.73-.129V4.478c0-.816-.78-1.4-1.65-1.4h-1.368c-.87 0-1.65.584-1.65 1.4v.659c.246.042.483.085.73.129h3.84zM6.064 6.635l.836 10.865h10.2l.836-10.865H6.064z" clipRule="evenodd" /></svg>
);
export const SparklesIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.315 7.465a.75.75 0 01.22.53v.636a.75.75 0 01-.75.75h-.636a.75.75 0 01-.75-.75v-.636a.75.75 0 01.75-.75h.636a.75.75 0 01.53.22zm.15 2.121a.75.75 0 01.22.53v.636a.75.75 0 01-.75.75h-.636a.75.75 0 01-.75-.75v-.636a.75.75 0 01.75-.75h.636a.75.75 0 01.53.22zm-.75 2.652a.75.75 0 01.75.75v.636a.75.75 0 01-.75.75h-.636a.75.75 0 01-.75-.75v-.636a.75.75 0 01.75-.75h.636zM12.75 7.5a.75.75 0 00-.75-.75h-.636a.75.75 0 00-.75.75v.636a.75.75 0 00.75.75h.636a.75.75 0 00.75-.75V7.5zm.885 2.115a.75.75 0 01.22.53v.636a.75.75 0 01-.75.75h-.636a.75.75 0 01-.75-.75v-.636a.75.75 0 01.75-.75h.636a.75.75 0 01.53.22zm-.75 2.652a.75.75 0 01.75.75v.636a.75.75 0 01-.75.75h-.636a.75.75 0 01-.75-.75v-.636a.75.75 0 01.75-.75h.636zM15.535 7.465a.75.75 0 01.22.53v.636a.75.75 0 01-.75.75h-.636a.75.75 0 01-.75-.75v-.636a.75.75 0 01.75-.75h.636a.75.75 0 01.53.22zm.15 2.121a.75.75 0 01.22.53v.636a.75.75 0 01-.75.75h-.636a.75.75 0 01-.75-.75v-.636a.75.75 0 01.75-.75h.636a.75.75 0 01.53.22zm-.75 2.652a.75.75 0 01.75.75v.636a.75.75 0 01-.75.75h-.636a.75.75 0 01-.75-.75v-.636a.75.75 0 01.75-.75h.636zM11.25 1.5a.75.75 0 01.75.75V3h-1.5V2.25a.75.75 0 01.75-.75zM5.336 4.352a.75.75 0 01.966-.356l1.248.624a.75.75 0 01-.432 1.398l-1.249-.624a.75.75 0 01-.534-1.042zM3 11.25a.75.75 0 01.75-.75H4.5v1.5H3.75a.75.75 0 01-.75-.75zm1.352 5.336a.75.75 0 011.042-.534l.624 1.248a.75.75 0 01-1.398.432l-.624-1.249a.75.75 0 01.356-.966zM18.664 4.352a.75.75 0 01.534 1.042l-.624 1.249a.75.75 0 11-1.398-.433l.624-1.248a.75.75 0 01.864-.608zM21 11.25a.75.75 0 01-.75.75H19.5v-1.5h.75a.75.75 0 01.75.75zm-3.648 5.336a.75.75 0 01.356.966l-.624 1.249a.75.75 0 01-1.398-.433l.624-1.248a.75.75 0 011.042-.534zM12.75 21a.75.75 0 01-.75-.75V19.5h1.5v.75a.75.75 0 01-.75.75z" clipRule="evenodd" />
    </svg>
);

const ICONS_MAP: { [key: string]: React.ComponentType<{ className?: string }> } = {
    dashboard: DashboardIcon,
    skills: SkillsIcon,
    hobbies: HobbiesIcon,
    projects: ProjectsIcon,
    goals: GoalsIcon,
    journal: JournalIcon,
    analytics: AnalyticsIcon,
    custom: ListBulletIcon,
};

export const getIconComponent = (sectionId: string): React.ComponentType<{ className?: string }> => {
    const idPrefix = sectionId.split('_')[0];
    return ICONS_MAP[idPrefix] || ListBulletIcon;
};

export const INITIAL_SECTIONS: SectionDefinition[] = [
    { id: 'dashboard', name: 'Dashboard', icon: DashboardIcon, type: 'Dashboard', isCustom: false },
    { id: 'skills', name: 'Skills', icon: SkillsIcon, type: 'Skills', isCustom: false },
    { id: 'hobbies', name: 'Hobbies', icon: HobbiesIcon, type: 'Hobbies', isCustom: false },
    { id: 'projects', name: 'Projects', icon: ProjectsIcon, type: 'Projects', isCustom: false },
    { id: 'goals', name: 'Goals', icon: GoalsIcon, type: 'Goals', isCustom: false },
    { id: 'journal', name: 'Journal', icon: JournalIcon, type: 'Journal', isCustom: false },
    { id: 'analytics', name: 'Analytics', icon: AnalyticsIcon, type: 'Analytics', isCustom: false },
];