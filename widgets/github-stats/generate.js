import fs from 'fs';
import fetch from 'node-fetch';

const OWNER = 'thelonewolf39';
const REPO = 'DynamicMD';

async function generateStats() {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`);
  if (!res.ok) throw new Error('GitHub API request failed');
  const data = await res.json();

  const { stargazers_count, forks_count, open_issues_count } = data;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="80">
  <rect width="300" height="80" fill="#24292f" rx="10" />
  <text x="20" y="25" font-size="16" fill="#ffffff">⭐ Stars: ${stargazers_count}</text>
  <text x="20" y="45" font-size="16" fill="#ffffff">🍴 Forks: ${forks_count}</text>
  <text x="20" y="65" font-size="16" fill="#ffffff">🐞 Issues: ${open_issues_count}</text>
</svg>
  `;

  fs.writeFileSync('widgets/github-stats/stats.svg', svg);
  console.log('SVG updated!');
}

generateStats().catch(console.error);
