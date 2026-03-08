import { useState } from "react";
import { Filter, MapPin, Building2, Briefcase, ChevronRight, X } from "lucide-react";

export default function MapIntelligence() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const areas = [
    { id: "gunter", name: "Gunter Industrial Corridor", score: 92, businesses: 45, properties: 12, driveTime: "5 mins to I-65" },
    { id: "airport", name: "Airport-Adjacent Area", score: 88, businesses: 28, properties: 8, driveTime: "2 mins to Airport" },
    { id: "downtown", name: "Downtown Adaptive Reuse", score: 75, businesses: 156, properties: 5, driveTime: "10 mins to I-65" }
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Left Filter Drawer */}
      <div className="w-64 bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col h-full overflow-y-auto">
        <div className="flex items-center gap-2 mb-6 text-slate-900 font-semibold">
          <Filter className="w-5 h-5" />
          Map Filters
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Industry Focus</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Logistics & Fulfillment</option>
              <option>EV Supplier Expansion</option>
              <option>Data Centers</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Property Type</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
              <option>All Industrial</option>
              <option>Warehouse</option>
              <option>Manufacturing</option>
              <option>Shovel-Ready Land</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Min Square Footage</label>
            <input type="range" className="w-full" min="0" max="500000" step="50000" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0 sqft</span>
              <span>500k+ sqft</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Max Drive Time to I-65</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Any</option>
              <option>Under 5 mins</option>
              <option>Under 15 mins</option>
              <option>Under 30 mins</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" defaultChecked />
              Show high-confidence areas only
            </label>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/seed/montgomerymap/1200/800')] bg-cover bg-center mix-blend-luminosity"></div>
        
        {/* Mock Map Markers */}
        <div className="absolute inset-0">
          <button 
            onClick={() => setSelectedArea("gunter")}
            className="absolute top-1/3 left-1/2 w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center animate-pulse"
          >
            <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-md"></div>
          </button>
          <button 
            onClick={() => setSelectedArea("airport")}
            className="absolute top-1/2 left-2/3 w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center animate-pulse"
          >
            <div className="w-4 h-4 bg-emerald-600 rounded-full border-2 border-white shadow-md"></div>
          </button>
        </div>

        <div className="relative z-10 text-center pointer-events-none">
          <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <div className="text-slate-600 font-medium bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm">
            Interactive Map View
          </div>
        </div>

        {/* Floating Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm text-sm">
          <div className="font-semibold text-slate-900 mb-2">Map Layers</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-600"></div> Recommended Areas</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Shovel-Ready Sites</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Active Permits</div>
          </div>
        </div>
      </div>

      {/* Right Details Drawer */}
      {selectedArea && (
        <div className="w-80 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden animate-in slide-in-from-right-8">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-semibold text-slate-900">Area Details</h3>
            <button onClick={() => setSelectedArea(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-5 overflow-y-auto flex-1 space-y-6">
            {areas.filter(a => a.id === selectedArea).map(area => (
              <div key={area.id} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">{area.name}</h2>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Opportunity Score: {area.score}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <Briefcase className="w-4 h-4 text-slate-400 mb-1" />
                    <div className="text-lg font-semibold text-slate-900">{area.businesses}</div>
                    <div className="text-xs text-slate-500">Nearby Businesses</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <Building2 className="w-4 h-4 text-slate-400 mb-1" />
                    <div className="text-lg font-semibold text-slate-900">{area.properties}</div>
                    <div className="text-xs text-slate-500">Available Properties</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Logistics Access</h4>
                  <div className="text-sm text-slate-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    {area.driveTime}
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="text-sm font-semibold text-indigo-900 mb-2">AI Rationale</h4>
                  <p className="text-sm text-indigo-800 leading-relaxed">
                    This area provides the optimal balance of immediate interstate access and available industrial zoning. The presence of {area.businesses} existing businesses indicates a mature utility and workforce infrastructure.
                  </p>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                  View Full Area Report <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
