(() => {
  const products = document.querySelector('.baked-goods');
  const toggle = document.querySelector('.product-photo-toggle');
  if (!products || !toggle) return;
  toggle.addEventListener('click', () => {
    const paused = products.classList.toggle('photos-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Play photos' : 'Pause photos';
  });
})();
