import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Info, CheckCircle2, AlertTriangle } from "lucide-react";

interface IndustryScore {
  id: string;
  name: string;
  overallScore: number;
  confidence: number;
  workforceFit: number;
  siteFit: number;
  logistics: number;
  momentum: number;
  risks: string[];
}

export default function IndustryRanking() {
  const navigate = useNavigate();
  const [industries, setIndustries] = useState<IndustryScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for Phase 1/2
    setTimeout(() => {
      setIndustries([
        {
          id: "logistics-fulfillment",
          name: "Logistics & Fulfillment",
          overallScore: 92,
          confidence: 88,
          workforceFit: 85,
          siteFit: 94,
          logistics: 98,
          momentum: 90,
          risks: ["High competition for warehouse labor"]
        },
        {
          id: "ev-supplier",
          name: "EV / Auto Supplier Expansion",
          overallScore: 88,
          confidence: 92,
          workforceFit: 90,
          siteFit: 85,
          logistics: 92,
          momentum: 85,
          risks: ["Dependent on OEM production cycles"]
        },
        {
          id: "data-centers",
          name: "Data Centers / Digital Infrastructure",
          overallScore: 75,
          confidence: 80,
          workforceFit: 60,
          siteFit: 70,
          logistics: 65,
          momentum: 95,
          risks: ["Power grid capacity constraints", "Low existing talent pool"]
        },
        {
          id: "food-processing",
          name: "Food Processing / Cold Chain",
          overallScore: 82,
          confidence: 85,
          workforceFit: 80,
          siteFit: 75,
          logistics: 88,
          momentum: 70,
          risks: ["Lack of specialized cold storage facilities"]
        },
        {
          id: "light-manufacturing",
          name: "Light Advanced Manufacturing",
          overallScore: 85,
          confidence: 90,
          workforceFit: 88,
          siteFit: 82,
          logistics: 85,
          momentum: 80,
          risks: ["Aging industrial park infrastructure"]
        },
        {
          id: "clean-energy",
          name: "Solar / Clean-Energy Support",
          overallScore: 70,
          confidence: 75,
          workforceFit: 65,
          siteFit: 70,
          logistics: 75,
          momentum: 85,
          risks: ["Policy uncertainty", "Nascent local supply chain"]
        }
      ].sort((a, b) => b.overallScore - a.overallScore));
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Top Industries for Montgomery</h1>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Categories</option>
            <option>Manufacturing</option>
            <option>Logistics</option>
            <option>Digital Infrastructure</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
                  <th className="p-4">Industry</th>
                  <th className="p-4 text-center">Score</th>
                  <th className="p-4 text-center">Workforce</th>
                  <th className="p-4 text-center">Site Fit</th>
                  <th className="p-4 text-center">Logistics</th>
                  <th className="p-4 text-center">Momentum</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {industries.map((ind, i) => (
                  <tr key={ind.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                          #{i + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{ind.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {ind.confidence}% Confidence
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${ind.overallScore >= 85 ? 'bg-emerald-100 text-emerald-800' : ind.overallScore >= 75 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'}`}>
                        {ind.overallScore}
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-slate-600">{ind.workforceFit}</td>
                    <td className="p-4 text-center text-sm text-slate-600">{ind.siteFit}</td>
                    <td className="p-4 text-center text-sm text-slate-600">{ind.logistics}</td>
                    <td className="p-4 text-center text-sm text-slate-600">{ind.momentum}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => navigate(`/industries/${ind.id}`)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-indigo-900 mb-2">Why Logistics Outranks EV</h3>
                <p className="text-sm text-indigo-800 leading-relaxed">
                  While EV Supplier Expansion has stronger workforce alignment due to HMMA, Logistics & Fulfillment scores higher overall due to a surplus of shovel-ready sites along the I-65 corridor and immediate demand signals from recent e-commerce expansion announcements.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Top Risks Identified</h3>
            <div className="space-y-4">
              {industries.slice(0, 3).map(ind => (
                <div key={ind.id} className="border-l-2 border-amber-400 pl-3 py-1">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{ind.name}</div>
                  <div className="text-sm text-slate-700 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{ind.risks[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
