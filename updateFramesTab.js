const fs = require('fs');
const path = 'src/components/StyleTab.tsx';
let c = fs.readFileSync(path, 'utf8');

// I need to replace the entire activeTab === "frames" block.
const searchStr = '{/* FRAMES TAB */}\n        {activeTab === "frames" && (\n           <>\n              {/* Standard Frames */}';

const newFramesTab = `{/* FRAMES TAB */}
        {activeTab === "frames" && (
           <div className="space-y-6">
              {/* Text Frames (Basic) */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Text Frames</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["none", "standard", "business", "badge", "minimal"].map(type => (
                      <button
                        key={type}
                        onClick={() => updateConfig({ frameType: type as any, graphicFrame: null })}
                        className="aspect-square flex flex-col items-center justify-center gap-1 border rounded-lg transition-all hover:scale-105"
                        style={{ 
                           borderColor: config.frameType === type && !config.graphicFrame ? "var(--accent)" : "var(--border)",
                           boxShadow: config.frameType === type && !config.graphicFrame ? "0 0 0 1px var(--accent)" : "none",
                           backgroundColor: "var(--bg)"
                        }}
                      >
                        {type === "none" ? <X className="w-8 h-8 stroke-1" style={{ color: "var(--fg-muted)" }} /> : <FrameVisualizer type={type} color="var(--accent)" />}
                      </button>
                    ))}
                 </div>
              </div>

              {/* SVG Graphic Frames (Categorized) */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-1" style={{ color: "var(--fg)" }}>Graphic Frames</h3>
                 <p className="text-[11px] mb-4" style={{ color: "var(--fg-muted)" }}>Applies decorative border without changing your colors.</p>
                 {(["Standard","Business","Social","Events","Holidays"] as const).map(cat => {
                   const catTemplates = TEMPLATES.filter(t => t.category === cat && t.graphicFrame);
                   if (!catTemplates.length) return null;
                   return (
                     <div key={cat} className="mb-5">
                       <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--fg-muted)" }}>{cat}</p>
                       <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                         {catTemplates.map(t => (
                           <button key={t.id}
                             onClick={() => updateConfig({ graphicFrame: t.graphicFrame, frameType: "none" })}
                             className="flex flex-col items-center gap-1.5 border rounded-xl p-2 transition-all hover:scale-105 overflow-hidden"
                             style={{ borderColor: config.graphicFrame === t.graphicFrame ? "var(--accent)" : "var(--border)", boxShadow: config.graphicFrame === t.graphicFrame ? "0 0 0 1px var(--accent)" : "none", backgroundColor: "var(--bg)" }}
                             title={t.name}>
                             <div className="w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 border">
                               <img src={t.graphicFrame!} alt={t.name} className="w-full h-full object-cover" />
                             </div>
                           </button>
                         ))}
                       </div>
                     </div>
                   );
                 })}
              </div>

              {/* Frame Background */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Frame Options</h3>
                 <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-full sm:w-48">
                       <ColorRow label="Background Color" value={config.frameColor} onChange={v => updateConfig({ frameColor: v })} />
                    </div>
                 </div>
              </div>

              {/* Additional Text */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Additional Text (Text Frames Only)</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <DHInput label="Additional Text" value={config.customText} onChange={e => updateConfig({ customText: e.target.value })} placeholder="Scan Me" />
                    <DHSelect label="Font" value={config.fontFamily} onChange={e => updateConfig({ fontFamily: e.target.value })}>
                       <option value="Inter, sans-serif">Roboto</option>
                       <option value="system-ui, sans-serif">System UI</option>
                       <option value="monospace">Monospace</option>
                    </DHSelect>
                    <ColorRow label="Text Color" value={config.textColor} onChange={v => updateConfig({ textColor: v })} />
                 </div>
              </div>
           </div>
        )}`;

// I need to use regex to replace from {activeTab === "frames" && ( to the next tab {activeTab === "shapes" && (
c = c.replace(/\{\/\* FRAMES TAB \*\/\}[\s\S]*?(?=\{\/\* SHAPES TAB \*\/\})/, newFramesTab + '\n\n        ');

fs.writeFileSync(path, c);
console.log('Frames tab updated with categorized SVG frames!');
