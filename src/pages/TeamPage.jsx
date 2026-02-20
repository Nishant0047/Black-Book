import React from 'react';
import { Github, Linkedin, Mail, Phone, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const TeamMember = ({ name, role, college, cgpa, contact, social, image }) => {
  return (
    <div className="group relative w-full h-[400px] perspective-1000">
      <div className="relative w-full h-full text-center transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
        
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-light-surface dark:bg-dark-surface rounded-2xl shadow-neu-light dark:shadow-neu-dark border border-white/5 p-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-dark-accent mb-6 shadow-neon">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{name}</h3>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold">{role}</span>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-gradient-to-br from-dark-surface to-dark-bg rounded-2xl shadow-neu-light dark:shadow-neu-dark border border-white/10 p-6">
            <h4 className="text-xl font-bold text-white mb-1">{college}</h4>
            <div className="text-gray-400 text-sm mb-6">CGPA: <span className="text-green-400 font-mono">{cgpa}</span></div>
            
            <div className="space-y-4 w-full px-4">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Mail size={18} className="text-red-400" />
                    <span className="text-sm text-gray-300 truncate">{contact.email}</span>
                </a>
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Phone size={18} className="text-green-400" />
                    <span className="text-sm text-gray-300">{contact.phone}</span>
                </a>
                <div className="flex justify-center gap-4 mt-4">
                    <a href={social.linkedin} className="p-2 bg-blue-600/20 text-blue-500 rounded-full hover:scale-110 transition-transform"><Linkedin size={20} /></a>
                    <a href={social.github} className="p-2 bg-gray-700/50 text-white rounded-full hover:scale-110 transition-transform"><Github size={20} /></a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const team = [
    {
        name: "Rishi",
        role: "Lead Architect",
        college: "Tech University",
        cgpa: "9.2",
        contact: { email: "rishi@example.com", phone: "+91 98765 43210" },
        social: { linkedin: "#", github: "#" },
        image: "https://ui-avatars.com/api/?name=Rishi&background=0D8ABC&color=fff&size=200"
    },
    {
        name: "Security Analyst",
        role: "Threat Hunter",
        college: "Cyber Institute",
        cgpa: "8.9",
        contact: { email: "analyst@example.com", phone: "+91 99887 76655" },
        social: { linkedin: "#", github: "#" },
        image: "https://ui-avatars.com/api/?name=Analyst&background=10b981&color=fff&size=200"
    },
    {
        name: "Frontend Dev",
        role: "UI/UX Engineer",
        college: "Design School",
        cgpa: "9.0",
        contact: { email: "dev@example.com", phone: "+91 11223 34455" },
        social: { linkedin: "#", github: "#" },
        image: "https://ui-avatars.com/api/?name=Dev&background=f59e0b&color=fff&size=200"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-3">
                <Lock className="text-blue-500" size={32} />
                Elite Cyber Task Force
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Our team of dedicated security professionals working 24/7 to monitor, detect, and neutralize digital threats.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
                <TeamMember key={i} {...member} />
            ))}
        </div>
    </div>
  );
};

export default TeamPage;
