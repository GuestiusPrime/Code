export enum SkillLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
}

export type ThemeColor = 'blue' | 'green' | 'purple' | 'rose';

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: SkillLevel;
  completions?: Date[];
  tags: string[];
}

export interface Hobby {
  id:string;
  name: string;
  lastPracticed: Date;
  frequency: 'daily' | 'weekly' | 'monthly';
  log: { date: Date; mood: number; notes: string }[]; // mood 1-5
  completions?: Date[];
}

export interface Project {
    id: string;
    title: string;
    goal: string;
    dueDate: Date;
    completions?: Date[];
}

export interface Goal {
    id: string;
    name: string;
    type: 'short-term' | 'long-term';
    deadline: Date;
    completions?: Date[];
}

export interface JournalEntry {
    id: string;
    title: string;
    content: string;
    date: Date;
    tags: string[];
}

export interface CustomItem {
    id: string;
    title: string;
    notes: string;
    date: Date;
}

export type SectionType = 'Dashboard' | 'Skills' | 'Hobbies' | 'Projects' | 'Goals' | 'Journal' | 'Analytics' | 'Custom';
export type SectionId = string;

export interface SectionDefinition {
    id: SectionId;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    type: SectionType;
    isCustom: boolean;
}

export type LifeDataItem = Skill | Hobby | Project | Goal | JournalEntry | CustomItem;

export interface LifeData {
    skills?: Skill[];
    hobbies?: Hobby[];
    projects?: Project[];
    goals?: Goal[];
    journal?: JournalEntry[];
    [sectionId: string]: LifeDataItem[] | undefined;
}