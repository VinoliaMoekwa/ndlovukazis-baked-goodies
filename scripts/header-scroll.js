// Keep the homepage header transparent until it reaches the next section.
(() => {
  const header = document.querySelector('.home-page .header');
  const hero = document.querySelector('.home-page .hero');
  if (!header || !hero) return;

  let scheduled = false;
  const updateHeader = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    header.classList.toggle('is-scrolled', heroBottom <= header.offsetHeight);
    scheduled = false;
  };

  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateHeader);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  updateHeader();
})();
