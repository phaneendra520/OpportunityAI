import { useState } from "react";
import { RefreshCw, Database, Globe, Map as MapIcon, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function DataAdmin() {
  const [syncing, setSyncing] = useState<string | null>(null);

  const sources = [
    { id: "places", name: "Google Places API", type: "API", status: "success", lastSync: "2 hours ago", records: "1,205 businesses" },
    { id: "geocoding", name: "Google Geocoding API", type: "API", status: "success", lastSync: "2 hours ago", records: "450 addresses" },
    { id: "routes", name: "Google Routes API", type: "API", status: "success", lastSync: "1 day ago", records: "12 matrices" },
    { id: "open-data", name: "Montgomery Open Data", type: "Portal", status: "success", lastSync: "5 hours ago", records: "89 permits" },
    { id: "chamber", name: "Chamber Pages", type: "Scrape", status: "warning", lastSync: "1 day ago", records: "42 employers" },
    { id: "jobs", name: "Bright Data Jobs", type: "Scrape", status: "success", lastSync: "12 hours ago", records: "1,450 postings" },
    { id: "property", name: "Bright Data Properties", type: "Scrape", status: "error", lastSync: "2 days ago", records: "156 listings" }
  ];

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  const handleSyncAll = () => {
    setSyncing("all");
    setTimeout(() => setSyncing(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Administration</h1>
          <p className="text-slate-500 mt-1">Manage data ingestion pipelines and API connections.</p>
        </div>
        <button 
          onClick={handleSyncAll}
          disabled={syncing === "all"}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-70"
        >
          <RefreshCw className={`w-4 h-4 ${syncing === "all" ? "animate-spin" : ""}`} />
          Sync All Sources
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map(source => (
          <div key={source.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  source.type === 'API' ? 'bg-blue-50 text-blue-600' : 
                  source.type === 'Portal' ? 'bg-emerald-50 text-emerald-600' : 
                  'bg-purple-50 text-purple-600'
                }`}>
                  {source.type === 'API' ? <MapIcon className="w-5 h-5" /> : 
                   source.type === 'Portal' ? <Database className="w-5 h-5" /> : 
                   <Globe className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{source.name}</h3>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{source.type}</span>
                </div>
              </div>
              {source.status === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {source.status === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500" />}
              {source.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
            </div>
            
            <div className="mt-auto space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-1"><Clock className="w-4 h-4" /> Last Sync</span>
                <span className="font-medium text-slate-700">{source.lastSync}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-1"><Database className="w-4 h-4" /> Records</span>
                <span className="font-medium text-slate-700">{source.records}</span>
              </div>
              
              <button 
                onClick={() => handleSync(source.id)}
                disabled={syncing === source.id || syncing === "all"}
                className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing === source.id ? "animate-spin" : ""}`} />
                {syncing === source.id ? "Syncing..." : "Manual Refresh"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-400" /> System Logs
          </h3>
          <span className="text-xs text-slate-400 font-mono">Tail: last 50 lines</span>
        </div>
        <div className="p-4 h-64 overflow-y-auto bg-black text-emerald-400 font-mono text-sm space-y-1">
          <div>[2025-03-08 08:00:12] INFO: Starting scheduled sync for Bright Data Jobs...</div>
          <div>[2025-03-08 08:00:45] INFO: Fetched 1,450 job postings. Normalizing...</div>
          <div>[2025-03-08 08:01:02] SUCCESS: Bright Data Jobs sync complete.</div>
          <div className="text-amber-400">[2025-03-07 14:30:00] WARN: Chamber Pages scrape returned 404 for /shovel-ready. Retrying...</div>
          <div className="text-red-400">[2025-03-06 09:15:22] ERROR: Bright Data Properties timeout after 30000ms.</div>
          <div>[2025-03-06 08:00:00] INFO: Google Places API sync complete. 1,205 records updated.</div>
          <div className="animate-pulse opacity-50">_</div>
        </div>
      </div>
    </div>
  );
}
