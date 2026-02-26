import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';

const PCAPUpload = () => {
    const { uploadStatus, setUploadStatus, theme } = useAppStore();
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file) => {
        if (file && (file.name.endsWith('.pcap') || file.name.endsWith('.pcapng'))) {
            setFile(file);
            simulateUpload();
        } else {
            alert('Invalid file format. Please upload .pcap or .pcapng files.');
        }
    };

    const simulateUpload = () => {
        setUploadStatus('uploading', 'Uploading PCAP...');
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploadStatus('processing', 'Parsing packets...');
                    setTimeout(() => {
                        setUploadStatus('done', 'Analysis Complete');
                    }, 2000);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    const isUploading = uploadStatus === 'uploading' || uploadStatus === 'processing';
    const isDone = uploadStatus === 'done';

    const steps = [
        { threshold: 10, label: "Validating Checksum & Headers" },
        { threshold: 40, label: "Decompressing Payload Data" },
        { threshold: 60, label: "Extracting TCP/UDP Sessions" },
        { threshold: 85, label: "Running Deep Packet Inspection (DPI)" },
        { threshold: 100, label: "Analysis Complete" }
    ];

    const currentStepIndex = steps.findIndex(s => progress <= s.threshold);
    const activeStepLabel = currentStepIndex !== -1 ? steps[currentStepIndex].label : "Analysis Complete";

    return (
        <div className="soc-panel cyber-panel p-6 h-full flex flex-col relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }}>
            </div>

            <h3 className="text-[10px] font-bold text-gray-800 dark:text-[#E0F2FE] uppercase tracking-widest mb-6 flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-[rgba(0,240,255,0.3)] relative z-10">
                <UploadCloud size={14} className="text-blue-600 dark:text-[#00F0FF] animate-pulse dark:glow" />
                <span style={{ textShadow: theme === 'dark' ? '0 0 5px rgba(0,240,255,0.5)' : 'none' }}>PCAP Analysis Pipeline</span>
            </h3>

            <div 
                className={`flex-1 border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 relative z-10 ${
                    dragging ? 'border-blue-400 dark:border-[#00F0FF] bg-blue-50 dark:bg-[rgba(0,240,255,0.05)] shadow-inner dark:shadow-[inset_0_0_20px_rgba(0,240,255,0.2)]' : 'border-gray-300 dark:border-[rgba(0,240,255,0.2)] bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:border-blue-300 dark:hover:border-[#00F0FF]/50 hover:bg-slate-50 dark:hover:bg-[rgba(0,240,255,0.02)]'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input 
                    type="file" 
                    id="pcap-upload" 
                    className="hidden" 
                    accept=".pcap,.pcapng"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />
                
                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.label 
                            key="empty"
                            htmlFor="pcap-upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="cursor-pointer flex flex-col items-center group relative z-10"
                        >
                            <div className="w-16 h-16 bg-blue-50 dark:bg-[#00F0FF]/10 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-[#00F0FF] border border-blue-200 dark:border-[#00F0FF]/30 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 relative">
                                {/* Pulsing rings */}
                                <div className="absolute inset-[-10px] rounded-full border border-blue-300 dark:border-[#00F0FF]/20 animate-ping opacity-50"></div>
                                <div className="absolute inset-[-20px] rounded-full border border-blue-200 dark:border-[#00F0FF]/10 animate-pulse"></div>
                                <UploadCloud size={28} />
                            </div>
                            <p className="text-[11px] font-bold text-gray-800 dark:text-[#E0F2FE] uppercase tracking-widest mt-4">Drag & Drop or <span className="text-blue-600 dark:text-[#00F0FF] hover:text-blue-800 dark:group-hover:text-white transition-colors cursor-pointer" style={{ textShadow: theme === 'dark' ? '0 0 5px rgba(0,240,255,0.5)' : 'none' }}>Browse Files</span></p>
                            <p className="text-[9px] text-gray-500 dark:text-[#38BDF8] mt-3 font-mono border border-gray-200 dark:border-[#00F0FF]/20 px-2 py-1 rounded bg-white/50 dark:bg-black/40 backdrop-blur-md">SUPPORTED: .PCAP, .PCAPNG (MAX 50MB)</p>
                        </motion.label>
                    ) : (
                        <motion.div
                            key="file"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full relative z-10"
                        >
                            <div className="flex items-center gap-4 bg-white/40 dark:bg-[rgba(0,240,255,0.02)] p-4 rounded-xl mb-8 text-left border border-gray-200 dark:border-[#00F0FF]/30 relative overflow-hidden group">
                                {/* Scanning Laser Animation */}
                                {!isDone && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-200 dark:via-[#00F0FF]/10 to-transparent h-[20%] w-full animate-[scan-line_2s_linear_infinite] pointer-events-none"></div>}
                                
                                <div className="relative">
                                     <File size={28} className="text-blue-500 dark:text-[#00F0FF] flex-shrink-0" />
                                     {!isDone && <div className="absolute inset-0 animate-ping bg-blue-400 dark:bg-[#00F0FF] rounded opacity-20"></div>}
                                </div>
                                <div className="flex-1 min-w-0 z-10">
                                    <p className="text-xs font-bold text-gray-800 dark:text-[#E0F2FE] truncate dark:glow">{file.name}</p>
                                    <p className="text-[10px] uppercase font-mono text-gray-500 dark:text-[#38BDF8] mt-1 tracking-wider">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                {isDone ? (
                                    <CheckCircle size={24} className="text-green-500 dark:text-[#39FF14] dark:cyber-glow z-10 shadow-sm dark:shadow-[0_0_10px_rgba(57,255,20,0.5)] rounded-full" />
                                ) : (
                                    <span className="text-lg font-mono font-bold text-blue-600 dark:text-[#00F0FF] z-10" style={{ textShadow: theme === 'dark' ? '0 0 10px rgba(0,240,255,0.5)' : 'none' }}>{progress}%</span>
                                )}
                            </div>

                            <div className="space-y-4 text-left w-full max-w-md mx-auto relative z-10">
                                {steps.map((step, idx) => {
                                    const isCompleted = progress >= step.threshold;
                                    const isActive = !isCompleted && progress > (idx > 0 ? steps[idx-1].threshold : 0);
                                    
                                    return (
                                        <div key={idx} className="flex items-center gap-4 group">
                                            <div className="w-5 h-5 flex items-center justify-center shrink-0 relative">
                                                {isCompleted ? (
                                                    <CheckCircle size={16} className="text-green-500 dark:text-[#39FF14] z-10" />
                                                ) : isActive ? (
                                                    <>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-[#00F0FF] animate-ping absolute"></div>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-[#00F0FF] shadow-sm dark:shadow-[0_0_8px_#00F0FF] z-10"></div>
                                                    </>
                                                ) : (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600"></div>
                                                )}
                                                {/* Connecting line for steps */}
                                                {idx < steps.length - 1 && (
                                                    <div className={`absolute top-5 bottom-[-16px] w-[1px] left-1/2 -translate-x-1/2 ${isCompleted ? 'bg-green-400 dark:bg-[#39FF14]/50' : 'bg-gray-300 dark:bg-gray-800 border-l border-dashed border-gray-400 dark:border-gray-700'}`}></div>
                                                )}
                                            </div>
                                            <span className={`text-[11px] font-mono tracking-wider transition-colors ${isCompleted ? 'text-green-600 dark:text-[#39FF14]/70' : isActive ? 'text-blue-600 dark:text-[#00F0FF] font-bold dark:group-hover:text-white' : 'text-gray-500 dark:text-gray-600'}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="h-1.5 bg-gray-200 dark:bg-[#030712] rounded-full overflow-hidden mt-8 w-full max-w-md mx-auto border border-gray-300 dark:border-[#1F2937] relative z-10">
                                <motion.div 
                                    className="h-full bg-blue-500 dark:bg-[#00F0FF] relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                >
                                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent opacity-50 shadow-none dark:shadow-[0_0_10px_#00F0FF]"></div>
                                </motion.div>
                            </div>

                            {isDone && (
                                <div className="mt-8 p-3 bg-green-50 dark:bg-[#39FF14]/5 border border-green-200 dark:border-[#39FF14]/30 rounded flex items-center gap-3 text-green-700 dark:text-[#39FF14] text-xs text-left w-full max-w-md mx-auto shadow-sm dark:shadow-[inset_0_0_15px_rgba(57,255,20,0.1)] relative z-10">
                                    <CheckCircle size={16} className="flex-shrink-0 animate-pulse" style={{ filter: theme === 'dark' ? 'drop-shadow(0 0 5px #39FF14)' : 'none' }} />
                                    <span className="font-mono tracking-widest font-bold">ANALYSIS COMPLETE. NO CRITICAL VECTORS DETECTED.</span>
                                </div>
                            )}
                            
                            {isDone && (
                                <button 
                                    onClick={() => { setFile(null); setUploadStatus('idle'); setProgress(0); }}
                                    className="mt-6 text-[10px] uppercase font-bold text-blue-600 dark:text-[#00F0FF] hover:text-blue-800 dark:hover:text-[#E0F2FE] hover:bg-blue-50 dark:hover:bg-[#00F0FF]/10 px-4 py-2 border border-blue-400 dark:border-[#00F0FF]/30 rounded transition-all tracking-widest relative z-10 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                                >
                                    Upload New Trace
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PCAPUpload;
