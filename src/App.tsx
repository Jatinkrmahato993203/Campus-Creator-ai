/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DocumentView } from "./components/DocumentView";
import { LiveDemo } from "./components/LiveDemo";
import { FileText, Play } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"doc" | "demo">("doc");

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row font-sans text-zinc-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-zinc-200 flex flex-col">
        <div className="p-6 border-b border-zinc-200">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            Campus Creator AI
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Hackathon Deep Dive</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("doc")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "doc"
                ? "bg-indigo-50 text-indigo-700"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Deep Dive Doc</span>
          </button>
          <button
            onClick={() => setActiveTab("demo")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "demo"
                ? "bg-indigo-50 text-indigo-700"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Live Prototype</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        {activeTab === "doc" ? <DocumentView /> : <LiveDemo />}
      </main>
    </div>
  );
}
