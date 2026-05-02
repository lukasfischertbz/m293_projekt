const load = async (p) => {
  const r = await fetch(p);
  if (!r.ok) throw new Error(r.status);
  return r.json();
};
const byDate = (arr) =>
  [...arr].sort((a, b) => new Date(b.datum) - new Date(a.datum));
const firstImg = (inhalt = []) =>
  inhalt.find((b) => b.type === "img")?.content ?? null;

function tpl(id) {
  return document.getElementById(id).content.firstElementChild.cloneNode(true);
}

function makeEl(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

async function showThemen(main, themes) {
  const grid = makeEl('div', 'content');
  themes.forEach(theme => {
    const link = makeEl('a', 'card');
    link.href = `?id=${encodeURIComponent(theme.id)}`;
    const img = makeEl('div', 'card-image');
    img.style.backgroundImage = `url('${theme.image}')`;
    const label = makeEl('div', 'card-label');
    label.textContent = theme.label;
    link.appendChild(img);
    link.appendChild(label);
    grid.appendChild(link);
  });
  main.appendChild(grid);
}

async function showArtikel(main, themaId, themes, artikel) {
  const themaIndex = themes.findIndex((t) => t.id === themaId);
  const gefiltert = byDate(
    artikel.filter((a) => Number(a.kategorie_id) - 1 === themaIndex)
  );

  const back = makeEl('button', 'back-btn');
  back.textContent = '← Zurück';
  back.addEventListener('click', () => history.back());
  main.appendChild(back);

  const titel = makeEl('div', 'label-themen');
  titel.textContent = themes[themaIndex]?.label ?? '';
  main.appendChild(titel);

  const liste = makeEl('ul', 'artikel-liste');

  if (gefiltert.length === 0) {
    const li = makeEl('li');
    li.style.padding = '20px';
    li.textContent = 'Keine Artikel gefunden.';
    liste.appendChild(li);
  } else {
    gefiltert.forEach((a) => {
      const card = tpl('template-artikel-card');
      const href = `artikel.html?id=${encodeURIComponent(a.id)}`;
      const link = card.querySelector('a');
      link.href = href;
      link.textContent = a.titel;
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => { location.href = href; });
      const img = card.querySelector('img');
      const src = firstImg(a.inhalt);
      if (img && src) {
        img.src = src;
        img.alt = a.titel;
        img.hidden = false;
        card.querySelector('.artikel-image--placeholder')?.remove();
      }
      liste.appendChild(card);
    });
  }

  main.appendChild(liste);
}

document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector('.themen-main');
  const [themes, artikel] = await Promise.all([
    load('data/themes.json'),
    load('data/artikel.json'),
  ]);
  const themaId = new URLSearchParams(location.search).get('id');
  if (themaId) {
    await showArtikel(main, themaId, themes, artikel);
  } else {
    await showThemen(main, themes);
  }
});

