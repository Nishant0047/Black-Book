import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Shield, Star, Award, ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import dogVideo from '../assets/that_one_dog_at_night_720P.mp4';

const teamData = [
    { id: 1, name: 'Alex Vance', role: 'Lead Incident Responder', avatar: 'AV', level: 'L4', status: 'Online', clearance: 'Top Secret', school: 'MIT', cgpa: '3.98', social: '@alexv_infosec' },
    { id: 2, name: 'Sarah Chen', role: 'Threat Intelligence Analyst', avatar: 'SC', level: 'L3', status: 'Busy', clearance: 'Secret', school: 'Stanford', cgpa: '4.0', social: '@schen_re' },
    { id: 3, name: 'Marcus Johnson', role: 'Security Architect', avatar: 'MJ', level: 'L4', status: 'Offline', clearance: 'Top Secret', school: 'Carnegie Mellon', cgpa: '3.85', social: '@mjarch' },
    { id: 4, name: 'Elena Rodriguez', role: 'Malware Reverse Engineer', avatar: 'ER', level: 'L3', status: 'Online', clearance: 'Secret', school: 'Caltech', cgpa: '3.92', social: '@elena_rev' },
    { id: 5, name: 'David Kim', role: 'SOC Analyst L1', avatar: 'DK', level: 'L1', status: 'Online', clearance: 'Confidential', school: 'UC Berkeley', cgpa: '3.75', social: '@dk_soc' },
    { id: 6, name: 'Rachel Green', role: 'Forensics Specialist', avatar: 'RG', level: 'L2', status: 'In Meeting', clearance: 'Secret', school: 'Georgia Tech', cgpa: '3.88', social: '@rgreen_dfir' },
];

const ProfileCard = ({ member }) => {
    const getStatusColor = (status) => {
        switch(status) {
            case 'Online': return 'bg-green-500';
            case 'Busy': return 'bg-red-500';
            case 'In Meeting': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="soc-panel p-4 flex flex-col h-full hover:border-blue-500/30 transition-colors">
            {/* Header info */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded border-2 border-light-border dark:border-dark-border bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400">
                        {member.avatar}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">{member.name}</h3>
                        <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider">{member.role}</p>
                    </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)} shadow-sm`} title={member.status}></div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-light-border dark:border-dark-border">
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-light-border dark:border-dark-border rounded text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase flex items-center gap-1">
                   <Award size={10} className="text-yellow-500"/> {member.level}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-light-border dark:border-dark-border rounded text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase">
                    {member.clearance}
                </span>
            </div>

            {/* Academic & Social */}
            <div className="flex-1 space-y-3 mb-4">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 uppercase tracking-wider text-[9px] font-bold">University</span>
                    <span className="font-mono text-gray-700 dark:text-gray-300">{member.school}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 uppercase tracking-wider text-[9px] font-bold">CGPA</span>
                    <span className="font-mono text-gray-700 dark:text-gray-300">{member.cgpa}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 uppercase tracking-wider text-[9px] font-bold">Social</span>
                    <span className="font-mono text-blue-500">{member.social}</span>
                </div>
            </div>

            {/* Contact Actions */}
            <div className="flex gap-2 mt-auto">
                 <button className="flex-1 py-1.5 bg-gray-100 dark:bg-gray-800 border border-light-border dark:border-dark-border hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">Message</button>
                 <button className="p-1.5 bg-gray-100 dark:bg-gray-800 border border-light-border dark:border-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded"><Star size={14}/></button>
            </div>
        </div>
    );
};

const TeamPage = () => {
    return (
        <PageTransition>
            <div className="space-y-6 pb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                           <Shield size={24} className="text-blue-500"/> Defense Operations Team
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Active analysts and incident responders</p>
                    </div>
                    
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors">
                            + Add Member
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teamData.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProfileCard member={member} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default TeamPage;
