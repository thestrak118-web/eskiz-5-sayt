(() => {
  'use strict';
  const photos = [...document.querySelectorAll('img[data-src]')];
  const load = image => {
    if (!image.dataset.src) return;
    image.src = image.dataset.src;
    delete image.dataset.src;
  };
  if (!('IntersectionObserver' in window)) {
    photos.forEach(load);
    return;
  }
  // Load on approach after the complete first screen is available. Initial
  // below-fold photos cannot compete with the document on a slow connection.
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      load(entry.target);
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '120px 0px' });
  photos.forEach(image => observer.observe(image));
})();
