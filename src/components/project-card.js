import { icon } from './icon.js';
import { mountCarousel } from './carousel.js';

export function renderProjects(grid, projects, filter = 'all') {
  const visible = projects.filter(project => filter === 'all' || project.category === filter);
  grid.innerHTML = visible.map(project => `<article class="project-card has-preview ${project.type || ''} ${project.accent || ''}" data-number="${project.number}" data-category="${project.category}"><div class="card-gallery"></div><div class="project-meta"><span>${project.number}</span><span class="project-category">${project.category}</span></div><div class="project-content"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><button class="project-link project-open" aria-label="Ver detalhes de ${project.name}">${icon('external')}</button></article>`).join('');
  visible.forEach((project,i)=>mountCarousel(grid.children[i].querySelector('.card-gallery'), project));
}
