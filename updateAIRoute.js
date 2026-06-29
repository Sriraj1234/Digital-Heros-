const fs = require('fs');
const path = 'src/app/api/ai/route.ts';
let c = fs.readFileSync(path, 'utf8');

const newMode = `
      case "generate-brand-style":
        systemPrompt = "You are an expert Brand UI/UX Designer. The user has uploaded a logo with a specific dominant color and provided their industry/vibe. Return ONLY a valid JSON object with a complete QR Code style config that perfectly matches their brand. The JSON keys must be exactly: fgColor (hex), fgColor2 (hex), bgColor (hex), eyeColor (hex), dotStyle (one of: 'square', 'rounded', 'extra-rounded', 'dots', 'classy', 'classy-rounded'), eyeFrameStyle (one of: 'square', 'dot', 'extra-rounded'), eyeDotStyle (one of: 'square', 'dot'). Ensure the foreground colors are dark enough to scan against the bgColor. Do not include markdown formatting or backticks.";
        break;
`;

c = c.replace('case "generate-style":', newMode + '\n      case "generate-style":');

fs.writeFileSync(path, c);
console.log('API route updated with generate-brand-style mode');
