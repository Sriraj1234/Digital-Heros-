const fs = require('fs');
const path = 'src/components/QRForms.tsx';
let c = fs.readFileSync(path, 'utf8');

const vCardReplace = `{activeDef.formType === "vcard" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 rounded-xl p-4 border mb-2" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ Magic Fill with AI</h4>
                <button 
                  onClick={() => handleMagicAI("magic-fill-vcard")} 
                  disabled={isAILoading || !aiPrompt}
                  className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                >
                  {isAILoading ? "Parsing..." : "Auto-Fill Forms"}
                </button>
             </div>
             <textarea 
               value={aiPrompt} 
               onChange={e => setAiPrompt(e.target.value)} 
               placeholder="Paste messy contact info here (e.g. 'John Doe from Acme Corp, 555-1234, john@example.com')" 
               className="dh-input resize-none h-16 w-full text-xs" 
             />
          </div>
          <DHInput label="Full Name" type="text" name="vName" value={formData.vName as string} onChange={onChange} placeholder="John Doe" />`;
c = c.replace(/{activeDef\.formType === "vcard" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">\s*<DHInput label="Full Name"/, vCardReplace);

const calendarReplace = `{activeDef.formType === "calendar" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 rounded-xl p-4 border mb-2" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ Magic Fill with AI</h4>
                <button 
                  onClick={() => handleMagicAI("magic-fill-event")} 
                  disabled={isAILoading || !aiPrompt}
                  className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                >
                  {isAILoading ? "Parsing..." : "Auto-Fill Forms"}
                </button>
             </div>
             <textarea 
               value={aiPrompt} 
               onChange={e => setAiPrompt(e.target.value)} 
               placeholder="Paste messy event details here (e.g. 'Party next Friday at 8 PM at Joe\\'s, bring snacks')" 
               className="dh-input resize-none h-16 w-full text-xs" 
             />
          </div>
          <div className="sm:col-span-2"><DHInput label="Event Title"/`;
c = c.replace(/{activeDef\.formType === "calendar" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">\s*<div className="sm:col-span-2"><DHInput label="Event Title"/, calendarReplace);

const smsReplace = `{activeDef.formType === "sms" && <>
          <DHPhoneInput label="Phone Number" codeName="smsPhoneCode" phoneName="smsPhone" codeValue={formData.smsPhoneCode as string} phoneValue={formData.smsPhone as string} onChange={onChange} placeholder="234 567 8900" />
          
          <div className="rounded-xl p-4 border my-4" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ AI Copywriter</h4>
                <button 
                  onClick={() => handleMagicAI("generate-copy-sms")} 
                  disabled={isAILoading || !aiPrompt}
                  className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                >
                  {isAILoading ? "Writing..." : "Generate SMS"}
                </button>
             </div>
             <textarea 
               value={aiPrompt} 
               onChange={e => setAiPrompt(e.target.value)} 
               placeholder="What are you promoting? (e.g. 'Weekend 20% off sale on coffee')" 
               className="dh-input resize-none h-10 w-full text-xs" 
             />
          </div>

          <DHTextarea label="Pre-filled Message" name="smsMessage" value={formData.smsMessage as string} onChange={onChange} placeholder="Hello..." />
        </>}`;
c = c.replace(/{activeDef\.formType === "sms" && <>\s*<DHPhoneInput label="Phone Number" codeName="smsPhoneCode" phoneName="smsPhone" codeValue=\{formData\.smsPhoneCode as string\} phoneValue=\{formData\.smsPhone as string\} onChange=\{onChange\} placeholder="234 567 8900" \/>\s*<DHTextarea label="Pre-filled Message" name="smsMessage" value=\{formData\.smsMessage as string\} onChange=\{onChange\} placeholder="Hello\.\.\." \/>\s*<\/>\}/, smsReplace);

fs.writeFileSync(path, c);
console.log('AI Buttons injected into QRForms!');
