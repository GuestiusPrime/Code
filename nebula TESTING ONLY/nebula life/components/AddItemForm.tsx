import React, { useState } from 'react';
import { SectionDefinition, LifeDataItem, SkillLevel } from '../types';

interface AddItemFormProps {
  section: SectionDefinition;
  onSubmit: (itemData: Omit<LifeDataItem, 'id'>) => void;
  onClose: () => void;
}

const commonInputClass = "w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white";
const commonLabelClass = "block text-sm font-medium text-gray-300";

const AddItemForm: React.FC<AddItemFormProps> = ({ section, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    const isNumber = e.target.type === 'number';
    setFormData((prev: any) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : (isNumber ? parseFloat(value) : value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalData: Omit<LifeDataItem, 'id'>;

    switch (section.type) {
        case 'Skills':
            finalData = { name: formData.name, description: formData.description || '', level: formData.level || SkillLevel.Beginner, tags: formData.tags?.split(',').map((t: string) => t.trim()) || [] };
            break;
        case 'Hobbies':
            finalData = { name: formData.name, lastPracticed: new Date(), frequency: formData.frequency || 'weekly', log: [] };
            break;
        case 'Projects':
            finalData = { title: formData.title, goal: formData.goal || '', dueDate: new Date(formData.dueDate || Date.now()) };
            break;
        case 'Goals':
            finalData = { name: formData.name, type: formData.type || 'short-term', deadline: new Date(formData.deadline || Date.now()) };
            break;
        case 'Journal':
            finalData = { title: formData.title, content: formData.content || '', date: new Date(), tags: formData.tags?.split(',').map((t: string) => t.trim()) || [] };
            break;
        case 'Custom':
        default:
            finalData = { title: formData.title, notes: formData.notes || '', date: new Date() };
            break;
    }
    onSubmit(finalData);
  };
  
  const renderFormFields = () => {
    switch (section.type) {
      case 'Skills':
        return (
          <>
            <div><label className={commonLabelClass}>Skill Name*</label><input type="text" name="name" onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Description</label><input type="text" name="description" onChange={handleChange} className={commonInputClass} /></div>
            <div><label className={commonLabelClass}>Level</label><select name="level" onChange={handleChange} className={commonInputClass}><option>Beginner</option><option>Intermediate</option><option>Expert</option></select></div>
            <div><label className={commonLabelClass}>Tags (comma-separated)</label><input type="text" name="tags" onChange={handleChange} className={commonInputClass} /></div>
          </>
        );
      case 'Projects':
        return (
          <>
            <div><label className={commonLabelClass}>Project Title*</label><input type="text" name="title" onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Goal</label><input type="text" name="goal" onChange={handleChange} className={commonInputClass} /></div>
            <div><label className={commonLabelClass}>Due Date</label><input type="date" name="dueDate" onChange={handleChange} className={commonInputClass} /></div>
          </>
        );
      case 'Hobbies':
        return (
          <>
            <div><label className={commonLabelClass}>Hobby Name*</label><input type="text" name="name" onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Frequency</label><select name="frequency" onChange={handleChange} className={commonInputClass}><option>daily</option><option>weekly</option><option>monthly</option></select></div>
          </>
        );
      case 'Goals':
        return (
          <>
            <div><label className={commonLabelClass}>Goal Name*</label><input type="text" name="name" onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Type</label><select name="type" onChange={handleChange} className={commonInputClass}><option value="short-term">Short-term</option><option value="long-term">Long-term</option></select></div>
            <div><label className={commonLabelClass}>Deadline</label><input type="date" name="deadline" onChange={handleChange} className={commonInputClass} /></div>
          </>
        );
      case 'Journal':
        return (
          <>
            <div><label className={commonLabelClass}>Title*</label><input type="text" name="title" onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Content</label><textarea name="content" rows={4} onChange={handleChange} className={commonInputClass}></textarea></div>
            <div><label className={commonLabelClass}>Tags (comma-separated)</label><input type="text" name="tags" onChange={handleChange} className={commonInputClass} /></div>
          </>
        );
      case 'Custom':
      default:
        return (
          <>
            <div><label className={commonLabelClass}>Title*</label><input type="text" name="title" onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Notes</label><textarea name="notes" rows={4} onChange={handleChange} className={commonInputClass}></textarea></div>
          </>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFormFields()}
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/80 transition-colors">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:shadow-lg hover:shadow-fuchsia-600/30 text-white font-semibold transition-all">Add Item</button>
      </div>
    </form>
  );
};

export default AddItemForm;