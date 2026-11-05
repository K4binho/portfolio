import { projectVisual } from './project-visual.js';
import { icon } from './icon.js';

export function openProject(modal, modalContent, project) {
  const visual = project.cover ? `<img src="./assets/${project.cover}" alt="Imagem do ${project.name}" decoding="async" />` : projectVisual(project, 'modal');
  const downloads = (project.downloads || []).map(({ label, url }) => `<a class="button button-ghost" href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join('');
  modalContent.innerHTML = `<p class="section-kicker">PROJECT ${project.number} / ${project.category}</p><h2>${project.name}</h2><p class="modal-description">${project.detail || project.description}</p><div class="modal-status"><span class="pulse"></span>${project.status || 'Projeto público'}</div><div class="modal-actions"><a class="button button-primary" href="${project.link}" target="_blank" rel="noreferrer">Ver no GitHub ${icon('external')}</a>${project.website ? `<a class="button button-ghost" href="${project.website}" target="_blank" rel="noreferrer">Abrir site ${icon('external')}</a>` : ''}${downloads}</div><div class="modal-visual">${visual}</div>${project.flow ? `<div class="modal-flow">${project.flow.map((step, index) => `<span style="--delay:${index * 90}ms">${step}</span>`).join(`<b>${icon('right')}</b>`)}</div>` : ''}<div class="modal-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
  document.body.classList.add('modal-open');
  if (project.screenshots?.length) {
    const gallery = document.createElement('section');
    gallery.className = 'gallery';
    gallery.setAttribute('aria-label', 'Capturas da roda de atalhos');
    const preview = document.createElement('a');
    preview.className = 'gallery-main';
    preview.target = '_blank';
    preview.rel = 'noopener';
    const image = document.createElement('img');
    preview.append(image);
    const tabs = document.createElement('div');
    tabs.className = 'gallery-thumbs';
    const select = (shot, activeButton) => {
      image.src = './assets/roda-de-ultilidade/' + shot.file;
      preview.href = image.src;
      image.alt = 'Roda de ultilidade na aba ' + shot.label + ', sobre o Porsche GT3 RS';
      for (const button of tabs.children) button.setAttribute('aria-pressed', String(button === activeButton));
    };
    for (const shot of project.screenshots) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'button button-ghost';
      button.textContent = shot.label;
      button.onclick = () => select(shot, button);
      tabs.append(button);
    }
    select(project.screenshots[0], tabs.firstElementChild);
    gallery.append(preview, tabs);
    modalContent.querySelector('.modal-visual').replaceWith(gallery);
  }
  modal.showModal();
}

export function bindModalClose(modal) {
  const close = () => { modal.close(); document.body.classList.remove('modal-open'); };
  document.querySelector('#modal-close').addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  modal.addEventListener('cancel', () => document.body.classList.remove('modal-open'));
}
