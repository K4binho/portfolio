export function bindFilters(buttons, onFilter) {
  buttons.forEach(button => button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    button.classList.add('active');
    onFilter(button.dataset.filter);
  }));
}
