import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PCAPUpload = () => {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
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
        setUploading(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    return (
        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-neu-light dark:shadow-neu-dark border border-white/5 h-full">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <UploadCloud size={20} className="text-blue-500" />
                PCAP Analysis Upload
            </h3>

            <div 
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    dragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-500/30 hover:border-blue-500/50'
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
                />
                
                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.label 
                            key="empty"
                            htmlFor="pcap-upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="cursor-pointer flex flex-col items-center"
                        >
                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-500">
                                <UploadCloud size={32} />
                            </div>
                            <p className="text-sm font-medium text-gray-300">Drag & Drop or <span className="text-blue-400">Browse</span></p>
                            <p className="text-xs text-gray-500 mt-2">Supported: .pcap, .pcapng (Max 50MB)</p>
                        </motion.label>
                    ) : (
                        <motion.div
                            key="file"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full"
                        >
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg mb-4 text-left">
                                <File size={32} className="text-orange-500" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-bold text-gray-200 truncate">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                {progress === 100 ? (
                                    <CheckCircle size={24} className="text-green-500" />
                                ) : (
                                    <span className="text-xs font-mono text-blue-400">{progress}%</span>
                                )}
                            </div>

                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-blue-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>

                            {progress === 100 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400 text-xs"
                                >
                                    <CheckCircle size={14} />
                                    Analysis queued successfully.
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PCAPUpload;
