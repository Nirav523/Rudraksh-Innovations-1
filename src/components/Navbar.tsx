import React from 'react';
import { Sparkles, Code2, Sliders, Layers, Eye } from 'lucide-react';

interface NavbarProps {
  activeTab: 'components' | 'playground' | 'heuristics' | 'bento';
  setActiveTab: (tab: 'components' | 'playground' | 'heuristics' | 'bento') => void;
  onOpenCodePreview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCodePreview,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('components');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2 h-2 rounded-sm bg-indigo-500 inline-block transition-transform group-hover:rotate-45" />
          <span>MotionUI 21st</span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button
            onClick={() => setActiveTab('components')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'components' ? 'text-white' : 'hover:text-neutral-200'
            }`}
          >
            Components
          </button>
          <button
            onClick={() => setActiveTab('bento')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'bento' ? 'text-white' : 'hover:text-neutral-200'
            }`}
          >
            Bento Grid
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'playground' ? 'text-white' : 'hover:text-neutral-200'
            }`}
          >
            Spring Physics
          </button>
          <button
            onClick={() => setActiveTab('heuristics')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'heuristics' ? 'text-white' : 'hover:text-neutral-200'
            }`}
          >
            UI/UX Pro System
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCodePreview}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 active:scale-98 transition-all rounded-lg whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Copy Components</span>
          </button>
        </div>
      </div>
    </header>
  );
};
