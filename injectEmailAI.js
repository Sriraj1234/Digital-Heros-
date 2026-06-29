const fs = require('fs');
const path = 'src/components/QRForms.tsx';
let c = fs.readFileSync(path, 'utf8');

const emailReplace = `{activeDef.formType === "email" && <>
          <DHInput label="Email Address" type="email" name="email" value={formData.email as string} onChange={onChange} placeholder="hello@example.com" />
          
          <div className="rounded-xl p-4 border my-4" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ AI Copywriter</h4>
                <button 
                  onClick={() => handleMagicAI("generate-copy-email")} 
                  disabled={isAILoading || !aiPrompt}
                  className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                >
                  {isAILoading ? "Writing..." : "Generate Email"}
                </button>
             </div>
             <textarea 
               value={aiPrompt} 
               onChange={e => setAiPrompt(e.target.value)} 
               placeholder="What are you promoting? (e.g. 'Invite to our annual charity gala')" 
               className="dh-input resize-none h-10 w-full text-xs" 
             />
          </div>

          <DHInput label="Subject" type="text" name="subject" value={formData.subject as string} onChange={onChange} placeholder="Inquiry" />
          <DHTextarea label="Message Body" name="body" value={formData.body as string} onChange={onChange} placeholder="Hello there..." />
        </>}`;

c = c.replace(/{activeDef\.formType === "email" && <>\s*<DHInput label="Email Address" type="email" name="email" value=\{formData\.email as string\} onChange=\{onChange\} placeholder="hello@example\.com" \/>\s*<DHInput label="Subject" type="text" name="subject" value=\{formData\.subject as string\} onChange=\{onChange\} placeholder="Inquiry" \/>\s*<DHTextarea label="Message Body" name="body" value=\{formData\.body as string\} onChange=\{onChange\} placeholder="Hello there\.\.\." \/>\s*<\/>\}/, emailReplace);

fs.writeFileSync(path, c);
console.log('AI Button injected into Email form!');
