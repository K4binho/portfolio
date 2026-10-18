import { projects, stack } from './data.js';

const grid = document.querySelector('#project-grid');
const stackList = document.querySelector('#stack-list');

function projectCard(project) {
  return `<article class="project-card ${project.type || ''} ${project.accent || ''}" data-category="${project.category}"><div class="project-meta"><span>${project.number}</span><span class="project-category">${project.category}</span></div><div class="project-content"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><button class="project-link project-open" data-project="${project.number}" aria-label="Ver detalhes de ${project.name}">↗</button></article>`;
}

function renderProjects(filter = 'all') {
  grid.innerHTML = projects.filter(project => filter === 'all' || project.category === filter).map(projectCard).join('');
}

stackList.innerHTML = stack.map((item, index) => `<div class="stack-item"><span>0${index + 1}</span><strong>${item}</strong><i></i></div>`).join('');
renderProjects();

const modal = document.querySelector('#project-modal');
const modalContent = document.querySelector('#modal-content');
function openProject(project) {
  modalContent.innerHTML = `<p class="section-kicker">PROJECT ${project.number} / ${project.category}</p><h2>${project.name}</h2><p class="modal-description">${project.detail || project.description}</p><div class="modal-status"><span class="pulse"></span>${project.status || 'Projeto público'}</div>${project.gallery ? `<div class="gallery"><div class="gallery-main"><img id="gallery-image" src="./assets/streamhub/${project.gallery[0]}" alt="Interface do ${project.name}" /></div><div class="gallery-thumbs">${project.gallery.map((image, index) => `<button class="gallery-thumb ${index === 0 ? 'active' : ''}" data-image="./assets/streamhub/${image}"><img src="./assets/streamhub/${image}" alt="Ver captura ${index + 1}" /></button>`).join('')}</div></div>` : ''}${project.flow ? `<div class="modal-flow">${project.flow.map((step, index) => `<span style="--delay:${index * 90}ms">${step}</span>`).join('<b>→</b>')}</div>` : ''}<div class="modal-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><a class="button button-primary" href="${project.link}" target="_blank" rel="noreferrer">Ver projeto no GitHub ↗</a>`;
  modalContent.querySelectorAll('.gallery-thumb').forEach(button => button.addEventListener('click', () => { modalContent.querySelector('#gallery-image').src = button.dataset.image; modalContent.querySelector('.gallery-thumb.active')?.classList.remove('active'); button.classList.add('active'); }));
  modal.showModal();
}
grid.addEventListener('click', event => { const button = event.target.closest('.project-open'); if (button) openProject(projects.find(project => project.number === button.dataset.project)); });
document.querySelector('#modal-close').addEventListener('click', () => modal.close());

const terminalLine = document.querySelector('#terminal-line');
const terminalMessages = ['$ initializing modular workspace...', '$ loading streamhub/plugin...', '$ oauth broker: ready', '$ rnnoise pipeline: active', '$ deployment manifest: synced'];
let terminalIndex = 0;
setInterval(() => { terminalIndex = (terminalIndex + 1) % terminalMessages.length; terminalLine.textContent = terminalMessages[terminalIndex]; }, 2200);

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active')?.classList.remove('active');
  button.classList.add('active');
  renderProjects(button.dataset.filter);
}));
