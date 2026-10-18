import { projects, stack } from './data.js';
import { renderProjects } from './components/project-card.js';
import { bindFilters } from './components/filters.js';
import { bindModalClose, openProject } from './components/project-modal.js';

const grid = document.querySelector('#project-grid');
const modal = document.querySelector('#project-modal');
const modalContent = document.querySelector('#modal-content');
const stackList = document.querySelector('#stack-list');

renderProjects(grid, projects);
stackList.innerHTML = stack.map((item, index) => `<div class="stack-item"><span>0${index + 1}</span><strong>${item}</strong><i></i></div>`).join('');
grid.addEventListener('click', event => { const card = event.target.closest('.project-card'); if (card) openProject(modal, modalContent, projects.find(project => project.number === card.dataset.number || project.number === card.querySelector('.project-meta span')?.textContent)); });
bindModalClose(modal);
bindFilters(document.querySelectorAll('.filter'), filter => renderProjects(grid, projects, filter));

const terminalLine = document.querySelector('#terminal-line');
const terminalMessages = ['$ initializing modular workspace...', '$ loading streamhub/plugin...', '$ oauth broker: ready', '$ rnnoise pipeline: active', '$ deployment manifest: synced'];
let terminalIndex = 0;
setInterval(() => { terminalIndex = (terminalIndex + 1) % terminalMessages.length; terminalLine.textContent = terminalMessages[terminalIndex]; }, 2200);
