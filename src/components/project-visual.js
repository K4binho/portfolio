const esc = value => String(value).replace(/[&<>\"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const palettes = {
  streaming: { accent: '#72c8ff', secondary: '#3a75e8', label: 'STREAMHUB / OBS' },
  apps: { accent: '#72c8ff', secondary: '#7b5cff', label: 'K4 PLAY / MEDIA' },
  automation: { accent: '#98f5bd', secondary: '#2b9b71', label: 'PROMO BOT / AUTOMATION' },
  web: { accent: '#ffb978', secondary: '#e05e74', label: 'POKEDEX / WEB DATA' }
};

export function projectVisual(project, mode = 'card') {
  const palette = palettes[project.category] || palettes.web;
  const compact = mode === 'card';
  const title = esc(project.name);
  const uid = `visual-${project.number}`;
  const bars = Array.from({ length: 10 }, (_, index) => `<rect x="${compact ? 46 + index * 25 : 72 + index * 34}" y="${compact ? 170 - (index % 4) * 14 : 230 - (index % 4) * 18}" width="${compact ? 15 : 22}" height="${compact ? 26 + (index % 4) * 14 : 42 + (index % 4) * 18}" rx="3" fill="${palette.accent}" opacity="${0.28 + (index % 3) * 0.12}"/>`).join('');
  const nodes = project.category === 'web'
    ? `<circle cx="${compact ? 104 : 174}" cy="${compact ? 122 : 164}" r="${compact ? 34 : 52}" fill="none" stroke="${palette.accent}" stroke-width="3"/><path d="M${compact ? 82 : 142} ${compact ? 122 : 164}h${compact ? 44 : 64}M${compact ? 104 : 174} ${compact ? 88 : 112}c-16 20-16 48 0 68M${compact ? 104 : 174} ${compact ? 88 : 112}c16 20 16 48 0 68" fill="none" stroke="${palette.accent}" stroke-width="2" opacity=".75"/>`
    : `<path d="M${compact ? 72 : 110} ${compact ? 152 : 205}h${compact ? 210 : 390}" stroke="${palette.accent}" stroke-width="2" opacity=".6"/><circle cx="${compact ? 106 : 168}" cy="${compact ? 108 : 142}" r="${compact ? 12 : 18}" fill="${palette.accent}"/><circle cx="${compact ? 190 : 304}" cy="${compact ? 86 : 114}" r="${compact ? 9 : 14}" fill="${palette.secondary}"/><circle cx="${compact ? 270 : 438}" cy="${compact ? 124 : 168}" r="${compact ? 11 : 16}" fill="${palette.accent}"/>`;

  return `<svg class="project-visual" viewBox="0 0 ${compact ? 360 : 640} ${compact ? 220 : 360}" role="img" aria-label="Visualização vetorial de ${title}" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="${uid}-bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#07152b"/><stop offset="1" stop-color="#102f51"/></linearGradient><linearGradient id="${uid}-line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="${palette.secondary}"/><stop offset="1" stop-color="${palette.accent}"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#${uid}-bg)"/>
    <path d="M0 ${compact ? 34 : 54}h${compact ? 360 : 640}M0 ${compact ? 190 : 306}h${compact ? 360 : 640}" stroke="#72c8ff" opacity=".12"/>
    <text x="${compact ? 22 : 36}" y="${compact ? 28 : 42}" fill="${palette.accent}" font-size="${compact ? 9 : 13}" font-family="monospace" letter-spacing="2">${palette.label}</text>
    ${nodes}${bars}
    <rect x="${compact ? 22 : 36}" y="${compact ? 66 : 92}" width="${compact ? 316 : 568}" height="${compact ? 92 : 148}" rx="8" fill="#06101f" stroke="url(#${uid}-line)" opacity=".88"/>
    <text x="${compact ? 42 : 66}" y="${compact ? 94 : 132}" fill="#eff8ff" font-size="${compact ? 18 : 28}" font-family="system-ui" font-weight="700">${title}</text>
    <text x="${compact ? 42 : 66}" y="${compact ? 116 : 160}" fill="#9fc4e4" font-size="${compact ? 10 : 14}" font-family="monospace">${project.category.toUpperCase()} · MODULAR SYSTEM</text>
    <path d="M${compact ? 42 : 66} ${compact ? 137 : 190}h${compact ? 132 : 238}" stroke="${palette.accent}" stroke-width="3" stroke-linecap="round"/>
    <text x="${compact ? 42 : 66}" y="${compact ? 181 : 286}" fill="#9fc4e4" font-size="${compact ? 9 : 12}" font-family="monospace">K4BINHO / BUILDING IN PUBLIC</text>
  </svg>`;
}
