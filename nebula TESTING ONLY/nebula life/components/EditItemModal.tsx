import React, { useState, useEffect } from 'react';
import { SectionDefinition, LifeDataItem, SkillLevel, SectionId } from '../types';
import Modal from './Modal';
import { TrashIcon } from '../constants';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemData: { sectionId: SectionId; item: LifeDataItem };
  sections: SectionDefinition[];
  onUpdate: (sectionId: SectionId, itemId: string, updatedData: LifeDataItem) => void;
  onDelete: (sectionId: SectionId, itemId: string) => void;
  onMove: (fromSectionId: SectionId, toSectionId: SectionId, item: LifeDataItem) => void;
}

const commonInputClass = "w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white";
const commonLabelClass = "block text-sm font-medium text-gray-300 mb-1";

const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose, itemData, sections, onUpdate, onDelete, onMove }) => {
  const [formData, setFormData] = useState<any>(itemData.item);
  const [moveToSectionId, setMoveToSectionId] = useState<SectionId>('');

  useEffect(() => {
    setFormData(itemData.item);
    setMoveToSectionId(''); // Reset move dropdown
  }, [itemData]);
  
  const section = sections.find(s => s.id === itemData.sectionId);
  if (!section) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    const finalValue = isNumber ? parseFloat(value) || 0 : value;

    // Handle date inputs correctly
    if (type === 'date' && value) {
        setFormData((prev: any) => ({ ...prev, [name]: new Date(value) }));
    } else {
        setFormData((prev: any) => ({ ...prev, [name]: finalValue }));
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(itemData.sectionId, itemData.item.id, formData);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
        onDelete(itemData.sectionId, itemData.item.id);
    }
  }

  const handleMove = () => {
    if (!moveToSectionId) {
        alert('Please select a destination section.');
        return;
    }
    if (window.confirm(`Are you sure you want to move this item to "${sections.find(s => s.id === moveToSectionId)?.name}"? The item will be converted.`)) {
        onMove(itemData.sectionId, moveToSectionId, itemData.item);
    }
  };

  const renderFormFields = () => {
    switch (section.type) {
      case 'Skills':
        return (
          <>
            <div><label className={commonLabelClass}>Skill Name*</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Description</label><input type="text" name="description" value={formData.description || ''} onChange={handleChange} className={commonInputClass} /></div>
            <div><label className={commonLabelClass}>Level</label><select name="level" value={formData.level} onChange={handleChange} className={commonInputClass}><option>Beginner</option><option>Intermediate</option><option>Expert</option></select></div>
            <div><label className={commonLabelClass}>Tags (comma-separated)</label><input type="text" name="tags" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''} onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})} className={commonInputClass} /></div>
          </>
        );
      case 'Projects':
        return (
          <>
            <div><label className={commonLabelClass}>Project Title*</label><input type="text" name="title" value={formData.title || ''} onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Goal</label><input type="text" name="goal" value={formData.goal || ''} onChange={handleChange} className={commonInputClass} /></div>
            <div><label className={commonLabelClass}>Due Date</label><input type="date" name="dueDate" value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''} onChange={handleChange} className={commonInputClass} /></div>
          </>
        );
      case 'Hobbies':
        return (
          <>
            <div><label className={commonLabelClass}>Hobby Name*</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Frequency</label><select name="frequency" value={formData.frequency} onChange={handleChange} className={commonInputClass}><option>daily</option><option>weekly</option><option>monthly</option></select></div>
            <div><label className={commonLabelClass}>Last Practiced</label><input type="date" name="lastPracticed" value={formData.lastPracticed ? new Date(formData.lastPracticed).toISOString().split('T')[0] : ''} onChange={handleChange} className={commonInputClass} /></div>
          </>
        );
      case 'Goals':
        return (
          <>
            <div><label className={commonLabelClass}>Goal Name*</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Type</label><select name="type" value={formData.type} onChange={handleChange} className={commonInputClass}><option value="short-term">Short-term</option><option value="long-term">Long-term</option></select></div>
            <div><label className={commonLabelClass}>Deadline</label><input type="date" name="deadline" value={formData.deadline ? new Date(formData.deadline).toISOString().split('T')[0] : ''} onChange={handleChange} className={commonInputClass} /></div>
          </>
        );
      case 'Journal':
        return (
          <>
            <div><label className={commonLabelClass}>Title*</label><input type="text" name="title" value={formData.title || ''} onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Content</label><textarea name="content" value={formData.content || ''} rows={4} onChange={handleChange} className={commonInputClass}></textarea></div>
            <div><label className={commonLabelClass}>Tags (comma-separated)</label><input type="text" name="tags" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''} onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})} className={commonInputClass} /></div>
          </>
        );
      case 'Custom':
      default:
        return (
          <>
            <div><label className={commonLabelClass}>Title*</label><input type="text" name="title" value={formData.title || ''} onChange={handleChange} className={commonInputClass} required /></div>
            <div><label className={commonLabelClass}>Notes</label><textarea name="notes" value={formData.notes || ''} rows={4} onChange={handleChange} className={commonInputClass}></textarea></div>
          </>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit ${section.name} Item`}>
        <form onSubmit={handleUpdate} className="space-y-4">
            {renderFormFields()}

            <div className="border-t border-slate-700/50 pt-4 mt-4">
                <label className={commonLabelClass}>Move Item</label>
                <div className="flex gap-2">
                    <select value={moveToSectionId} onChange={(e) => setMoveToSectionId(e.target.value)} className={`${commonInputClass} flex-grow`}>
                        <option value="">Select a destination...</option>
                        {sections
                            .filter(s => s.id !== itemData.sectionId && s.type !== 'Dashboard' && s.type !== 'Analytics')
                            .map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                        }
                    </select>
                    <button type="button" onClick={handleMove} disabled={!moveToSectionId} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Move
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4">
                <button type="button" onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 bg-red-900/30 hover:bg-red-900/60 transition-colors font-semibold">
                    <TrashIcon className="w-4 h-4"/> Delete Item
                </button>
                <div className="flex gap-4">
                     <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/80 transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:shadow-lg hover:shadow-fuchsia-600/30 text-white font-semibold transition-all">Save Changes</button>
                </div>
            </div>
        </form>
    </Modal>
  );
};

export default EditItemModal;