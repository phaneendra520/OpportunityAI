import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, MapPin, Users, Building2, Truck, Lightbulb, FileText, Sparkles } from "lucide-react";

export default function IndustryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for Logistics & Fulfillment
  const data = {
    name: "Logistics & Fulfillment",
    overallScore: 92,
    confidence: 88,
    verdict: "Montgomery's strongest immediate opportunity, driven by I-65 access and shovel-ready industrial sites.",
    overview: {
      whyFits: "Montgomery sits at the intersection of I-65 and I-85, providing one-day truck access to 60% of the US population. The existing automotive manufacturing base has already established a robust logistics network.",
      recentSignals: ["New 500k sq ft distribution center announced in Jan 2025", "20% year-over-year increase in warehouse job postings"],
      comparables: ["Dollar General Distribution Center", "Amazon Fulfillment Center (BHM)"]
    },
    workforce: {
      topSkills: ["Forklift Operation", "Supply Chain Management", "Inventory Control", "CDL Class A"],
      gapSummary: "Strong base of entry-level warehouse labor, but shortage of logistics management and automation technicians.",
      reskilling: "Partner with Trenholm State to expand supply chain automation and robotics maintenance programs."
    },
    sites: {
      candidateCount: 15,
      shovelReady: 4,
      permitActivity: "High (12 new commercial permits in industrial zones in last 90 days)"
    },
    logistics: {
      i65Access: "5 mins average",
      airportAccess: "15 mins average",
      portAccess: "2.5 hours to Port of Mobile"
    },
    risks: [
      "High competition for entry-level warehouse labor driving up wages",
      "Aging infrastructure in some older industrial parks",
      "Potential traffic congestion on key arterial roads during peak shifts"
    ],
    aiRecommendations: {
      targets: ["E-commerce fulfillment operators", "Cold storage 3PLs", "Auto parts distributors"],
      enablers: ["Fast-track permitting for mega-sites", "Expand public transit routes to industrial parks"],
      pitch: "Montgomery offers the Southeast's most cost-effective logistics hub, combining immediate interstate access, shovel-ready mega-sites, and a proven industrial workforce."
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "workforce", label: "Workforce", icon: Users },
    { id: "sites", label: "Sites", icon: Building2 },
    { id: "logistics", label: "Logistics", icon: Truck },
    { id: "risks", label: "Risks", icon: AlertTriangle },
    { id: "ai", label: "AI Recommendations", icon: Lightbulb }
  ];

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate("/industries")}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Rankings
      </button>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900">{data.name}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{data.verdict}</p>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {data.confidence}% Data Confidence
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-indigo-500" />
                4 Recommended Areas
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-indigo-50 rounded-xl p-6 min-w-[160px]">
            <div className="text-4xl font-bold text-indigo-700">{data.overallScore}</div>
            <div className="text-sm font-medium text-indigo-900 mt-1">Opportunity Score</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto border-b border-slate-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Why Montgomery Fits</h3>
                <p className="text-slate-700 leading-relaxed">{data.overview.whyFits}</p>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Recent Signals</h3>
                  <ul className="space-y-2">
                    {data.overview.recentSignals.map((sig, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>{sig}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Comparable Employers</h3>
                  <ul className="space-y-2">
                    {data.overview.comparables.map((comp, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          )}

          {activeTab === "workforce" && (
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Top Detected Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.workforce.topSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Workforce Gap Summary</h3>
                <p className="text-slate-700 leading-relaxed">{data.workforce.gapSummary}</p>
              </section>
              <section className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" /> AI Reskilling Recommendation
                </h3>
                <p className="text-indigo-800 leading-relaxed">{data.workforce.reskilling}</p>
              </section>
            </div>
          )}

          {activeTab === "sites" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{data.sites.candidateCount}</div>
                  <div className="text-sm font-medium text-slate-500">Candidate Properties</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{data.sites.shovelReady}</div>
                  <div className="text-sm font-medium text-slate-500">Shovel-Ready Sites</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                  <div className="text-lg font-bold text-slate-900 mb-1">{data.sites.permitActivity}</div>
                  <div className="text-sm font-medium text-slate-500">Permit Activity</div>
                </div>
              </div>
              <div className="h-64 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/sites/800/400')] bg-cover bg-center mix-blend-luminosity"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <div className="text-slate-500 font-medium">Site Map View</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "logistics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="text-sm font-medium text-slate-500 mb-1">I-65 / I-85 Access</div>
                  <div className="text-xl font-bold text-slate-900">{data.logistics.i65Access}</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="text-sm font-medium text-slate-500 mb-1">Airport Access</div>
                  <div className="text-xl font-bold text-slate-900">{data.logistics.airportAccess}</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="text-sm font-medium text-slate-500 mb-1">Port Access</div>
                  <div className="text-xl font-bold text-slate-900">{data.logistics.portAccess}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "risks" && (
            <div className="space-y-4">
              {data.risks.map((risk, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-amber-900">{risk}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ai" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Target Company Profiles</h3>
                  <ul className="space-y-2">
                    {data.aiRecommendations.targets.map((target, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Local Enablers to Improve</h3>
                  <ul className="space-y-2">
                    {data.aiRecommendations.enablers.map((enabler, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{enabler}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              <section className="bg-slate-900 rounded-xl p-8 text-white">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" /> Suggested Investor Pitch
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed italic">
                  "{data.aiRecommendations.pitch}"
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
