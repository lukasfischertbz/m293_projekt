const $ = (id) => document.getElementById(id);
const tpl = (id) =>
  document.getElementById(id).content.firstElementChild.cloneNode(true);
const fmt = (d) =>
  new Date(d).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
const load = async (p) => {
  const r = await fetch(p);
  if (!r.ok) throw new Error(r.status);
  return r.json();
};
const byDate = (arr) =>
  [...arr].sort((a, b) => new Date(b.datum) - new Date(a.datum));
const firstImg = (inhalt = []) =>
  inhalt.find((b) => b.type === "img")?.content ?? null;

const artikel = await load("data/artikel.json");
const el = $("stat-count");
if (el) el.textContent = artikel.length;

const liste = $("artikel-liste");
if (liste) {
  liste.replaceChildren(
    ...byDate(artikel)
      .slice(0, 3)
      .map((a) => {
        const card = tpl("template-artikel-card");
        const href = `artikel.html?id=${encodeURIComponent(a.id)}`;
        const link = card.querySelector("a");
        const img = card.querySelector("img");
        const src = firstImg(a.inhalt);
        link.href = href;
        link.textContent = a.titel;
        card.style.cursor = "pointer";
        card.addEventListener("click", () => { location.href = href; });
        if (img && src) {
          img.src = src;
          img.alt = a.titel;
          img.hidden = false;
          card.querySelector(".artikel-image--placeholder")?.remove();
        }
        return card;
      }),
  );
}

const container = $("artikel-detail");
if (container) {
  const id = new URLSearchParams(location.search).get("id");
  const [authors, kategorien] = await Promise.all([
    load("data/authors.json"),
    load("data/kategorien.json"),
  ]);
  const a = artikel.find((x) => x.id === id);
  if (!a) {
    container.textContent = "Nicht gefunden.";
  } else {
    const detail = tpl("template-artikel-detail");
    detail.querySelector("h1").textContent = a.titel;
    detail.querySelector(".meta").textContent =
      `${fmt(a.datum)} · ${authors.find((x) => x.id === a.autor_id)?.name ?? "Unbekannt"} · ${kategorien.find((x) => x.id === a.kategorie_id)?.name ?? "–"}`;
    const content = detail.querySelector(".content");
    (a.inhalt ?? []).forEach((block) => {
      if (block.type === "text") {
        const p = tpl("template-text");
        p.textContent = block.content;
        content.appendChild(p);
      }
      if (block.type === "img") {
        const fig = tpl("template-image");
        fig.querySelector("img").src = block.content;
        fig.querySelector("img").alt = a.titel;
        content.appendChild(fig);
      }
      if (block.type === "video") {
        const wrap = tpl("template-video");
        wrap.querySelector("iframe").src = block.content;
        wrap.querySelector("iframe").title = a.titel;
        content.appendChild(wrap);
      }
    });
    container.replaceChildren(detail);
  }
}
