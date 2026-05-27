"use client";
import { useState, useCallback } from "react";
import { Upload, Mic, Camera, FileText, Clock } from "lucide-react";

const MOCK_TEAM_CAPTURES = [
  {
    id: 1,
    user: "Alex M.",
    type: "note",
    content:
      "Risankizumab plenary — packed session, strong efficacy signal vs ustekinumab. Chen's data impressive.",
    time: "2 min ago",
    color: "#0D9488",
  },
  {
    id: 2,
    user: "Priya K.",
    type: "photo",
    content: "Poster 2026-041: MASH combo data captured. Good image quality.",
    time: "8 min ago",
    color: "#8B5CF6",
  },
  {
    id: 3,
    user: "Daniel W.",
    type: "audio",
    content:
      "Voice memo: Rodriguez fibrosis talk — key takeaway: FIB-4 <1.3 NPV now validated prospectively.",
    time: "15 min ago",
    color: "#F59E0B",
  },
  {
    id: 4,
    user: "Sarah L.",
    type: "note",
    content:
      "Competitor alert: Eli Lilly mirikizumab vs ours — will need to update competitive grid.",
    time: "22 min ago",
    color: "#EF4444",
  },
];

export default function CapturePage() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = useCallback(async (_file: File) => {
    setUploading(true);
    // Simulate upload delay
    await new Promise((r) => setTimeout(r, 1500));
    setUploading(false);
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2A43]">Capture</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Upload PDFs, photos, or record notes from the congress floor
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload zone — REAL */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#0F2A43]">Upload</h2>
            <span className="inline-flex items-center gap-1 text-xs text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" /> Real
            </span>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
              dragOver
                ? "border-[#0D9488] bg-teal-50"
                : uploaded
                ? "border-green-400 bg-green-50"
                : "border-[#E2E8F0] bg-white hover:border-[#0D9488] hover:bg-teal-50/30"
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-slate-500">Processing…</p>
              </div>
            ) : uploaded ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                  ✓
                </div>
                <p className="text-sm font-medium text-green-700">
                  Upload queued for extraction
                </p>
              </div>
            ) : (
              <>
                <Upload size={28} className="mx-auto mb-3 text-slate-400" />
                <p className="text-sm font-medium text-[#0F2A43] mb-1">
                  Drop file here or click to browse
                </p>
                <p className="text-xs text-slate-400 mb-4">
                  PDF abstracts, photos of posters, audio notes
                </p>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white transition" style={{ backgroundColor: "#0D9488" }}>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] && handleUpload(e.target.files[0])
                    }
                  />
                  Choose file
                </label>
              </>
            )}
          </div>

          {/* Quick capture buttons */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { icon: Mic, label: "Record", color: "#8B5CF6" },
              { icon: Camera, label: "Photo", color: "#F59E0B" },
              { icon: FileText, label: "Note", color: "#0D9488" },
            ].map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5 py-3 bg-white border border-[#E2E8F0] rounded-xl hover:border-slate-300 transition"
              >
                <Icon size={18} style={{ color }} />
                <span className="text-xs text-slate-500 font-medium">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Live team feed — MOCKED */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#0F2A43]">
              Team captures
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Demo data
            </span>
          </div>

          <div className="space-y-2">
            {MOCK_TEAM_CAPTURES.map((capture) => (
              <div
                key={capture.id}
                className="bg-white border border-[#E2E8F0] rounded-xl p-3.5"
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: capture.color }}
                  >
                    {capture.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-semibold text-[#0F2A43]">
                        {capture.user}
                      </span>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {capture.type}
                      </span>
                      <span className="ml-auto text-[10px] text-slate-400 flex items-center gap-0.5 flex-shrink-0">
                        <Clock size={9} />
                        {capture.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {capture.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
