const fs = require('fs');
const path = 'src/components/StyleTab.tsx';
let c = fs.readFileSync(path, 'utf8');

// 1. Tabs
c = c.replace(
  `  const tabs = [
    { id: "frames", label: "Frames" },
    { id: "shapes", label: "Shapes" },
    { id: "logo", label: "Logo" },
    { id: "colors", label: "Colors" },
    { id: "level", label: "Level" }
  ];`,
  `  const tabs = [
    { id: "premade", label: "Pre-made" },
    { id: "frames", label: "Frames" },
    { id: "shapes", label: "Shapes" },
    { id: "logo", label: "Logo" },
    { id: "colors", label: "Colors" }
  ];`
);

// 2. Change Frames Tab to Pre-made Tab for the templates
c = c.replace(
  '{/* FRAMES TAB */}\n        {activeTab === "frames" && (',
  '{/* PRE-MADE TAB */}\n        {activeTab === "premade" && ('
);

// 3. Move Frames, Frame Background, and Additional Text to a new "frames" tab
// The existing frames tab has Pre-Made Templates, Standard Frames, Frame Background, Additional Text.
// Since I just changed activeTab === "frames" to "premade", now everything is under premade.
// I need to split it.
const splitStr = '{/* Standard Frames */}';
c = c.replace(
  splitStr,
  `</>\n        )}\n\n        {/* FRAMES TAB */}\n        {activeTab === "frames" && (\n           <>\n              ` + splitStr
);

// 4. Update the "Shapes" tab to have 3 sections: Body Shape, External Eye, Internal Eye.
// Also the shapes options in qr-code-styling:
// Body: square, rounded, extra-rounded, dots, classy, classy-rounded
// External Eye: square, dot, extra-rounded
// Internal Eye: square, dot
const shapesTabReplace = `{/* SHAPES TAB */}
        {activeTab === "shapes" && (
           <div className="rounded-xl p-5 border space-y-8" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Body Shape</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["square", "rounded", "extra-rounded", "dots", "classy", "classy-rounded"].map(type => (
                       <button 
                         key={type} 
                         onClick={() => updateConfig({ dotStyle: type as any })} 
                         className="aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105"
                         style={{ 
                            borderColor: config.dotStyle === type ? "var(--accent)" : "var(--border)",
                            boxShadow: config.dotStyle === type ? "0 0 0 1px var(--accent)" : "none",
                            backgroundColor: "var(--bg)"
                         }}
                       >
                          <DotVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>

              <div>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>External Eye</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["square", "dot", "extra-rounded"].map(type => (
                       <button 
                         key={type} 
                         onClick={() => updateConfig({ eyeFrameStyle: type as any })} 
                         className="aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105"
                         style={{ 
                            borderColor: config.eyeFrameStyle === type ? "var(--accent)" : "var(--border)",
                            boxShadow: config.eyeFrameStyle === type ? "0 0 0 1px var(--accent)" : "none",
                            backgroundColor: "var(--bg)"
                         }}
                       >
                          <ExtEyeVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>

              <div>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Internal Eye</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["square", "dot"].map(type => (
                       <button 
                         key={type} 
                         onClick={() => updateConfig({ eyeDotStyle: type as any })} 
                         className="aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105"
                         style={{ 
                            borderColor: config.eyeDotStyle === type ? "var(--accent)" : "var(--border)",
                            boxShadow: config.eyeDotStyle === type ? "0 0 0 1px var(--accent)" : "none",
                            backgroundColor: "var(--bg)"
                         }}
                       >
                          <IntEyeVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        )}`;

// Regex replace shapes tab
c = c.replace(/\{\/\* SHAPES TAB \*\/\}[\s\S]*?(?=\{\/\* LOGO TAB \*\/\}|\{\/\* COLORS TAB \*\/\}|\]\))/, shapesTabReplace + '\n\n        ');

// 5. Massive Logos
const hugeLogos = `const PRESET_LOGOS = [
  { id: "youtube", name: "YouTube", icon: "https://cdn.simpleicons.org/youtube/FF0000" },
  { id: "facebook", name: "Facebook", icon: "https://cdn.simpleicons.org/facebook/1877F2" },
  { id: "whatsapp", name: "WhatsApp", icon: "https://cdn.simpleicons.org/whatsapp/25D366" },
  { id: "instagram", name: "Instagram", icon: "https://cdn.simpleicons.org/instagram/E1306C" },
  { id: "linkedin", name: "LinkedIn", icon: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { id: "telegram", name: "Telegram", icon: "https://cdn.simpleicons.org/telegram/26A5E4" },
  { id: "x", name: "X (Twitter)", icon: "https://cdn.simpleicons.org/x/000000" },
  { id: "messenger", name: "Messenger", icon: "https://cdn.simpleicons.org/messenger/00B2FF" },
  { id: "tiktok", name: "TikTok", icon: "https://cdn.simpleicons.org/tiktok/000000" },
  { id: "snapchat", name: "Snapchat", icon: "https://cdn.simpleicons.org/snapchat/FFFC00" },
  { id: "skype", name: "Skype", icon: "https://cdn.simpleicons.org/skype/00AFF0" },
  { id: "spotify", name: "Spotify", icon: "https://cdn.simpleicons.org/spotify/1DB954" },
  { id: "pinterest", name: "Pinterest", icon: "https://cdn.simpleicons.org/pinterest/E60023" },
  { id: "behance", name: "Behance", icon: "https://cdn.simpleicons.org/behance/1769FF" },
  { id: "google", name: "Google", icon: "https://cdn.simpleicons.org/google/4285F4" },
  { id: "twitch", name: "Twitch", icon: "https://cdn.simpleicons.org/twitch/9146FF" },
  { id: "slack", name: "Slack", icon: "https://cdn.simpleicons.org/slack/4A154B" },
  { id: "xbox", name: "Xbox", icon: "https://cdn.simpleicons.org/xbox/107C10" },
  { id: "dropbox", name: "Dropbox", icon: "https://cdn.simpleicons.org/dropbox/0061FF" },
  { id: "reddit", name: "Reddit", icon: "https://cdn.simpleicons.org/reddit/FF4500" },
  { id: "vimeo", name: "Vimeo", icon: "https://cdn.simpleicons.org/vimeo/1AB7EA" },
  { id: "github", name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717" },
  { id: "apple", name: "Apple", icon: "https://cdn.simpleicons.org/apple/000000" },
  { id: "wechat", name: "WeChat", icon: "https://cdn.simpleicons.org/wechat/07C160" },
  { id: "meta", name: "Meta", icon: "https://cdn.simpleicons.org/meta/046A38" },
  { id: "threads", name: "Threads", icon: "https://cdn.simpleicons.org/threads/000000" },
  { id: "line", name: "LINE", icon: "https://cdn.simpleicons.org/line/00C300" },
  { id: "viber", name: "Viber", icon: "https://cdn.simpleicons.org/viber/7360F2" },
  { id: "android", name: "Android", icon: "https://cdn.simpleicons.org/android/3DDC84" },
  { id: "playstation", name: "PlayStation", icon: "https://cdn.simpleicons.org/playstation/003791" },
  { id: "discord", name: "Discord", icon: "https://cdn.simpleicons.org/discord/5865F2" },
  { id: "zoom", name: "Zoom", icon: "https://cdn.simpleicons.org/zoom/2D8CFF" },
  { id: "gmail", name: "Gmail", icon: "https://cdn.simpleicons.org/gmail/EA4335" },
  { id: "googleplay", name: "Google Play", icon: "https://cdn.simpleicons.org/googleplay/414141" },
  { id: "paypal", name: "PayPal", icon: "https://cdn.simpleicons.org/paypal/00457C" },
];`;

c = c.replace(/const PRESET_LOGOS = \[[\s\S]*?\];/, hugeLogos);

// 6. Blending toggle in Logo Tab
// Currently the logo tab has "Preset Logos" and uploaded logo preview.
// I will add a blending toggle.
const logoBlendStr = `
             {config.logoDataUrl && (
               <div className="rounded-xl p-5 border mt-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Logo Settings</h3>
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-2">
                       <input type="checkbox" id="logoBg" checked={!!config.logoBg} onChange={e => updateConfig({ logoBg: e.target.checked })} className="w-4 h-4 rounded cursor-pointer" style={{ accentColor: "var(--accent)" }} />
                       <label htmlFor="logoBg" className="text-sm font-medium cursor-pointer" style={{ color: "var(--fg)" }}>Remove Background Behind Logo</label>
                     </div>
                     <div>
                       <label className="text-xs font-bold block mb-2" style={{ color: "var(--fg-muted)" }}>Logo Size</label>
                       <input type="range" min="0.1" max="0.5" step="0.05" value={config.logoSize || 0.4} onChange={e => updateConfig({ logoSize: parseFloat(e.target.value) })} className="w-full" />
                     </div>
                  </div>
               </div>
             )}
`;

c = c.replace('{/* LOGO TAB */}', '{/* LOGO TAB */}');
// I need to insert logoBlendStr after the uploaded logo preview or somewhere inside activeTab === "logo"
const uploadZoneStr = '</p>\n                </div>\n              )}';
c = c.replace(uploadZoneStr, uploadZoneStr + '\n' + logoBlendStr);

fs.writeFileSync(path, c);
console.log('StyleTab fully refactored!');
