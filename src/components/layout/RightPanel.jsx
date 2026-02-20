import React from 'react';
import { X, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '../../utils/cn';

const Widget = ({ title, children }) => (
    <div className="mb-6 p-4 rounded-xl bg-light-surface dark:bg-dark-surface shadow-neu-light dark:shadow-neu-dark border border-white/5">
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider text-xs">{title}</h4>
        {children}
    </div>
);

const RightPanel = ({ isOpen, onClose }) => {
  return (
    <div className={cn(
        "fixed right-0 top-0 bottom-0 w-80 bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-[60] transition-transform duration-300 ease-in-out p-6 overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
    )}>
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Workspace</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <X size={20} />
            </button>
        </div>

        <Widget title="Music Focus">
             <div className="bg-black/20 rounded-lg p-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center text-black font-bold">
                    SPT
                </div>
                <div>
                    <div className="text-xs text-gray-400">Now Playing</div>
                    <div className="text-sm font-medium">Cyberpunk 2077 OST</div>
                </div>
             </div>
        </Widget>

        <Widget title="Quick Links">
            <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="p-2 rounded-md bg-blue-600/20 text-blue-500 group-hover:scale-110 transition-transform"><Linkedin size={18}/></div>
                    <span className="text-sm font-medium">LinkedIn</span>
                    <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"/>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="p-2 rounded-md bg-gray-800/50 text-white group-hover:scale-110 transition-transform"><Github size={18}/></div>
                    <span className="text-sm font-medium">GitHub</span>
                    <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"/>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="p-2 rounded-md bg-red-500/20 text-red-500 group-hover:scale-110 transition-transform"><Mail size={18}/></div>
                    <span className="text-sm font-medium">Outlook</span>
                    <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"/>
                </a>
            </div>
        </Widget>

        <Widget title="Live Intel Feed">
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 items-start relative pl-4 border-l border-white/10">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <div>
                            <p className="text-xs text-red-400 font-bold mb-1">CRITICAL THREAT</p>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                New zero-day vulnerability detected in Apache Log4j variant.
                            </p>
                            <span className="text-[10px] text-gray-500 mt-1 block">2 mins ago</span>
                        </div>
                    </div>
                ))}
            </div>
        </Widget>
    </div>
  );
};

export default RightPanel;
