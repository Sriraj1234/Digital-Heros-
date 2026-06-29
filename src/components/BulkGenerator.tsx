"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Download, X, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface Row { data: string; filename: string }

export default function BulkGenerator() {
  const [rows, setRows] = useState<Row[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dataCol, setDataCol] = useState(0);
  const [nameCol, setNameCol] = useState(1);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string) => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) { setError("CSV must have at least 2 rows (header + data)"); return; }
    const head = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
    const parsed: Row[] = lines.slice(1).map(line => {
      const cols = line.split(",").map(c => c.trim().replace(/^"|"$/g, ""));
      return { data: cols[dataCol] ?? "", filename: cols[nameCol] ?? `qr_${Date.now()}` };
    }).filter(r => r.data);
    setHeaders(head);
    setRows(parsed);
    setError("");
  };

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".csv")) { setError("Please upload a .csv file"); return; }
    const reader = new FileReader();
    reader.onload = e => parseCSV(e.target?.result as string);
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const generateAndDownload = async () => {
    if (rows.length === 0) return;
    setGenerating(true);
    setProgress(0);
    try {
      const [{ default: QRCodeStyling }, { default: JSZip }] = await Promise.all([
        import("qr-code-styling"),
        import("jszip"),
      ]);
      const zip = new JSZip();
      for (let i = 0; i < rows.length; i++) {
        const { data, filename } = rows[i];
        const qr = new QRCodeStyling({
          width: 512, height: 512, type: "canvas",
          data,
          dotsOptions: { color: fgColor, type: "square" },
          backgroundOptions: { color: bgColor },
          margin: 20,
        });
        const blob: Blob = await qr.getRawData("png");
        zip.file(`${filename.replace(/[^a-zA-Z0-9_-]/g, "_")}.png`, blob);
        setProgress(Math.round(((i + 1) / rows.length) * 100));
      }
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url; a.download = "qr-bulk-export.zip"; a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setError("Generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="py-16 px-5" id="bulk">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="label-xs mb-3 block">Bulk Generator</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--fg)" }}>
            Generate <span style={{ color: "var(--accent)" }}>Hundreds of QR Codes</span> at Once
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--fg-muted)" }}>
            Upload a CSV file — get a ZIP of QR codes in seconds. Perfect for product labels, event tickets, restaurant tables.
          </p>
        </div>

        <div className="card p-6 md:p-8">
          {/* Upload zone */}
          <div
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all mb-6"
            style={{ borderColor: dragOver ? "var(--accent)" : "var(--border)", backgroundColor: dragOver ? "color-mix(in srgb, var(--accent) 5%, transparent)" : "var(--bg)" }}
          >
            <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <Upload className="w-8 h-8 mx-auto mb-3" style={{ color: dragOver ? "var(--accent)" : "var(--fg-muted)" }} />
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--fg)" }}>Drop your CSV here or click to browse</p>
            <p className="text-xs" style={{ color: "var(--fg-muted)" }}>Format: one QR per row. Columns: data, name/filename</p>
            <p className="text-[10px] mt-2 font-mono px-3 py-1.5 rounded-md inline-block" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}>
              URL,Name<br />https://example.com,product_001<br />https://another.com,product_002
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs mb-4 p-3 rounded-lg" style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}>
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          {rows.length > 0 && (
            <>
              {/* Config */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {headers.length > 0 && (
                  <>
                    <div>
                      <label className="label-xs mb-1 block">Data Column</label>
                      <select value={dataCol} onChange={e => { setDataCol(+e.target.value); setRows([]); }} className="dh-input text-xs py-2">
                        {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label-xs mb-1 block">Filename Column</label>
                      <select value={nameCol} onChange={e => { setNameCol(+e.target.value); setRows([]); }} className="dh-input text-xs py-2">
                        {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                      </select>
                    </div>
                  </>
                )}
                <div>
                  <label className="label-xs mb-1 block">QR Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
                    <span className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>{fgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="label-xs mb-1 block">Background</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
                    <span className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>{bgColor}</span>
                  </div>
                </div>
              </div>

              {/* Preview table */}
              <div className="rounded-lg overflow-hidden mb-5" style={{ border: "1px solid var(--border)" }}>
                <table className="w-full text-xs">
                  <thead style={{ backgroundColor: "var(--bg)" }}>
                    <tr>
                      <th className="px-3 py-2 text-left font-bold" style={{ color: "var(--fg-muted)" }}>#</th>
                      <th className="px-3 py-2 text-left font-bold" style={{ color: "var(--fg-muted)" }}>Data</th>
                      <th className="px-3 py-2 text-left font-bold" style={{ color: "var(--fg-muted)" }}>Filename</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 5).map((r, i) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                        <td className="px-3 py-2" style={{ color: "var(--fg-muted)" }}>{i + 1}</td>
                        <td className="px-3 py-2 truncate max-w-xs" style={{ color: "var(--fg)" }}>{r.data}</td>
                        <td className="px-3 py-2 font-mono" style={{ color: "var(--fg-muted)" }}>{r.filename}.png</td>
                      </tr>
                    ))}
                    {rows.length > 5 && (
                      <tr style={{ borderTop: "1px solid var(--border)" }}>
                        <td colSpan={3} className="px-3 py-2 text-center" style={{ color: "var(--fg-muted)" }}>
                          + {rows.length - 5} more rows
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Progress + Generate */}
              {generating && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: "var(--fg-muted)" }}>
                    <span>Generating QR codes…</span><span>{progress}%</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: "var(--border)" }}>
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: "var(--accent)" }} />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button onClick={generateAndDownload} disabled={generating} className="btn-primary gap-2 flex-1 justify-center">
                  {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating {progress}%…</> : <><Download className="w-4 h-4" /> Generate & Download ZIP ({rows.length} QR codes)</>}
                </button>
                <button onClick={() => { setRows([]); setHeaders([]); setError(""); }} className="btn-outline p-2.5">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {rows.length === 0 && !error && (
            <div className="flex items-center gap-3 text-xs" style={{ color: "var(--fg-muted)" }}>
              <FileSpreadsheet className="w-5 h-5 shrink-0" />
              <span>Upload a CSV to preview your data and start generating QR codes</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
