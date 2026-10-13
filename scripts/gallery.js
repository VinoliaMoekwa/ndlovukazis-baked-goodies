(() => {
  const gallery = document.querySelector('.bakery-gallery');
  if (!gallery) return;
  const cards = [...gallery.querySelectorAll('.bakery-gallery-photo')];
  const dialog = gallery.querySelector('dialog');
  const image = dialog.querySelector('.bakery-gallery-full-image');
  let selected = 0;
  let trigger;
  let previousOverflow;

  const render = () => {
    const card = cards[selected];
    const original = card.querySelector('img');
    image.src = original.getAttribute('src');
    image.alt = original.alt;
    dialog.querySelector('.bakery-gallery-title').textContent = card.dataset.title;
    dialog.querySelector('.bakery-gallery-price').textContent = card.dataset.price;
    dialog.querySelector('.bakery-gallery-counter').textContent = `${selected + 1} / ${cards.length}`;
  };
  const move = direction => {
    selected = (selected + direction + cards.length) % cards.length;
    render();
  };
  cards.forEach((card, index) => card.addEventListener('click', () => {
    selected = index;
    trigger = card;
    render();
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }));
  dialog.querySelector('.bakery-gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.bakery-gallery-prev').addEventListener('click', () => move(-1));
  dialog.querySelector('.bakery-gallery-next').addEventListener('click', () => move(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    trigger?.focus();
  });
})();
