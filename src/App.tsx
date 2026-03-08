import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Map as MapIcon, BarChart3, FileText, Settings, Building2 } from "lucide-react";
import LandingPage from "./pages/LandingPage";
import CityOverview from "./pages/CityOverview";
import IndustryRanking from "./pages/IndustryRanking";
import IndustryDetail from "./pages/IndustryDetail";
import MapIntelligence from "./pages/MapIntelligence";
import AIReport from "./pages/AIReport";
import DataAdmin from "./pages/DataAdmin";

function NavLink({ to, icon: Icon, children }: { to: string, icon: any, children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-indigo-500/10 text-indigo-300' 
          : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      {children}
    </Link>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-semibold text-xl">
            <Building2 className="w-6 h-6 text-indigo-400" />
            <span>OpportunityAI</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Montgomery Edition</div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/overview" icon={LayoutDashboard}>City Overview</NavLink>
          <NavLink to="/industries" icon={BarChart3}>Industry Ranking</NavLink>
          <NavLink to="/map" icon={MapIcon}>Map Intelligence</NavLink>
          <NavLink to="/report" icon={FileText}>AI Report</NavLink>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <NavLink to="/admin" icon={Settings}>Data Admin</NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-medium text-slate-800">Montgomery, AL</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">Last synced: Today, 08:00 AM</span>
            <Link to="/report" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Export Report
            </Link>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/overview" element={<Layout><CityOverview /></Layout>} />
        <Route path="/industries" element={<Layout><IndustryRanking /></Layout>} />
        <Route path="/industries/:id" element={<Layout><IndustryDetail /></Layout>} />
        <Route path="/map" element={<Layout><MapIntelligence /></Layout>} />
        <Route path="/report" element={<Layout><AIReport /></Layout>} />
        <Route path="/admin" element={<Layout><DataAdmin /></Layout>} />
      </Routes>
    </Router>
  );
}
