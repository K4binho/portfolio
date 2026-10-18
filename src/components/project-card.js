export function projectCard(project) {
  return `<article class="project-card ${project.type || ''} ${project.accent || ''}" data-category="${project.category}">${project.cover ? `<div class="project-preview"><img src="./assets/${project.cover}" alt="Capa do ${project.name}" /><span>PRODUCT PREVIEW</span></div>` : project.gallery ? `<div class="project-preview"><img src="./assets/streamhub/streamhub-hero.png" alt="Visão do StreamHub no OBS" /><span>LIVE SYSTEM PREVIEW</span></div>` : ''}<div class="project-meta"><span>${project.number}</span><span class="project-category">${project.category}</span></div><div class="project-content"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><button class="project-link project-open" data-project="${project.number}" aria-label="Ver detalhes de ${project.name}">↗</button></article>`;
}

export function renderProjects(grid, projects, filter = 'all') {
  grid.innerHTML = projects.filter(project => filter === 'all' || project.category === filter).map(projectCard).join('');
}
