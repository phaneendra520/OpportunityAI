import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Montgomery, AL");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full mb-4"
          >
            <Building2 className="w-12 h-12 text-indigo-600" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-slate-900 tracking-tight"
          >
            OpportunityAI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            AI discovering the industries Montgomery should attract next.
          </motion.p>
        </div>

        {/* Action Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md mx-auto space-y-6"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Select City</label>
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            >
              <option value="Montgomery, AL">Montgomery, AL</option>
              <option value="Birmingham, AL" disabled>Birmingham, AL (Coming Soon)</option>
              <option value="Huntsville, AL" disabled>Huntsville, AL (Coming Soon)</option>
            </select>
          </div>
          
          <button 
            onClick={() => navigate("/overview")}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
          >
            Load {selectedCity.split(",")[0]}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8"
        >
          {[
            { icon: Users, title: "Workforce", desc: "Analyze skills and job demand" },
            { icon: Building2, title: "Property", desc: "Evaluate site readiness" },
            { icon: MapPin, title: "Logistics", desc: "Measure accessibility" },
            { icon: TrendingUp, title: "Momentum", desc: "Track recent investments" }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="mx-auto w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-slate-600" />
              </div>
              <h3 className="font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
