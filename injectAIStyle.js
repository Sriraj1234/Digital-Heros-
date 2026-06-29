const fs = require('fs');
const path = 'src/components/StyleTab.tsx';
let c = fs.readFileSync(path, 'utf8');

// 1. Add State and Handler
const handlerCode = `
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleMagicAI = async (mode: string) => {
    if (!aiPrompt.trim()) return;
    setIsAILoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt: aiPrompt })
      });
      const data = await res.json();
      if (data.result) {
        updateConfig(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAILoading(false);
    }
  };
`;

c = c.replace('  const handleLogoUpload = useCallback((file: File) => {', handlerCode + '\n  const handleLogoUpload = useCallback((file: File) => {');

// 2. Add UI to Colors Tab
const aiColorsUI = `
             {/* AI Theme Generator */}
             <div className="rounded-xl p-4 border" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
               <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ AI Theme Generator</h4>
                  <button 
                    onClick={() => handleMagicAI("generate-style")} 
                    disabled={isAILoading || !aiPrompt}
                    className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                  >
                    {isAILoading ? "Generating..." : "Generate Colors"}
                  </button>
               </div>
               <input 
                 type="text"
                 value={aiPrompt} 
                 onChange={e => setAiPrompt(e.target.value)} 
                 placeholder="E.g., Cyberpunk neon vibe, Cozy minimalist coffee shop..." 
                 className="dh-input w-full text-xs h-8" 
               />
             </div>
`;

c = c.replace('{/* Quick Color Swatches */}', aiColorsUI + '\n             {/* Quick Color Swatches */}');

fs.writeFileSync(path, c);
console.log('AI Theme Generator injected into StyleTab!');
