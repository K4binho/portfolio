const paths = {
  external: '<path d="M5 19 19 5M9 5h10v10"/>',
  down: '<path d="M5 8l7 7 7-7"/>',
  right: '<path d="M5 12h13M13 6l6 6-6 6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>'
};

export function icon(name, label = '') {
  return `<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"${label ? ` role="img" aria-label="${label}"` : ''}>${paths[name] || paths.external}</svg>`;
}
