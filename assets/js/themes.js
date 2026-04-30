// assets/js/themes.js

const THEME_ARTICLES = {
  fotografie: '2',
  musik: '3',
  sport: '4',
};

const loadJson = async (path) => {
  const url = new URL(path, location.origin).href;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const setStatus = (text) => {
  const status = document.getElementById('theme-status');
  if (status) status.textContent = text;
};

const renderArticles = (articles) => {
  const list = document.getElementById('theme-articles');
  if (!list) return;

  list.replaceChildren(
    ...articles.map((article) => {
      const item = document.createElement('li');
      item.className = 'artikel-card';

      const title = document.createElement('div');
      title.className = 'artikel-title';

      const link = document.createElement('a');
      link.href = `/artikel.html?id=${encodeURIComponent(article.id)}`;
      link.textContent = article.titel;

      title.appendChild(link);
      item.appendChild(title);
      return item;
    }),
  );

  if (articles.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Keine Artikel zu diesem Thema gefunden.';
    empty.style.padding = '16px 12px';
    list.appendChild(empty);
  }
};

const showThemeResult = async (theme) => {
  const themeId = theme.id;
  const categoryId = THEME_ARTICLES[themeId];
  if (!categoryId) {
    setStatus('Unbekanntes Thema.');
    return;
  }

  try {
    setStatus(`Suche Artikel für ${theme.label}...`);
    const artikel = await loadJson('/data/artikel.json');

    const filtered = (artikel || []).filter((a) => a.kategorie_id === categoryId);
    renderArticles(filtered);
    setStatus(`Gefundene Artikel für ${theme.label}: ${filtered.length}`);

    const resultSection = document.getElementById('theme-result');
    const themeList = document.getElementById('theme-list');
    if (resultSection && themeList) {
      resultSection.hidden = false;
      themeList.hidden = true;
    }
  } catch (error) {
    console.error('Fehler beim Laden der Artikel:', error);
    setStatus('Artikel konnten nicht geladen werden.');
  }
};

const resetThemeView = () => {
  const resultSection = document.getElementById('theme-result');
  const themeList = document.getElementById('theme-list');
  if (resultSection && themeList) {
    resultSection.hidden = true;
    themeList.hidden = false;
    setStatus('Wähle ein Thema aus, um die Artikel anzuzeigen.');
  }
};

const attachThemeClickHandlers = () => {
  const themeCards = document.querySelectorAll('.card[data-theme-id]');
  themeCards.forEach((card) => {
    const themeId = card.dataset.themeId;
    const labelEl = card.querySelector('.card-label');
    const theme = {
      id: themeId,
      label: labelEl ? labelEl.textContent.trim() : themeId,
    };
    card.addEventListener('click', () => showThemeResult(theme));
  });
};

async function loadThemes() {
  attachThemeClickHandlers();
  setStatus('Wähle ein Thema aus, um die Artikel anzuzeigen.');

  try {
    const themes = await loadJson('/data/themes.json');
    const themeCards = document.querySelectorAll('.card[data-theme-id]');
    themeCards.forEach((card) => {
      const themeId = card.dataset.themeId;
      const theme = themes.find((item) => item.id === themeId);
      if (theme) {
        const cardImage = card.querySelector('.card-image');
        const label = card.querySelector('.card-label');
        if (cardImage && theme.image) {
          cardImage.style.backgroundImage = `url('${theme.image}')`;
        }
        if (label && theme.label) {
          label.textContent = theme.label;
        }
      }
    });
  } catch (error) {
    console.warn('Themen-Daten konnten nicht geladen werden, verwende statische Karten.', error);
  }

  const backButton = document.getElementById('back-to-themes');
  if (backButton) backButton.addEventListener('click', resetThemeView);
}

// Themen laden, wenn die Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', loadThemes);
