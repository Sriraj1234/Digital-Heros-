const fs = require('fs');

const BRANDS = [
  { id: "youtube", name: "YouTube", file: "youtube.svg" },
  { id: "facebook", name: "Facebook", file: "facebook.svg" },
  { id: "whatsapp", name: "WhatsApp", file: "whatsapp.svg" },
  { id: "instagram", name: "Instagram", file: "instagram.svg" },
  { id: "linkedin", name: "LinkedIn", file: "linkedin.svg" },
  { id: "telegram", name: "Telegram", file: "telegram.svg" },
  { id: "x", name: "X (Twitter)", file: "x.svg" }, // 'x' might be twitter
  { id: "messenger", name: "Messenger", file: "facebook-messenger.svg" },
  { id: "tiktok", name: "TikTok", file: "tiktok.svg" },
  { id: "snapchat", name: "Snapchat", file: "snapchat.svg" },
  { id: "skype", name: "Skype", file: "skype.svg" },
  { id: "spotify", name: "Spotify", file: "spotify.svg" },
  { id: "pinterest", name: "Pinterest", file: "pinterest.svg" },
  { id: "behance", name: "Behance", file: "behance.svg" },
  { id: "google", name: "Google", file: "google.svg" },
  { id: "twitch", name: "Twitch", file: "twitch.svg" },
  { id: "slack", name: "Slack", file: "slack.svg" },
  { id: "xbox", name: "Xbox", file: "xbox.svg" },
  { id: "dropbox", name: "Dropbox", file: "dropbox.svg" },
  { id: "reddit", name: "Reddit", file: "reddit.svg" },
  { id: "vimeo", name: "Vimeo", file: "vimeo.svg" },
  { id: "github", name: "GitHub", file: "github.svg" },
  { id: "apple", name: "Apple", file: "apple.svg" },
  { id: "wechat", name: "WeChat", file: "wechat.svg" },
  { id: "meta", name: "Meta", file: "meta.svg" },
  { id: "discord", name: "Discord", file: "discord.svg" },
  { id: "zoom", name: "Zoom", file: "zoom.svg" },
  { id: "gmail", name: "Gmail", file: "gmail.svg" },
  { id: "paypal", name: "PayPal", file: "paypal.svg" },
];

async function generate() {
  let tsContent = `// Auto-generated true-color brand logos\n\nexport const PRESET_LOGOS = [\n`;
  
  for (const brand of BRANDS) {
    try {
      // Try walkxcode repo first for full color icons
      const url = `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/${brand.file}`;
      let res = await fetch(url);
      if (!res.ok) {
        // Fallback to simpleicons with default color if walkxcode doesn't have it
        const simpleUrl = `https://cdn.simpleicons.org/${brand.id}`;
        res = await fetch(simpleUrl);
        if (!res.ok) throw new Error("Not found anywhere");
      }
      
      const svgText = await res.text();
      const base64 = Buffer.from(svgText).toString('base64');
      const dataUri = `data:image/svg+xml;base64,${base64}`;
      
      tsContent += `  { id: "${brand.id}", name: "${brand.name}", icon: "${dataUri}" },\n`;
      console.log(`✅ Loaded ${brand.name}`);
    } catch (e) {
      console.log(`❌ Failed ${brand.name}: ${e.message}`);
      // Add empty fallback so it doesn't break
      tsContent += `  { id: "${brand.id}", name: "${brand.name}", icon: "https://cdn.simpleicons.org/${brand.id}/000000" },\n`;
    }
  }
  
  tsContent += `];\n`;
  fs.writeFileSync('src/lib/brandLogos.ts', tsContent);
  console.log("Done!");
}

generate();
