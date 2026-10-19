import { icon } from './icon.js';

export function projectCard(project) {
  const hasPreview = Boolean(project.cover);
  const preview = hasPreview ? `<div class="project-preview"><img src="./assets/${project.cover}" alt="Preview do ${project.name}" /><span>PROJECT PREVIEW</span></div>` : '';
  return `<article class="project-card ${hasPreview ? 'has-preview' : ''} ${project.type || ''} ${project.accent || ''}" data-category="${project.category}">${preview}<div class="project-meta"><span>${project.number}</span><span class="project-category">${project.category}</span></div><div class="project-content"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><button class="project-link project-open" data-project="${project.number}" aria-label="Ver detalhes de ${project.name}">${icon('external')}</button></article>`;
}

export function renderProjects(grid, projects, filter = 'all') {
  grid.innerHTML = projects.filter(project => filter === 'all' || project.category === filter).map(projectCard).join('');
}
