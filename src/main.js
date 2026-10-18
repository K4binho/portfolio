import { projects, stack } from './data.js';

const grid = document.querySelector('#project-grid');
const stackList = document.querySelector('#stack-list');

function projectCard(project) {
  return `<article class="project-card ${project.type || ''} ${project.accent || ''}" data-category="${project.category}">${project.gallery ? `<div class="project-preview"><img src="./assets/streamhub/streamhub-hero.png" alt="Visão do StreamHub no OBS" /><span>LIVE SYSTEM PREVIEW</span></div>` : ''}<div class="project-meta"><span>${project.number}</span><span class="project-category">${project.category}</span></div><div class="project-content"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><button class="project-link project-open" data-project="${project.number}" aria-label="Ver detalhes de ${project.name}">↗</button></article>`;
}

function renderProjects(filter = 'all') {
  grid.innerHTML = projects.filter(project => filter === 'all' || project.category === filter).map(projectCard).join('');
}

stackList.innerHTML = stack.map((item, index) => `<div class="stack-item"><span>0${index + 1}</span><strong>${item}</strong><i></i></div>`).join('');
renderProjects();

const modal = document.querySelector('#project-modal');
const modalContent = document.querySelector('#modal-content');
function openProject(project) {
  modalContent.innerHTML = `<p class="section-kicker">PROJECT ${project.number} / ${project.category}</p><h2>${project.name}</h2><p class="modal-description">${project.detail || project.description}</p><div class="modal-status"><span class="pulse"></span>${project.status || 'Projeto público'}</div>${project.gallery ? `<div class="gallery"><div class="gallery-main"><button class="gallery-arrow gallery-prev" aria-label="Imagem anterior">←</button><img id="gallery-image" src="./assets/streamhub/${project.gallery[0]}" alt="Interface do ${project.name}" /><button class="gallery-arrow gallery-next" aria-label="Próxima imagem">→</button><span class="gallery-counter" id="gallery-count">1 / ${project.gallery.length}</span></div></div>` : ''}${project.flow ? `<div class="modal-flow">${project.flow.map((step, index) => `<span style="--delay:${index * 90}ms">${step}</span>`).join('<b>→</b>')}</div>` : ''}<div class="modal-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><a class="button button-primary" href="${project.link}" target="_blank" rel="noreferrer">Ver projeto no GitHub ↗</a>`;
  if (project.gallery) {
    let galleryIndex = 0;
    const galleryImage = modalContent.querySelector('#gallery-image');
    const galleryCount = modalContent.querySelector('#gallery-count');
    const updateGallery = (step) => { galleryIndex = (galleryIndex + step + project.gallery.length) % project.gallery.length; galleryImage.classList.remove('gallery-slide'); void galleryImage.offsetWidth; galleryImage.src = `./assets/streamhub/${project.gallery[galleryIndex]}`; galleryImage.classList.add('gallery-slide'); galleryImage.style.setProperty('--zoom', '1'); galleryCount.textContent = `${galleryIndex + 1} / ${project.gallery.length}`; };
    modalContent.querySelector('.gallery-prev').addEventListener('click', () => updateGallery(-1));
    modalContent.querySelector('.gallery-next').addEventListener('click', () => updateGallery(1));
    modalContent.querySelector('.gallery-main').addEventListener('wheel', event => {
      event.preventDefault();
      const galleryMain = event.currentTarget;
      const currentZoom = Number(galleryImage.style.getPropertyValue('--zoom') || 1);
      const nextZoom = Math.min(2.5, Math.max(1, currentZoom + (event.deltaY < 0 ? 0.12 : -0.12)));
      if (nextZoom === 1) {
        galleryImage.style.setProperty('--origin-x', '50%');
        galleryImage.style.setProperty('--origin-y', '50%');
      } else {
        const bounds = galleryMain.getBoundingClientRect();
        const originX = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
        const originY = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));
        galleryImage.style.setProperty('--origin-x', `${originX}%`);
        galleryImage.style.setProperty('--origin-y', `${originY}%`);
      }
      galleryImage.style.setProperty('--zoom', nextZoom.toFixed(2));
    }, { passive: false });
  }
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
