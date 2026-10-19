import { projectVisual } from './project-visual.js';

export function projectCard(project) {
  const hasPreview = true;
  return `<article class="project-card ${hasPreview ? 'has-preview' : ''} ${project.type || ''} ${project.accent || ''}" data-category="${project.category}"><div class="project-preview">${projectVisual(project)}<span>VECTOR SYSTEM PREVIEW</span></div><div class="project-meta"><span>${project.number}</span><span class="project-category">${project.category}</span></div><div class="project-content"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><button class="project-link project-open" data-project="${project.number}" aria-label="Ver detalhes de ${project.name}">↗</button></article>`;
}

export function renderProjects(grid, projects, filter = 'all') {
  grid.innerHTML = projects.filter(project => filter === 'all' || project.category === filter).map(projectCard).join('');
}
