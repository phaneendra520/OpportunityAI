import { useState } from "react";
import { FileText, Download, Copy, Sparkles, Loader2 } from "lucide-react";

export default function AIReport() {
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    // Mock generation delay
    setTimeout(() => {
      setReport(`
# Executive Summary: Montgomery Economic Opportunity
**Date:** March 2025
**Audience:** City Leadership & Investors

## Why Montgomery? Why Now?
Montgomery is uniquely positioned to capture the next wave of industrial expansion in the Southeast. With a strong foundation in automotive manufacturing (anchored by HMMA) and strategic positioning at the intersection of I-65 and I-85, the city offers a compelling mix of shovel-ready sites and a proven industrial workforce. Recent investments and a 20% year-over-year increase in warehouse job postings signal strong market momentum.

## Top Recommended Industries
Based on our AI-driven analysis of workforce, property, logistics, and momentum data, the following industries represent the highest ROI opportunities for Montgomery:

1. **Logistics & Fulfillment (Score: 92/100)**
   - **Why:** Immediate access to 60% of the US population within a one-day drive. 156 active industrial listings and 4 shovel-ready mega-sites.
   - **Target:** E-commerce fulfillment operators, cold storage 3PLs.

2. **EV / Auto Supplier Expansion (Score: 88/100)**
   - **Why:** Leverages existing HMMA supply chain and skilled workforce.
   - **Target:** Battery component manufacturers, Tier 1/2 EV suppliers.

3. **Light Advanced Manufacturing (Score: 85/100)**
   - **Why:** Strong alignment with local technical college training programs and available mid-sized industrial properties.

## Top Area Recommendations
- **Gunter Industrial Corridor:** Optimal for large-scale logistics due to immediate I-65 access and available acreage.
- **Airport-Adjacent Area:** Ideal for high-value, time-sensitive manufacturing and specialized cold chain.

## Evidence Summary
- **Workforce:** 1,200+ active job postings in supply chain and manufacturing roles.
- **Property:** 156 active commercial real estate listings in industrial zones.
- **Momentum:** 12 major expansion announcements in the region over the last 6 months.

## Risks & Next Steps
- **Risk:** High competition for entry-level warehouse labor.
- **Action:** Partner with Trenholm State to expand supply chain automation training.
- **Action:** Fast-track permitting for the top 4 shovel-ready sites to secure immediate investments.
      `);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">AI Report Generator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Selected City</label>
              <input type="text" value="Montgomery, AL" disabled className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                <option>City Leadership / Mayor</option>
                <option>Chamber of Commerce</option>
                <option>External Investors</option>
                <option>Public Briefing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Include Industries</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="rounded text-indigo-600" defaultChecked /> Logistics & Fulfillment
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="rounded text-indigo-600" defaultChecked /> EV Supplier Expansion
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="rounded text-indigo-600" defaultChecked /> Light Manufacturing
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Focus Area (Optional)</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Recommended Areas</option>
                <option>Gunter Industrial Corridor</option>
                <option>Airport-Adjacent Area</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={generating}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
            >
              {generating ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Generate Brief</>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <FileText className="w-5 h-5" />
                Generated Report
              </div>
              {report && (
                <div className="flex gap-2">
                  <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors" title="Copy to clipboard">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto bg-slate-50/50">
              {report ? (
                <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-indigo-600">
                  {report.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>;
                    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('**')) return <p key={i} className="mb-2 font-medium">{line.replace(/\*\*/g, '')}</p>;
                    if (line.startsWith('- **')) {
                      const parts = line.replace('- **', '').split('**');
                      return <li key={i} className="mb-2"><strong>{parts[0]}</strong>{parts[1]}</li>;
                    }
                    if (line.startsWith('- ')) return <li key={i} className="mb-1">{line.replace('- ', '')}</li>;
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className="mb-4">{line}</p>;
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <Sparkles className="w-12 h-12 opacity-20" />
                  <p>Configure settings and generate a report to see it here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
