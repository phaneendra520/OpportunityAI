import { useEffect, useState } from "react";
import { Users, Building2, Briefcase, FileText, TrendingUp, Target, Sparkles, MapPin } from "lucide-react";

interface OverviewData {
  city: string;
  state: string;
  lastRefreshed: string;
  kpis: {
    majorEmployers: number;
    recentIndustrialListings: number;
    activeBusinessSignals: number;
    recentPermits: number;
    recentExpansionAnnouncements: number;
    topRecommendedIndustry: string;
  };
  topEmployers: Array<{ name: string; employees: number; sector: string }>;
  topClusters: Array<{ name: string; score: number }>;
  recentHeadlines: Array<{ title: string; date: string }>;
}

export default function CityOverview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/city/montgomery/overview")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch overview data", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const kpiCards = [
    { label: "Major Employers", value: data.kpis.majorEmployers, icon: Users },
    { label: "Industrial Listings", value: data.kpis.recentIndustrialListings, icon: Building2 },
    { label: "Business Signals", value: data.kpis.activeBusinessSignals, icon: Briefcase },
    { label: "Recent Permits", value: data.kpis.recentPermits, icon: FileText },
    { label: "Expansion Announcements", value: data.kpis.recentExpansionAnnouncements, icon: TrendingUp },
    { label: "Top Recommended", value: data.kpis.topRecommendedIndustry, icon: Target, highlight: true },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiCards.map((kpi, i) => (
          <div key={i} className={`p-5 rounded-xl border shadow-sm flex flex-col justify-between ${kpi.highlight ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-medium ${kpi.highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{kpi.label}</span>
              <kpi.icon className={`w-5 h-5 ${kpi.highlight ? 'text-indigo-200' : 'text-slate-400'}`} />
            </div>
            <div className={`text-2xl font-bold ${kpi.highlight ? 'text-white' : 'text-slate-900'}`}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Economic Snapshot */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Employers</h2>
            <div className="space-y-4">
              {data.topEmployers.map((emp, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-slate-800">{emp.name}</div>
                    <div className="text-xs text-slate-500">{emp.sector}</div>
                  </div>
                  <div className="text-sm font-semibold text-slate-700">{emp.employees.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Industry Clusters</h2>
            <div className="space-y-4">
              {data.topClusters.map((cluster, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{cluster.name}</span>
                    <span className="text-slate-500">{cluster.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${cluster.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Investments</h2>
            <div className="space-y-4">
              {data.recentHeadlines.map((headline, i) => (
                <div key={i} className="border-l-2 border-indigo-500 pl-3 py-1">
                  <div className="text-sm font-medium text-slate-800">{headline.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{new Date(headline.date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Map Preview */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex-1 min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Map Preview</h2>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View Full Map</button>
            </div>
            <div className="flex-1 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for actual Google Map */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/map/800/600')] bg-cover bg-center mix-blend-luminosity"></div>
              <div className="relative z-10 text-center space-y-2">
                <MapPin className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-slate-500 font-medium">Interactive Map Loading...</div>
                <div className="text-xs text-slate-400">Showing 156 industrial listings and 42 employers</div>
              </div>
            </div>
          </div>

          {/* Bottom Section: AI Summary */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-300" />
                <h2 className="text-lg font-semibold text-white">AI Opportunity Summary</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-indigo-300 text-sm font-medium mb-2 uppercase tracking-wider">Competitive Edge</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Montgomery shows strong readiness in automotive manufacturing and logistics, supported by existing anchor employers like HMMA and excellent I-65/I-85 access.
                  </p>
                </div>
                <div>
                  <h3 className="text-indigo-300 text-sm font-medium mb-2 uppercase tracking-wider">Current Gaps</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    While industrial space is available, specialized cold-chain facilities and advanced digital infrastructure show lower inventory compared to regional peers.
                  </p>
                </div>
                <div>
                  <h3 className="text-indigo-300 text-sm font-medium mb-2 uppercase tracking-wider">Strongest Opportunity</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <strong>Logistics & Fulfillment</strong> presents the highest immediate ROI, leveraging existing workforce skills and 156 active industrial listings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
