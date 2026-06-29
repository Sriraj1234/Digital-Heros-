const fs = require('fs');
const path = 'src/components/StyleTab.tsx';
let c = fs.readFileSync(path, 'utf8');

const colorExtractor = `
// --- AI Color Extraction Utility ---
const extractDominantColor = (imgSrc: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve("#000000");
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] > 0) { // skip transparent pixels
            r += data[i]; g += data[i + 1]; b += data[i + 2];
            count++;
          }
        }
        if (count === 0) return resolve("#000000");
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        const toHex = (c: number) => {
          const hex = c.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        };
        resolve("#" + toHex(r) + toHex(g) + toHex(b));
      } catch (e) {
        resolve("#000000");
      }
    };
    img.onerror = () => resolve("#000000");
    img.src = imgSrc;
  });
};
`;

c = c.replace('export function StyleTab', colorExtractor + '\nexport function StyleTab');

const brandAIState = `
  const [brandVibe, setBrandVibe] = useState("");
  const [isBrandAILoading, setIsBrandAILoading] = useState(false);

  const handleBrandAI = async () => {
    if (!config.logoDataUrl || !brandVibe.trim()) return;
    setIsBrandAILoading(true);
    try {
      const dominantColor = await extractDominantColor(config.logoDataUrl);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          mode: "generate-brand-style", 
          prompt: \`My brand industry/vibe is: "\${brandVibe}". The dominant color of my uploaded logo is \${dominantColor}.\` 
        })
      });
      const data = await res.json();
      if (data.result) {
        updateConfig(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBrandAILoading(false);
    }
  };
`;

c = c.replace('const handleMagicAI', brandAIState + '\n  const handleMagicAI');

const brandAIUI = `
             {/* AI Brand Styler */}
             <div className="rounded-xl p-4 border mt-6" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
               <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ AI Auto-Styler</h4>
                  <button 
                    onClick={handleBrandAI} 
                    disabled={isBrandAILoading || !brandVibe}
                    className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                  >
                    {isBrandAILoading ? "Analyzing..." : "Auto-Style QR"}
                  </button>
               </div>
               <p className="text-[10px] mb-2" style={{ color: "var(--fg-muted)" }}>We will analyze your logo's colors and pick the perfect shapes/gradients for your industry!</p>
               <input 
                 type="text"
                 value={brandVibe} 
                 onChange={e => setBrandVibe(e.target.value)} 
                 placeholder="What is your brand's field? (e.g., Luxury Real Estate, Cafe)" 
                 className="dh-input w-full text-xs h-8" 
               />
             </div>
`;

// Inject into the Logo tab, right after the Logo Settings div (which ends at `</div>\n               </div>\n             )}`)
c = c.replace('</div>\n               </div>\n             )}', '</div>\n               </div>\n' + brandAIUI + '\n             )}');

fs.writeFileSync(path, c);
console.log('AI Brand Styler injected into StyleTab!');
