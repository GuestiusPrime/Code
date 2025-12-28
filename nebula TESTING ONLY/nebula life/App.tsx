import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SectionDefinition, SectionId, LifeData, SkillLevel, Skill, Hobby, Project, Goal, JournalEntry, CustomItem, LifeDataItem, SectionType } from './types';
import { INITIAL_SECTIONS, ListBulletIcon, NebulaLogoIcon, getIconComponent } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SectionCard from './components/SectionCard';
import Analytics from './components/Analytics';
import QuickAddComponent from './components/QuickAddComponent';
import Modal from './components/Modal';
import AddItemForm from './components/AddItemForm';
import EditItemModal from './components/EditItemModal';
import { categorizeAndCreateItem, getAISuggestions } from './services/geminiService';
import StartupAnimation from './components/StartupAnimation';
import AddBlockCard from './components/AddBlockCard';
import { AnimatedBackground } from './components/AnimatedBackground';
import AIAssistant from './components/AIAssistant';

// Mock Data
const initialLifeData: LifeData = {
  skills: [
    { id: 's1', name: 'React Development', description: 'Building modern web apps', level: SkillLevel.Intermediate, completions: [new Date('2024-07-20'), new Date('2024-07-21')], tags: ['frontend', 'webdev'] },
    { id: 's2', name: 'Guitar', description: 'Learning acoustic guitar', level: SkillLevel.Beginner, completions: [new Date('2024-07-18')], tags: ['music', 'creative'] },
  ],
  hobbies: [
    { id: 'h1', name: 'Reading', lastPracticed: new Date('2024-07-20T09:00:00Z'), frequency: 'daily', log: [], completions: [new Date('2024-07-20T09:00:00Z')] },
  ],
  projects: [
    { id: 'p1', title: 'Personal Website', goal: 'Launch V2 of my portfolio', dueDate: new Date('2024-09-01'), completions: [] },
  ],
  goals: [
    { id: 'g1', name: 'Run a 5K', type: 'short-term', deadline: new Date('2024-08-30'), completions: [new Date('2024-07-19'), new Date('2024-07-21'), new Date('2024-07-22')]},
  ],
  journal: [
    { id: 'j1', title: 'A new idea', content: 'Had a breakthrough idea for a new app project today.', date: new Date(), tags: ['ideas', 'reflection']}
  ]
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState<SectionDefinition[]>(() => {
    const saved = localStorage.getItem('nebulalife-sections');
    if (saved) {
        const parsed: Omit<SectionDefinition, 'icon'>[] = JSON.parse(saved);
        return parsed.map(section => ({
            ...section,
            icon: getIconComponent(section.id),
        }));
    }
    return INITIAL_SECTIONS;
  });

  const [lifeData, setLifeData] = useState<LifeData>(() => {
      const saved = localStorage.getItem('nebulalife-data');
      if (saved) {
          const parsed = JSON.parse(saved);
          Object.keys(parsed).forEach(key => {
              if (Array.isArray(parsed[key])) {
                parsed[key].forEach((item: any) => {
                    if (item.lastPracticed) item.lastPracticed = new Date(item.lastPracticed);
                    if (item.dueDate) item.dueDate = new Date(item.dueDate);
                    if (item.deadline) item.deadline = new Date(item.deadline);
                    if (item.date) item.date = new Date(item.date);
                    if (item.completions) item.completions = item.completions.map((d:string) => new Date(d));
                });
              }
          });
          return parsed;
      }
      return initialLifeData;
  });

  const [activeSectionId, setActiveSectionId] = useState<SectionId>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAddSectionModalOpen, setAddSectionModalOpen] = useState(false);
  const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [editingItem, setEditingItem] = useState<{ sectionId: SectionId; item: LifeDataItem } | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ sectionId: SectionId; itemId: string; itemName: string } | null>(null);
  
  const [isQuickAddModalOpen, setQuickAddModalOpen] = useState(false);
  const [quickAddUserInput, setQuickAddUserInput] = useState('');
  const [quickAddIsLoading, setQuickAddIsLoading] = useState(false);
  const [quickAddError, setQuickAddError] = useState('');

  const [isAIAssistantOpen, setAIAssistantOpen] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState<any[]>([]);
  const [isAISuggesting, setIsAISuggesting] = useState(false);
  const [aiError, setAIError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('nebulalife-sections', JSON.stringify(sections.map(({icon, ...rest}) => rest ))); // Don't save icon component
    localStorage.setItem('nebulalife-data', JSON.stringify(lifeData));
  }, [sections, lifeData]);

  const activeSection = useMemo(() => sections.find(s => s.id === activeSectionId), [sections, activeSectionId]);

  const handleAddNewSection = () => {
    if (!newSectionName.trim()) return;
    const newSectionId = `custom_${Date.now()}`;
    const newSection: SectionDefinition = {
        id: newSectionId,
        name: newSectionName,
        icon: ListBulletIcon,
        type: 'Custom',
        isCustom: true,
    };
    setSections(prev => [...prev, newSection]);
    setLifeData(prev => ({ ...prev, [newSectionId]: [] }));
    setNewSectionName('');
    setAddSectionModalOpen(false);
    setActiveSectionId(newSectionId);
  };

  const handleDeleteSection = (sectionId: SectionId) => {
    if (window.confirm(`Are you sure you want to delete the "${sections.find(s => s.id === sectionId)?.name}" section and all its items? This cannot be undone.`)) {
        setSections(prev => prev.filter(s => s.id !== sectionId));
        setLifeData(prev => {
            const newData = { ...prev };
            delete newData[sectionId];
            return newData;
        });
        setActiveSectionId('dashboard');
    }
  }

  const handleAddItem = (itemData: Omit<LifeDataItem, 'id'>) => {
    if (!activeSection) return;

    let newItem: LifeDataItem;
    switch (activeSection.type) {
      case 'Skills': newItem = { ...(itemData as Omit<Skill, 'id'>), id: crypto.randomUUID(), completions: [] }; break;
      case 'Hobbies': newItem = { ...(itemData as Omit<Hobby, 'id'>), id: crypto.randomUUID(), completions: [] }; break;
      case 'Projects': newItem = { ...(itemData as Omit<Project, 'id'>), id: crypto.randomUUID(), completions: [] }; break;
      case 'Goals': newItem = { ...(itemData as Omit<Goal, 'id'>), id: crypto.randomUUID(), completions: [] }; break;
      case 'Journal': newItem = { ...(itemData as Omit<JournalEntry, 'id'>), id: crypto.randomUUID() }; break;
      case 'Custom': newItem = { ...(itemData as Omit<CustomItem, 'id'>), id: crypto.randomUUID() }; break;
      default: return;
    }

    setLifeData(prev => ({
        ...prev,
        [activeSection.id]: [...(prev[activeSection.id] || []), newItem],
    }));
    setAddItemModalOpen(false);
  };

  const handleQuickAddItem = (categoryType: string, title: string, description: string) => {
    const section = sections.find(s => s.type === categoryType);
    if (!section) {
        alert(`Could not find a section for category: ${categoryType}`);
        return;
    }

    let newItem: LifeDataItem;
    const id = crypto.randomUUID();
    const now = new Date();

    switch (section.type) {
        case 'Skills': newItem = { id, name: title, description, level: SkillLevel.Beginner, completions: [], tags: ['ai-added'] }; break;
        case 'Hobbies': newItem = { id, name: title, lastPracticed: now, frequency: 'weekly', log: [], completions: [] }; break;
        case 'Projects': const dueDate = new Date(); dueDate.setMonth(dueDate.getMonth() + 1); newItem = { id, title, goal: description, dueDate, completions: [] }; break;
        case 'Goals': const deadline = new Date(); deadline.setMonth(deadline.getMonth() + 3); newItem = { id, name: title, type: 'short-term', deadline, completions: [] }; break;
        case 'Journal': newItem = { id, title, content: description, date: now, tags: ['ai-added'] }; break;
        default: return;
    }

    setLifeData(prev => ({ ...prev, [section.id]: [...(prev[section.id] || []), newItem] }));
    setActiveSectionId(section.id);
  };

  const openQuickAddModal = () => {
    setQuickAddError('');
    setQuickAddUserInput('');
    setQuickAddModalOpen(true);
  };

  const handleQuickAddSubmit = async () => {
    if (!quickAddUserInput.trim()) {
        setQuickAddError('Please enter an idea.');
        return;
    }
    setQuickAddIsLoading(true);
    setQuickAddError('');
    try {
      const result = await categorizeAndCreateItem(quickAddUserInput);
      handleQuickAddItem(result.category, result.title, result.description);
      setQuickAddUserInput('');
      setQuickAddModalOpen(false);
    } catch (err: any) {
      setQuickAddError(err.message || 'Failed to add item.');
      console.error(err);
    } finally {
      setQuickAddIsLoading(false);
    }
  };

  const handleGetSuggestions = useCallback(async () => {
    setIsAISuggesting(true);
    setAIError('');
    setAISuggestions([]);
    try {
        const result = await getAISuggestions(lifeData);
        setAISuggestions(result);
    } catch(err: any) {
        setAIError(err.message || 'Failed to get suggestions.');
    } finally {
        setIsAISuggesting(false);
    }
  }, [lifeData]);

  const handleMarkAsDone = (sectionId: SectionId, itemId: string) => {
    setLifeData(prev => {
        const sectionItems = prev[sectionId];
        if (!sectionItems) return prev;

        return {
            ...prev,
            [sectionId]: sectionItems.map(item => {
                if (item.id === itemId && 'completions' in item) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const completions = (item.completions || []).map(d => new Date(d));
                    const alreadyDoneToday = completions.some(d => {
                        const completionDate = new Date(d);
                        completionDate.setHours(0, 0, 0, 0);
                        return completionDate.getTime() === today.getTime();
                    });

                    if (!alreadyDoneToday) {
                        const newCompletions = [...completions, new Date()];
                        return { ...item, completions: newCompletions, lastPracticed: new Date() }; // also update lastPracticed for hobbies
                    }
                }
                return item;
            }),
        };
    });
  };

  const handleDeleteItem = useCallback((sectionId: SectionId, itemId: string) => {
    setLifeData(prev => {
      const sectionItems = prev[sectionId];
      if (!sectionItems) return prev;
      return { ...prev, [sectionId]: sectionItems.filter(item => item.id !== itemId) };
    });
    setEditingItem(null); // Close edit modal if open
  }, []);

  const handleUpdateItem = (sectionId: SectionId, itemId: string, updatedData: LifeDataItem) => {
    setLifeData(prev => {
        const sectionItems = prev[sectionId];
        if (!sectionItems) return prev;
        return {
            ...prev,
            [sectionId]: sectionItems.map(item => item.id === itemId ? updatedData : item)
        };
    });
    setEditingItem(null);
  };

  const handleMoveItem = (fromSectionId: SectionId, toSectionId: SectionId, itemToMove: LifeDataItem) => {
    const toSection = sections.find(s => s.id === toSectionId);
    if (!toSection) return;

    // A bit of magic to convert item types
    const common = {
        id: crypto.randomUUID(), // New ID for the new item
        title: 'name' in itemToMove ? itemToMove.name : itemToMove.title,
        description: 'description' in itemToMove ? itemToMove.description : ('goal' in itemToMove ? itemToMove.goal : ('content' in itemToMove ? itemToMove.content : ('notes' in itemToMove ? itemToMove.notes : ''))),
        tags: 'tags' in itemToMove ? itemToMove.tags : [],
        completions: 'completions' in itemToMove ? itemToMove.completions : [],
    };
    
    let newItem: LifeDataItem;
    const now = new Date();

    switch(toSection.type) {
        case 'Skills': newItem = { id: common.id, name: common.title, description: common.description, level: SkillLevel.Beginner, completions: common.completions, tags: common.tags }; break;
        case 'Hobbies': newItem = { id: common.id, name: common.title, lastPracticed: now, frequency: 'weekly', log: [], completions: common.completions }; break;
        case 'Projects': newItem = { id: common.id, title: common.title, goal: common.description, completions: common.completions }; break;
        case 'Goals': newItem = { id: common.id, name: common.title, type: 'short-term', completions: common.completions }; break;
        case 'Journal': newItem = { id: common.id, title: common.title, content: common.description, date: now, tags: common.tags }; break;
        case 'Custom': newItem = { id: common.id, title: common.title, notes: common.description, date: now }; break;
        default: return;
    }

    // Perform state update: remove from old, add to new
    setLifeData(prev => {
        const fromItems = (prev[fromSectionId] || []).filter(i => i.id !== itemToMove.id);
        const toItems = [...(prev[toSectionId] || []), newItem];
        return { ...prev, [fromSectionId]: fromItems, [toSectionId]: toItems };
    });
    setEditingItem(null);
    setActiveSectionId(toSectionId);
  };

  const renderContent = useCallback(() => {
    if (!activeSection) return <div>Section not found</div>;

    const renderGrid = (children: React.ReactNode) => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
    );

    const onEdit = (item: LifeDataItem) => setEditingItem({ sectionId: activeSection.id, item });
    
    const requestDeleteItem = (item: LifeDataItem) => {
        if (!activeSection) return;
        const itemName = 'name' in item ? item.name : ('title' in item ? item.title : 'this item');
        setItemToDelete({ sectionId: activeSection.id, itemId: item.id, itemName });
    };
    
    const onMarkDone = (itemId: string) => handleMarkAsDone(activeSection.id, itemId);

    switch (activeSection.type) {
      case 'Dashboard':
        return <Dashboard sections={sections} lifeData={lifeData} setActiveSection={setActiveSectionId} />;
      case 'Analytics':
        return <Analytics sections={sections} data={lifeData} />;
      case 'Skills':
        return renderGrid([
          <AddBlockCard key="add-new" onClick={() => setAddItemModalOpen(true)} />,
          ...(lifeData.skills || []).map(item =>
            <SectionCard key={item.id} type="skill" data={item} onDelete={() => requestDeleteItem(item)} onEdit={() => onEdit(item)} onMarkDone={() => onMarkDone(item.id)} />
          )
        ]);
      case 'Hobbies':
        return renderGrid([
            <AddBlockCard key="add-new" onClick={() => setAddItemModalOpen(true)} />,
            ...(lifeData.hobbies || []).map(item =>
                <SectionCard key={item.id} type="hobby" data={item} onDelete={() => requestDeleteItem(item)} onEdit={() => onEdit(item)} onMarkDone={() => onMarkDone(item.id)} />
            )
        ]);
      case 'Projects':
        return renderGrid([
            <AddBlockCard key="add-new" onClick={() => setAddItemModalOpen(true)} />,
            ...(lifeData.projects || []).map(item =>
                <SectionCard key={item.id} type="project" data={item} onDelete={() => requestDeleteItem(item)} onEdit={() => onEdit(item)} onMarkDone={() => onMarkDone(item.id)} />
            )
        ]);
      case 'Goals':
        return renderGrid([
            <AddBlockCard key="add-new" onClick={() => setAddItemModalOpen(true)} />,
            ...(lifeData.goals || []).map(item =>
                <SectionCard key={item.id} type="goal" data={item} onDelete={() => requestDeleteItem(item)} onEdit={() => onEdit(item)} onMarkDone={() => onMarkDone(item.id)} />
            )
        ]);
      case 'Journal':
        return renderGrid([
            <AddBlockCard key="add-new" onClick={() => setAddItemModalOpen(true)} />,
            ...(lifeData.journal || []).map(item =>
                <SectionCard key={item.id} type="journal" data={item} onDelete={() => requestDeleteItem(item)} onEdit={() => onEdit(item)} />
            )
        ]);
      case 'Custom':
        const customItems = lifeData[activeSection.id] as CustomItem[] | undefined || [];
        return renderGrid([
            <AddBlockCard key="add-new" onClick={() => setAddItemModalOpen(true)} />,
            ...customItems.map(item =>
                <SectionCard key={item.id} type="custom" data={item} onDelete={() => requestDeleteItem(item)} onEdit={() => onEdit(item)} />
            )
        ]);
      default:
        return <div>Select a section</div>;
    }
  }, [activeSection, sections, lifeData, handleDeleteItem, setActiveSectionId]);

  if (isLoading) {
    return <StartupAnimation />;
  }

  return (
    <div className={`bg-transparent font-sans animate-fade-in-main`}>
      <AnimatedBackground />
      <div className="flex h-screen">
        <Sidebar 
          sections={sections}
          activeSectionId={activeSectionId} 
          setActiveSectionId={setActiveSectionId}
          onAddSection={() => setAddSectionModalOpen(true)}
          onDeleteSection={handleDeleteSection}
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main className="flex-1 flex flex-col overflow-y-auto transition-all duration-300">
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-900/50 backdrop-blur-xl border-b border-slate-300/10">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-md text-gray-300 hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              </button>
              <h1 className="text-xl font-bold text-white">{activeSection?.name || 'Dashboard'}</h1>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => {
                        setAISuggestions([]);
                        setAIError('');
                        setAIAssistantOpen(true);
                    }}
                    className="flex items-center justify-center p-2 rounded-full text-white transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500"
                    aria-label="AI Assistant"
                >
                    <NebulaLogoIcon className="w-10 h-10"/>
                </button>
                <QuickAddComponent onOpen={openQuickAddModal} />
            </div>
          </div>
          
          <div className="p-4 sm:p-6 lg:p-8 flex-1">
            {renderContent()}
          </div>
        </main>
      </div>

      <Modal isOpen={isAddSectionModalOpen} onClose={() => setAddSectionModalOpen(false)} title="Add New Section">
        <div className="space-y-4">
          <label htmlFor="sectionName" className="block text-sm font-medium text-gray-300">Section Name</label>
          <input
            type="text"
            id="sectionName"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            placeholder="e.g., Books to Read"
            className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <button
            onClick={handleAddNewSection}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-fuchsia-700 hover:to-violet-700 transition-all"
          >
            Create Section
          </button>
        </div>
      </Modal>

      <Modal isOpen={isQuickAddModalOpen} onClose={() => setQuickAddModalOpen(false)} title="Quick Add with AI">
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Enter an idea, task, or thought. Our AI will automatically categorize it for you.
            <br />
            <span className="text-gray-400">e.g., "learn to play chess", "start a blog about cooking", "read The Hobbit"</span>
          </p>
          <textarea
            value={quickAddUserInput}
            onChange={(e) => setQuickAddUserInput(e.target.value)}
            placeholder="Type your idea here..."
            className="w-full h-24 px-3 py-2 bg-black/20 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-colors"
            disabled={quickAddIsLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleQuickAddSubmit();
              }
            }}
          />
          {quickAddError && <p className="text-red-400 text-sm bg-red-500/20 p-2 rounded-md">{quickAddError}</p>}
           <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">
                <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd> to submit
            </p>
            <button
              onClick={handleQuickAddSubmit}
              disabled={quickAddIsLoading || !quickAddUserInput.trim()}
              className="w-1/2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-fuchsia-700 hover:to-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {quickAddIsLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Add Idea'
              )}
            </button>
           </div>
        </div>
      </Modal>

      <Modal isOpen={isAIAssistantOpen} onClose={() => setAIAssistantOpen(false)} title="AI Assistant">
        <AIAssistant suggestions={aiSuggestions} isLoading={isAISuggesting} error={aiError} onGenerate={handleGetSuggestions} />
      </Modal>

      {activeSection && (
         <Modal isOpen={isAddItemModalOpen} onClose={() => setAddItemModalOpen(false)} title={`Add to ${activeSection.name}`}>
            <AddItemForm section={activeSection} onSubmit={handleAddItem} onClose={() => setAddItemModalOpen(false)} />
        </Modal>
      )}

      {editingItem && (
        <EditItemModal
            isOpen={!!editingItem}
            onClose={() => setEditingItem(null)}
            itemData={editingItem}
            sections={sections}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
            onMove={handleMoveItem}
        />
      )}

      {itemToDelete && (
        <Modal
          isOpen={!!itemToDelete}
          onClose={() => setItemToDelete(null)}
          title="Confirm Deletion"
        >
          <div className="space-y-4">
            <p className="text-gray-300">
              Are you sure you want to delete the item <span className="font-bold text-white">"{itemToDelete.itemName}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/80 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteItem(itemToDelete.sectionId, itemToDelete.itemId);
                  setItemToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all"
              >
                Delete Item
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;