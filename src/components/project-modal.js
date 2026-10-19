import { projectVisual } from './project-visual.js';

export function openProject(modal, modalContent, project) {
  modalContent.innerHTML = `<p class="section-kicker">PROJECT ${project.number} / ${project.category}</p><h2>${project.name}</h2><p class="modal-description">${project.detail || project.description}</p><div class="modal-status"><span class="pulse"></span>${project.status || 'Projeto público'}</div><div class="modal-visual">${projectVisual(project, 'modal')}</div>${project.flow ? `<div class="modal-flow">${project.flow.map((step, index) => `<span style="--delay:${index * 90}ms">${step}</span>`).join('<b>→</b>')}</div>` : ''}<div class="modal-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><div class="modal-actions"><a class="button button-primary" href="${project.link}" target="_blank" rel="noreferrer">Ver no GitHub ↗</a>${project.website ? `<a class="button button-ghost" href="${project.website}" target="_blank" rel="noreferrer">Abrir site ↗</a>` : ''}</div>`;
  document.body.classList.add('modal-open');
  modal.showModal();
}

export function bindModalClose(modal) {
  const close = () => { modal.close(); document.body.classList.remove('modal-open'); };
  document.querySelector('#modal-close').addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  modal.addEventListener('cancel', () => document.body.classList.remove('modal-open'));
}
