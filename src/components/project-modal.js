import { mountCarousel } from './carousel.js';
import { icon } from './icon.js';

export function openProject(modal, modalContent, project, initial = 0) {

  const downloads = (project.downloads || []).map(({ label, url }) => `<a class="button button-ghost" href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join('');
  modalContent.innerHTML = `<p class="section-kicker">PROJECT ${project.number} / ${project.category}</p><h2>${project.name}</h2><p class="modal-description">${project.detail || project.description}</p><div class="modal-status"><span class="pulse"></span>${project.status || 'Projeto público'}</div><div class="modal-actions"><a class="button button-primary" href="${project.link}" target="_blank" rel="noreferrer">Ver no GitHub ${icon('external')}</a>${project.website ? `<a class="button button-ghost" href="${project.website}" target="_blank" rel="noreferrer">Abrir site ${icon('external')}</a>` : ''}${downloads}</div><div class="detail-gallery"></div>${project.flow ? `<div class="modal-flow">${project.flow.map((step, index) => `<span style="--delay:${index * 90}ms">${step}</span>`).join(`<b>${icon('right')}</b>`)}</div>` : ''}<div class="modal-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
  document.body.classList.add('modal-open');
  modal.showModal();
  mountCarousel(modalContent.querySelector('.detail-gallery'), project, true, initial);
}

export function bindModalClose(modal) {
  const close = () => { modal.close(); document.body.classList.remove('modal-open'); };
  document.querySelector('#modal-close').addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  modal.addEventListener('cancel', () => document.body.classList.remove('modal-open'));
}
