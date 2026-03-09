/**
 * main.js
 * Lädt JSON-Daten und rendert Artikel je nach Seite.
 */

const BASE = new URL(".", document.baseURI).href;

async function loadJSON(path) {
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error(`Fehler beim Laden: ${path}`);
  return res.json();
}

function getArtikelId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderArtikelKarte(artikel, autor, kategorie) {
  const li = document.createElement("li");
  li.setAttribute("role", "listitem");

  li.innerHTML = `
    <article>
      <header>
        <h3><a href="artikel.html?id=${artikel.id}">${artikel.titel}</a></h3>
        <p>
          <time datetime="${artikel.datum}">${formatDatum(artikel.datum)}</time>
          · <span>${autor ? autor.name : "Unbekannt"}</span>
          · <span>${kategorie ? kategorie.name : "Keine Kategorie"}</span>
        </p>
      </header>
    </article>
  `;

  return li;
}

function formatDatum(datum) {
  return new Date(datum).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

async function initHome() {
  const liste = document.getElementById("artikel-liste");
  if (!liste) return;

  const [artikel, authors, kategorien] = await Promise.all([
    loadJSON("data/artikel.json"),
    loadJSON("data/authors.json"),
    loadJSON("data/kategorien.json"),
  ]);

  // Neueste zuerst
  const sortiert = [...artikel].sort((a, b) => new Date(b.datum) - new Date(a.datum));

  for (const a of sortiert) {
    const autor = authors.find((au) => au.id === a.autor_id);
    const kategorie = kategorien.find((k) => k.id === a.kategorie_id);
    liste.appendChild(renderArtikelKarte(a, autor, kategorie));
  }
}

async function initThemen() {
  const liste = document.getElementById("artikel-liste");
  const filterNav = document.getElementById("kategorie-filter");
  if (!liste || !filterNav) return;

  const [artikel, authors, kategorien] = await Promise.all([
    loadJSON("data/artikel.json"),
    loadJSON("data/authors.json"),
    loadJSON("data/kategorien.json"),
  ]);

  // Kategorien-Buttons rendern
  for (const k of kategorien) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = k.name;
    btn.dataset.kategorie = k.id;
    btn.setAttribute("aria-pressed", "false");
    li.appendChild(btn);
    filterNav.appendChild(li);
  }

  function renderListe(filter = "alle") {
    liste.innerHTML = "";
    const gefiltert = filter === "alle"
      ? artikel
      : artikel.filter((a) => a.kategorie_id === filter);

    for (const a of gefiltert) {
      const autor = authors.find((au) => au.id === a.autor_id);
      const kategorie = kategorien.find((k) => k.id === a.kategorie_id);
      liste.appendChild(renderArtikelKarte(a, autor, kategorie));
    }
  }

  renderListe();

  filterNav.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    filterNav.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    renderListe(btn.dataset.kategorie);
  });
}

async function initArtikel() {
  const container = document.getElementById("artikel-detail");
  if (!container) return;

  const id = getArtikelId();
  if (!id) {
    container.innerHTML = "<p>Kein Artikel ausgewählt.</p>";
    return;
  }

  const [artikel, authors, kategorien] = await Promise.all([
    loadJSON("data/artikel.json"),
    loadJSON("data/authors.json"),
    loadJSON("data/kategorien.json"),
  ]);

  const a = artikel.find((art) => art.id === id);
  if (!a) {
    container.innerHTML = "<p>Artikel nicht gefunden.</p>";
    return;
  }

  const autor = authors.find((au) => au.id === a.autor_id);
  const kategorie = kategorien.find((k) => k.id === a.kategorie_id);

  // Inhalt-Blöcke rendern
  const inhaltsHTML = a.inhalt
    .map((block) => {
      if (block.type === "text") return `<p>${block.content}</p>`;
      if (block.type === "img") return `<figure><img src="${block.content}" alt="" /></figure>`;
      return "";
    })
    .join("");

  container.innerHTML = `
    <header>
      <h1>${a.titel}</h1>
      <p>
        <time datetime="${a.datum}">${formatDatum(a.datum)}</time>
        · <span>${autor ? autor.name : "Unbekannt"}</span>
        · <span>${kategorie ? kategorie.name : "Keine Kategorie"}</span>
      </p>
      <p><a href="themen.html">← Zurück zu Themen</a></p>
    </header>
    <section>${inhaltsHTML}</section>
  `;

  // Seitentitel anpassen
  document.title = `Blog – ${a.titel}`;
}

// Seite erkennen und initialisieren
const seite = document.body.closest("[data-page]")?.dataset.page
  ?? location.pathname.split("/").pop().replace(".html", "") || "index";

if (seite === "index" || seite === "") initHome();
else if (seite === "themen") initThemen();
else if (seite === "artikel") initArtikel();
