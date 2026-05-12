import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, LogIn, ShieldCheck, Globe } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-height-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
          <ShieldCheck size={18} className="text-indigo-400" />
          <span className="text-sm font-medium text-indigo-200">Systeme Securis & Cloud Ready</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
          MASAR ONLINE <br /> <span className="text-indigo-500">CLONE PRO</span>
        </h1>
        
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          L-plateforme l-kamla l-asatida w tlamid bach i-tab3o n-o9at dyalhom online 
          mn ay blassa f l-maghrib. Khfifa, Sahla, w Amna.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="btn-primary">
            <LogIn size={20} />
            Dkhol l-Espace dyalk
          </button>
          <button className="px-8 py-3 rounded-12 border border-white/10 hover:bg-white/5 transition-all">
            Chouf kifach khdam
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-6xl"
      >
        {[
          { icon: <GraduationCap />, title: "L-Asatida", desc: "Dkhol n-o9at b-kol souhoula w sirya." },
          { icon: <Globe />, title: "Online", desc: "Accs mn ay moudina: Rabat, Casa, Beni Mellal..." },
          { icon: <ShieldCheck />, title: "Amine", desc: "L-data dyalk m7miya b l-hachage w JWT." }
        ].map((feature, i) => (
          <div key={i} className="glass-card p-8 text-left hover:border-indigo-500/50 transition-colors group">
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Landing;
