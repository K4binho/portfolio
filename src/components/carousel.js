import { galleries } from '../project-media.js';

export function mountCarousel(host, project, expanded = false, initial = 0) {
  const slides = galleries[project.number];
  if (!slides?.length) return;
  host.classList.add('project-carousel');
  host.tabIndex = 0;
  host.setAttribute('role', 'region');
  host.setAttribute('aria-roledescription', 'carrossel');
  host.setAttribute('aria-label', 'Imagens de ' + project.name);
  const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m14.5 5-7 7 7 7"/></svg>';
  host.innerHTML = `<div class="slide-stage"><div class="slides"></div>${slides.length > 1 ? `<div class="slide-nav"><button class="slide-prev" type="button" aria-label="Imagem anterior">${chevron}</button><button class="slide-next" type="button" aria-label="Próxima imagem">${chevron}</button></div>` : ''}</div><div class="slide-caption" aria-live="polite"><strong></strong><small></small></div>`;
  const track = host.querySelector('.slides');
  for (const [label, file] of slides) {
    const frame = document.createElement(expanded ? 'a' : 'div');
    const img = new Image();
    img.src = './assets/' + file;
    img.alt = project.name + ' — ' + label;
    img.loading = 'lazy';
    if (expanded) {
      frame.href = img.src;
      frame.target = '_blank';
      frame.rel = 'noopener';
    }
    frame.append(img);
    track.append(frame);
  }
  const buttons = host.querySelectorAll('.slide-nav button');
  function update(index) {
    host.dataset.slide = String(index);
    host.querySelector('strong').textContent = slides[index][0];
    host.querySelector('small').textContent = (index + 1) + ' / ' + slides.length;
    for (const [i, frame] of [...track.children].entries()) {
      if (expanded) frame.tabIndex = i === index ? 0 : -1;
    }
  }
  const go = (index, animated = true) => {
    const next = (index + slides.length) % slides.length;
    track.scrollTo({left: next * track.clientWidth, behavior: animated && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant'});
    update(next);
  };
  buttons.forEach((button, i) => button.onclick = event => {
    event.stopPropagation();
    go(Number(host.dataset.slide) + (i ? 1 : -1));
  });
  host.onkeydown = event => {
    if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    go(Number(host.dataset.slide) + (event.key === 'ArrowRight' ? 1 : -1));
  };
  track.onscrollend = () => update(Math.min(slides.length-1, Math.round(track.scrollLeft / (track.clientWidth || 1))));
  update(initial);
  if(initial) requestAnimationFrame(()=>go(initial, false));
}
