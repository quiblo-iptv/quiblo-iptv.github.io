/*
 * Quiblo — the landing page's two pieces of behaviour, and no more than two.
 *
 * Everything here is decoration in the strict sense: the page reads, navigates and downloads
 * with JavaScript switched off. Nothing below creates content, and nothing below is required
 * to reach anything.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

/*
 * The channel grid behind the hero.
 *
 * It fills the hero with empty 16:9 outlines and then lights a few at a time, forever. That is
 * the product's own behaviour: it arrives with an empty catalogue and fills as a playlist
 * loads. The cells are built here rather than written into the HTML because how many fit is a
 * question about the viewport, and a fixed number would be wrong on every screen but one.
 */
function channelGrid() {
  const grid = document.querySelector('.grid');
  if (!grid) return;

  let timer = null;

  function build() {
    // One row past the bottom of the hero, so the fade never reveals an edge.
    const cellWidth = 94;
    const columns = Math.ceil(grid.clientWidth / cellWidth);
    const rows = Math.ceil((window.innerHeight * 0.9) / (cellWidth * 9 / 16));
    const wanted = Math.min(columns * rows, 420);

    if (grid.childElementCount === wanted) return;

    grid.replaceChildren();
    const cells = document.createDocumentFragment();
    for (let i = 0; i < wanted; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cells.appendChild(cell);
    }
    grid.appendChild(cells);

    // A catalogue that is already part-loaded when you arrive, rather than a blank wall that
    // takes several seconds to say anything.
    seed(0.16);
  }

  function seed(fraction) {
    const cells = grid.children;
    for (let i = 0; i < cells.length; i += 1) {
      if (Math.random() < fraction) cells[i].classList.add('is-on');
    }
  }

  /* One pass: a handful come on, a handful go off. Never all at once — a catalogue loads in
   * pieces, and a synchronised pulse would read as a heartbeat rather than as loading. */
  function tick() {
    const cells = grid.children;
    if (!cells.length) return;

    const touches = Math.max(3, Math.round(cells.length * 0.035));
    for (let i = 0; i < touches; i += 1) {
      const cell = cells[Math.floor(Math.random() * cells.length)];
      cell.classList.toggle('is-on', Math.random() < 0.55);
    }
  }

  build();

  // Resizing rebuilds rather than stretches, because the cells are a fixed size on purpose.
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 200);
  });

  if (REDUCED.matches) return;

  function start() {
    if (timer === null) timer = setInterval(tick, 620);
  }
  function stop() {
    clearInterval(timer);
    timer = null;
  }

  // Nothing animates while the tab is in the background, or once the hero has scrolled away.
  // A landing page has no business spending a phone's battery on a picture nobody is looking at.
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  const hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 },
    ).observe(hero);
  } else {
    start();
  }
}

/* Sections rise as they arrive, once each. Unobserved after firing so nothing re-runs on the
 * way back up — a page that re-animates when you scroll upwards feels broken rather than alive. */
function reveal() {
  const items = document.querySelectorAll('.reveal');

  if (REDUCED.matches || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-in'));
    return;
  }

  const watcher = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        watcher.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
  );

  items.forEach((item) => watcher.observe(item));
}

channelGrid();
reveal();

// The mark draws itself once. Added as a class rather than run from here so the whole sequence
// stays in the stylesheet next to the shapes it moves.
document.documentElement.classList.add('is-drawn');
