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
        <div className="badge mb-8">
          <ShieldCheck size={16} />
          <span>Systeme Securis & Cloud Ready</span>
        </div>
        
        <h1 className="gradient-text">
          MASAR ONLINE <br /> <span style={{ color: 'var(--primary)' }}>CLONE PRO</span>
        </h1>
        
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          L-plateforme l-kamla l-asatida w tlamid bach i-tab3o n-o9at dyalhom online 
          mn ay blassa f l-maghrib. Khfifa, Sahla, w Amna.
        </p>

        <div className="flex justify-center gap-4">
          <button className="btn-primary" onClick={() => window.location.href='/login'}>
            <LogIn size={20} />
            Dkhol l-Espace dyalk
          </button>
          <button className="btn-secondary">
            Chouf kifach khdam
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="grid md:grid-cols-3 gap-8 mt-24 w-full max-w-6xl"
      >
        {[
          { icon: <GraduationCap />, title: "L-Asatida", desc: "Dkhol n-o9at b-kol souhoula w sirya." },
          { icon: <Globe />, title: "Online", desc: "Accs mn ay moudina: Rabat, Casa, Beni Mellal..." },
          { icon: <ShieldCheck />, title: "Amine", desc: "L-data dyalk m7miya b l-hachage w JWT." }
        ].map((feature, i) => (
          <div key={i} className="glass-card p-8 text-left">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-sm">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Landing;
