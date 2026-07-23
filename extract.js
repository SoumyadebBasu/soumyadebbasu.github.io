const fs = require('fs');
const code = fs.readFileSync('C:\\Users\\Rahul\\.gemini\\antigravity\\brain\\fa5c8539-b2b7-434e-bb81-69c0187613b7\\.system_generated\\steps\\427\\content.md', 'utf8');
const strings = code.match(/["']([\w\s,.:;-]{30,})["']/g);
if (strings) {
  const unique = [...new Set(strings.map(s => s.slice(1, -1)))];
  console.log(unique.join('\n'));
}
