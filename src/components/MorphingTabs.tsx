import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface MorphingTabsProps {
  tabs?: TabItem[];
  defaultTab?: string;
  onChange?: (id: string) => void;
}

const defaultTabs: TabItem[] = [
  { id: 'overview', label: 'Overview', count: 12 },
  { id: 'components', label: 'Components', count: 8 },
  { id: 'animations', label: 'Motion Specs', count: 24 },
  { id: 'tokens', label: 'Design Tokens' },
];

export const MorphingTabs: React.FC<MorphingTabsProps> = ({
  tabs = defaultTabs,
  defaultTab = 'overview',
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className="flex items-center p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-xl relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className={`relative px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 whitespace-nowrap z-10 flex items-center gap-1.5 ${
              isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`font-mono text-[10px] tabular-nums ${
                  isActive ? 'text-indigo-300' : 'text-neutral-500'
                }`}
              >
                {tab.count}
              </span>
            )}

            {/* Morphing Sliding Pill Background */}
            {isActive && (
              <motion.div
                layoutId="morphing-tab-pill"
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 35,
                }}
                className="absolute inset-0 bg-neutral-800 border border-neutral-700/80 rounded-lg -z-10 shadow-sm"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
