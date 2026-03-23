const BASE = new URL(".", document.baseURI).href;

function status(msg) {
  const el = document.getElementById("status");
  if (el) el.textContent = msg;
}

async function loadJSON(path) {
  try {
    const res = await fetch(BASE + path);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("loadJSON", err);
    status(`Fehler Laden: ${err.message}`);
    return null;
  }
}

function getArtikelId() {
  return new URLSearchParams(window.location.search).get("id");
}

function getTpl(id) {
  const tpl = document.getElementById(id);
  if (!(tpl instanceof HTMLTemplateElement)) {
    throw new Error(`Template ${id} fehlt`);
  }
  return tpl.content.firstElementChild.cloneNode(true);
}

function renderListe(liste, artikel, limit) {
  liste.replaceChildren();
  if (!Array.isArray(artikel) || artikel.length === 0) {
    liste.textContent = "Keine Artikel gefunden.";
    return;
  }

  var sliced = artikel;
  if (typeof limit === "number") sliced = artikel.slice(0, limit);
  sliced.forEach(function (a) {
    var card = getTpl("template-artikel-card");
    var link = card.querySelector("a");
    var img = card.querySelector("img");
    var placeholder = card.querySelector(".artikel-image--placeholder");

    if (link) {
      link.href = "artikel.html?id=" + encodeURIComponent(a.id);
      link.textContent = a.titel;
    }
    var imgData = null;
    if (Array.isArray(a.inhalt)) {
      for (var i = 0; i < a.inhalt.length; i++) {
        if (a.inhalt[i].type === "img") { imgData = a.inhalt[i].content; break; }
      }
    }
    if (img && imgData) {
      img.src = imgData;
      img.alt = a.titel;
      img.hidden = false;
      if (placeholder) placeholder.parentNode && placeholder.parentNode.removeChild(placeholder);
    }
    liste.appendChild(card);
  });
}

function formatDatum(datum) {
  return new Date(datum).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

var MAX_SHOWN_ARTIKEL = 3;

function getMaxShown() {
  var fromBody = parseInt(document.body.getAttribute("data-max-articles"), 10);
  if (!isNaN(fromBody) && fromBody > 0) return fromBody;

  try {
    var fromQuery = parseInt(new URLSearchParams(window.location.search).get("max"), 10);
    if (!isNaN(fromQuery) && fromQuery > 0) return fromQuery;
  } catch (e) {
    // ignore
  }

  return MAX_SHOWN_ARTIKEL;
}

async function initHome() {
  status("Lade Home …");
  const liste = document.getElementById("artikel-liste");
  const statCount = document.getElementById("stat-count");
  if (!liste) return;

  const artikel = await loadJSON("data/artikel.json");
  if (!artikel) return;

  if (statCount) statCount.textContent = String(artikel.length);
  const num = getMaxShown();
  const sortiert = [...artikel].sort((a, b) => new Date(b.datum) - new Date(a.datum));
  renderListe(liste, sortiert, num);
  status(`Zeige Top ${Math.min(num, artikel.length)} Artikel.`);
}

async function initThemen() {
  status("Lade Themen …");
  const liste = document.getElementById("artikel-liste");
  const filterNav = document.getElementById("kategorie-filter");
  const statArtikelCount = document.getElementById("stat-artikel-count");
  const statKategorienCount = document.getElementById("stat-kategorien-count");
  const statAutorenCount = document.getElementById("stat-autoren-count");
  if (!liste || !filterNav) return;

  const artikel = await loadJSON("data/artikel.json");
  const authors = await loadJSON("data/authors.json");
  const kategorien = await loadJSON("data/kategorien.json");
  if (!artikel || !authors || !kategorien) return;

  if (statArtikelCount) statArtikelCount.textContent = String(artikel.length);
  if (statKategorienCount) statKategorienCount.textContent = String(kategorien.length);
  if (statAutorenCount) statAutorenCount.textContent = String(authors.length);

  var sortiert = artikel.slice().sort(function(a, b){ return new Date(b.datum) - new Date(a.datum);});
  var maxShown = getMaxShown();

  filterNav.replaceChildren();
  var allBtn = getTpl("template-button");
  allBtn.textContent = "Alle";
  allBtn.classList.add("active");
  allBtn.addEventListener("click", function(){
    renderListe(liste, sortiert, maxShown);
    status("Alle " + artikel.length + " Artikel (Top " + maxShown + " angezeigt)");
  });
  filterNav.appendChild(allBtn);

  kategorien.forEach((k) => {
    const btn = getTpl("template-button");
    btn.textContent = k.name;
    btn.addEventListener("click", function(){
      renderListe(liste, artikel.filter(function(a){return a.kategorie_id === k.id;}), maxShown);
      status(k.name + ": Artikel gefiltert (Top " + maxShown + ")");
    });
    filterNav.appendChild(btn);
  });

  renderListe(liste, sortiert, maxShown);
  status("Themen geladen. Zeige Top " + Math.min(maxShown, artikel.length) + " Artikel.");
}

async function initArtikel() {
  status("Lade Artikel Detail …");
  const container = document.getElementById("artikel-detail");
  if (!container) return;

  const id = getArtikelId();
  if (!id) {
    status("Kein Artikel-ID.");
    container.textContent = "Kein Artikel ausgewählt.";
    return;
  }

  const artikel = await loadJSON("data/artikel.json");
  const authors = await loadJSON("data/authors.json");
  const kategorien = await loadJSON("data/kategorien.json");
  if (!artikel || !authors || !kategorien) return;

  const a = artikel.find(function(x){return x.id === id;});
  if (!a) {
    status("Artikel nicht gefunden.");
    container.textContent = "Artikel nicht gefunden.";
    return;
  }

  var detail = getTpl("template-artikel-detail");
  detail.querySelector("h1").textContent = a.titel;
  var autor = null;
  for (var i = 0; i < authors.length; i++) { if (authors[i].id === a.autor_id) { autor = authors[i]; break; }}
  var kategorie = null;
  for (var j = 0; j < kategorien.length; j++) { if (kategorien[j].id === a.kategorie_id) { kategorie = kategorien[j]; break; }}
  detail.querySelector(".meta").textContent = formatDatum(a.datum) + " · " + (autor ? autor.name : "Unbekannt") + " · " + (kategorie ? kategorie.name : "Keine Kategorie");

  var content = detail.querySelector(".content");
  (a.inhalt || []).forEach(function(block){
    if (block.type === "text") {
      var p = getTpl("template-text");
      p.textContent = block.content;
      content.appendChild(p);
    } else if (block.type === "img") {
      var img = getTpl("template-image").querySelector("img");
      img.src = block.content;
      img.alt = a.titel;
      content.appendChild(img.closest("figure"));
    }
  });

  container.replaceChildren(detail);
  status("Artikel geladen: " + a.titel);
}

var attr = document.body.getAttribute("data-page") || "";
var path = location.pathname.split("/").pop().replace(".html", "") || "";
var seite = attr || path || "index";
if (seite === "mein") seite = "index";

if (seite === "index" || seite === "") initHome();
else if (seite === "themen") initThemen();
else if (seite === "artikel") initArtikel();
