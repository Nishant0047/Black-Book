import React from 'react';
import { X, ExternalLink, Github, Linkedin, Mail, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const Widget = ({ title, children, icon: Icon }) => (
    <div className="mb-6 p-4 rounded bg-[#030712] shadow-[0_0_10px_rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.2)] hover:border-[#00F0FF]/50 transition-colors relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <h4 className="flex items-center gap-2 text-[10px] font-bold text-[#E0F2FE] mb-4 uppercase tracking-widest relative z-10">
            {Icon && <Icon size={14} className="text-[#00F0FF]" />}
            <span style={{ textShadow: '0 0 5px rgba(0,240,255,0.5)' }}>{title}</span>
        </h4>
        <div className="relative z-10">{children}</div>
    </div>
);

const RightPanel = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50]"
          />
          
          <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[#0B1220]/95 backdrop-blur-xl border-l border-[#00F0FF]/30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-[60] p-6 overflow-y-auto cyber-panel"
          >
              <div className="scan-overlay opacity-20 pointer-events-none"></div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                  <h3 className="text-[14px] font-bold text-[#E0F2FE] tracking-widest uppercase flex items-center gap-2">
                      <Activity size={18} className="text-[#00F0FF] animate-pulse glow" />
                      Workspace
                  </h3>
                  <button onClick={onClose} className="p-2 rounded text-[#00F0FF] hover:bg-[#00F0FF]/20 hover:text-white transition-all cyber-glow">
                      <X size={18} />
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RightPanel;
