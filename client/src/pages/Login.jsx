import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isProf, setIsProf] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-10"
      >
        <h2 className="text-3xl font-bold mb-2 text-center">Marhba bikom</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">Dkhol l-compte dyalk bach t-chouf n-o9at</p>

        <div className="flex bg-white/5 p-1 rounded-xl mb-8">
          <button 
            onClick={() => setIsProf(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isProf ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Tilmid
          </button>
          <button 
            onClick={() => setIsProf(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isProf ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Oustad
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2 ml-1">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="email" 
                placeholder="example@mail.com"
                className="input-field pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="input-field pl-12"
              />
            </div>
          </div>

          <button className="btn-primary w-full justify-center group">
            Log In
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Ma 3ndkch compte? <span className="text-indigo-400 cursor-pointer hover:underline">Sowwel l-idara</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
