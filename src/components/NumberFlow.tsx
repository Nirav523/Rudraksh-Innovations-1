import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface NumberFlowProps {
  initialValue?: number;
}

export const NumberFlow: React.FC<NumberFlowProps> = ({ initialValue = 1284 }) => {
  const [value, setValue] = useState(initialValue);
  const [previousValue, setPreviousValue] = useState(initialValue);

  const direction = value >= previousValue ? 1 : -1;

  const updateValue = (delta: number) => {
    setPreviousValue(value);
    setValue((prev) => Math.max(0, prev + delta));
  };

  const digits = value.toLocaleString('en-US').split('');

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl w-full">
      <div className="text-xs text-neutral-400 mb-4 flex items-center gap-2">
        <span>Tabular Figures</span>
        <span aria-hidden="true">·</span>
        <span>Spring Physics</span>
      </div>

      {/* Digits Display */}
      <div className="flex items-center text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight h-16 overflow-hidden tabular-nums select-none mb-6">
        <span className="text-indigo-400 mr-1">$</span>
        {digits.map((digit, idx) => (
          <div key={`${idx}-${digit === ',' ? 'comma' : 'digit'}`} className="relative h-full flex items-center">
            {digit === ',' ? (
              <span className="text-neutral-500">,</span>
            ) : (
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={value + '-' + idx + '-' + digit}
                  initial={{ y: direction * 24, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -direction * 24, opacity: 0, filter: 'blur(4px)' }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 28,
                    mass: 0.8,
                  }}
                  className="inline-block"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateValue(-100)}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
          <span>100</span>
        </button>
        <button
          onClick={() => updateValue(-1)}
          className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Subtract 1"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => {
            setPreviousValue(value);
            setValue(initialValue);
          }}
          className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Reset count"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => updateValue(1)}
          className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Add 1"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => updateValue(100)}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>100</span>
        </button>
      </div>
    </div>
  );
};
