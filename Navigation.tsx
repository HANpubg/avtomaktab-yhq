import React from 'react';
import {
  Home,
  FileCheck2,
  BookOpen,
  TrafficCone,
  Timer,
  AlertOctagon
} from 'lucide-react';

export type TabType = 'home' | 'tickets' | 'topics' | 'signs' | 'exam' | 'mistakes';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  mistakesCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  mistakesCount
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Asosiy', icon: Home },
    { id: 'tickets' as TabType, label: 'Biletlar', icon: FileCheck2 },
    { id: 'topics' as TabType, label: 'Mavzular', icon: BookOpen },
    { id: 'signs' as TabType, label: 'Yo‘l belgilari', icon: TrafficCone },
    { id: 'exam' as TabType, label: 'Davlat Imtihoni', icon: Timer, highlight: true },
    {
      id: 'mistakes' as TabType,
      label: 'Xatolar',
      icon: AlertOctagon,
      badge: mistakesCount > 0 ? mistakesCount : undefined
    }
  ];

  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 relative ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : tab.highlight
                    ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive
                        ? 'bg-red-500 text-white'
                        : 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
