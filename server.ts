import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock data for Phase 1
  app.get("/api/city/montgomery/overview", (req, res) => {
    res.json({
      city: "Montgomery",
      state: "AL",
      lastRefreshed: new Date().toISOString(),
      kpis: {
        majorEmployers: 42,
        recentIndustrialListings: 156,
        activeBusinessSignals: 1205,
        recentPermits: 89,
        recentExpansionAnnouncements: 12,
        topRecommendedIndustry: "Logistics & Fulfillment"
      },
      topEmployers: [
        { name: "Hyundai Motor Manufacturing Alabama", employees: 3000, sector: "Manufacturing" },
        { name: "Maxwell-Gunter Air Force Base", employees: 12000, sector: "Defense" },
        { name: "Baptist Health", employees: 4300, sector: "Healthcare" },
        { name: "Montgomery Public Schools", employees: 4500, sector: "Education" },
        { name: "Alfa Insurance", employees: 2500, sector: "Insurance" }
      ],
      topClusters: [
        { name: "Automotive Manufacturing", score: 92 },
        { name: "Logistics & Distribution", score: 88 },
        { name: "Defense & Aerospace", score: 85 }
      ],
      recentHeadlines: [
        { title: "New 500,000 sq ft logistics center announced", date: "2025-02-15" },
        { title: "Auto supplier expands operations, adding 200 jobs", date: "2025-01-28" },
        { title: "City approves new industrial park zoning", date: "2025-01-10" }
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
