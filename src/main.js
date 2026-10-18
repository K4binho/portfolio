import { projects, stack } from './data.js';

const grid = document.querySelector('#project-grid');
const stackList = document.querySelector('#stack-list');

function projectCard(project) {
  return `<article class="project-card ${project.type || ''} ${project.accent || ''}" data-category="${project.category}"><div class="project-meta"><span>${project.number}</span><span class="project-category">${project.category}</span></div><div class="project-content"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><a class="project-link" href="${project.link}" target="_blank" rel="noreferrer" aria-label="Abrir ${project.name} no GitHub">↗</a></article>`;
}

function renderProjects(filter = 'all') {
  grid.innerHTML = projects.filter(project => filter === 'all' || project.category === filter).map(projectCard).join('');
}

stackList.innerHTML = stack.map((item, index) => `<div class="stack-item"><span>0${index + 1}</span><strong>${item}</strong><i></i></div>`).join('');
renderProjects();

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active')?.classList.remove('active');
  button.classList.add('active');
  renderProjects(button.dataset.filter);
}));
