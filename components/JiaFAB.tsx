import React, { useState } from 'react';
import { JiaNewLogo } from './icons/JiaNewLogo';
import { MicIcon } from './icons/MicIcon';
import { SpinnerIcon } from './icons/Icons';
import { JiaStatus } from '../types';

interface JiaFABProps {
  status: JiaStatus;
  onClick: () => void;
}

export const JiaFAB: React.FC<JiaFABProps> = ({ status, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = status === JiaStatus.Listening || status === JiaStatus.Thinking;

  const baseClasses = "fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full text-white transition-all duration-300 ease-in-out focus:outline-none active:translate-y-px";
  
  const statusClasses = {
    [JiaStatus.Idle]: 'bg-slate-900 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1',
    [JiaStatus.Listening]: 'bg-slate-900 animate-[pulse-glow_2s_ease-in-out_infinite] border-2 border-blue-400',
    [JiaStatus.Thinking]: 'bg-slate-800 cursor-not-allowed shadow-lg',
    [JiaStatus.Error]: 'bg-gradient-to-br from-red-600 to-rose-500 shadow-lg shadow-red-500/50',
    [JiaStatus.Responding]: '',
  };

  const sizeClasses = isExpanded ? 'h-24 w-24' : 'h-20 w-20';

  const getIcon = () => {
    if (status === JiaStatus.Thinking) {
      return <SpinnerIcon className="h-10 w-10" />;
    }
    if (status === JiaStatus.Listening) {
        return <MicIcon className="h-16 w-16" />;
    }
    if (isHovered) {
      return <MicIcon className="h-16 w-16" />;
    }
    return <JiaNewLogo className="h-20 w-20" />;
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={status === JiaStatus.Thinking}
      className={`${baseClasses} ${statusClasses[status]} ${sizeClasses}`}
      aria-label={status === JiaStatus.Listening ? "Stop listening" : "Activate JIA Voice Assistant"}
    >
      {getIcon()}
    </button>
  );
};
