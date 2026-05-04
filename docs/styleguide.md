# Styleguide

Farben · Typografie · Abstände · Komponenten · Breakpoints

---

## 01 — Farben

### Hintergrundpalette

| Name | Variable | Hex |
|---|---|---|
| Background | `--bg` | `#1b2838` |
| Surface | `--surface` | `#1e2a3a` |
| Header / Footer | `--header-bg` | `#171d25` |
| Image Placeholder | — | `#2a3f52` |
| Option / Select BG | — | `#243347` |

### Text & Akzent

| Name | Variable | Hex |
|---|---|---|
| Text Primary | `--text` | `#c6d4df` |
| Text Muted | `--text-muted` | `#8fa4b5` |
| Accent | `--accent` | `#66c0f4` |
| White / Titel | — | `#ffffff` |

---

## 02 — Typografie

**Schriftfamilien:** `"Inter", "Segoe UI", system-ui, sans-serif`  
Monospace für Werte & Code: Systemstandard

| Rolle | Größe | Weight | Farbe | Weitere Eigenschaften |
|---|---|---|---|---|
| H1 / Artikel-Titel | `clamp(1.3rem, 3vw, 1.9rem)` | 700 | `#ffffff` | line-height 1.25 |
| H2 | `1.2rem` | 700 | `#ffffff` | — |
| H3 | `1rem` | 700 | `#ffffff` | — |
| Body / Fließtext | `0.95rem` | 400 | `--text` | line-height 1.8 |
| Small / Meta | `0.82rem` | 400 | `--text-muted` | — |
| Label / Rubrik | `0.85rem` | 700 | `--text-muted` | letter-spacing 0.06em |
| Navigation | `0.85rem` | 600 | `--text-muted` | — |
| Footer-Links | `0.85rem` | 600 | `--text-muted` | letter-spacing 0.04em |
| Karten-Titel | `0.9rem` | 600 | `--text` | — |
| Stat-Zahl | `2rem` | 700 | `--accent` | — |
| Stat-Label | `0.75rem` | 600 | `--text-muted` | letter-spacing 0.06em |
| Button | `0.82rem` | 700 | `--header-bg` | letter-spacing 0.08em |

---

## 03 — Abstände & Layout

### Spacing-Token

| Token | Wert | Verwendung |
|---|---|---|
| `--gap` | `16px` | Haupt-Gap (Grid, Padding) |
| `--max-width` | `940px` | Maximale Seitenbreite |
| `padding-sm` | `10–12px` | Innenabstand Karten-Titel |
| `padding-md` | `20px` | Innenabstand Stat-Block, Label |
| `header-padding` | `14px` | Header / Footer vertikal |
| `footer-gap` | `24px` | Abstand Footer-Links |

### Layout-Raster

**Artikel-Liste (`artikel-liste`)**
- Grid: `1fr 1fr` (2-spaltig)
- Erstes Element: `grid-column: 1 / -1` (volle Breite)
- Bild-Ratio Standard: `16 / 9`
- Bild-Ratio erstes Element: `16 / 7`

**Themen-Raster (`.content`)**
- Grid: `repeat(3, 1fr)` (3-spaltig)
- Bild-Ratio: `16 / 9`
- Gap: `--gap`

**Labels (`.page-labels`)**
- Grid: `1fr 1fr` (2-spaltig)
- Gap: `--gap`

---

## 04 — Komponenten

### Header (`.header`)

```
background:  --header-bg  (#171d25)
position:    sticky, top: 0, z-index: 10
padding:     14px --gap
max-width:   --max-width, zentriert
```

Inhalt: Titel links (`font-weight 700, 1.1rem, #fff`), Navigation rechts (`font-size 0.85rem, font-weight 600, color --text-muted`).

---

### Artikel-Karte (`.artikel-card`)

```
background:  --surface  (#1e2a3a)
overflow:    hidden
cursor:      pointer
```

Struktur: Bild-Container (`.artikel-image`, `aspect-ratio 16/9`, `overflow hidden`) → Titel (`.artikel-titel`, `padding 10px 12px`, `font-size 0.9rem`, `font-weight 600`).

---

### Stat-Block (`.label-stat`)

```
background:  --surface
padding:     20px
display:     flex, column, centered
```

Zahl: `font-size 2rem, font-weight 700, color --accent`  
Label: `font-size 0.75rem, font-weight 600, letter-spacing 0.06em, color --text-muted`

---

### Label-Rubrik (`.label-themen`)

```
background:  --surface
padding:     20px
font-weight: 700
font-size:   0.85rem
letter-spacing: 0.04em
```

---

### Themen-Karte (`.card`)

```
background:  --surface
display:     block
```

Bild: `.card-image` — `width 100%, aspect-ratio 16/9, background-size cover`  
Label: `.card-label` — `padding 12px 14px, font-weight 600, font-size 0.9rem`

Kleines Karten-Label (`.card > .card-label`): `font-size 0.72rem, letter-spacing 0.1em, color --text-muted, padding 16px 16px 8px`

---

### Formular-Elemente

```
background:  --bg
color:       --text
font-size:   0.95rem
padding:     11px 13px
border:      none
outline:     none
```

Focus: `box-shadow: 0 0 0 2px --accent`  
Placeholder: `color --text-muted, opacity 0.6`  
Select: Custom Chevron-Icon via `background-image` SVG, `padding-right 38px`  
Textarea: `resize vertical, min-height 120px`

**Submit-Button:**
```
background:  --accent  (#66c0f4)
color:       --header-bg  (#171d25)
font-weight: 700
font-size:   0.82rem
letter-spacing: 0.08em
padding:     12px 22px
border:      none
align-self:  flex-start
```

---

### Footer (`.footer`)

```
background:  --footer-bg  (#171d25)
padding:     14px --gap
display:     flex, justify-content center
gap:         24px
```

Links: `color --text-muted, font-weight 600, font-size 0.85rem, letter-spacing 0.04em`

---

### Artikel-Detail (`.artikel-detail`)

```
max-width:  680px
```

H1: `clamp(1.3rem, 3vw, 1.9rem), font-weight 700, color #fff, line-height 1.25, margin-bottom 10px`  
Meta: `font-size 0.82rem, color --text-muted, margin-bottom 24px`  
Content: `flex, column, gap 16px` — Paragraphen: `line-height 1.8`

---

## 05 — Breakpoints

| Name | Breite | Änderungen |
|---|---|---|
| **Mobile** | `≤ 600px` | Artikel-Liste 1-spaltig · Content 1-spaltig · Bild-Ratio 16/9 (kein Override) · Nav-Schrift 0.78rem, padding 6px 8px |
| **Tablet** | `601px – 860px` | Content 2-spaltig · Artikel-Liste 2-spaltig · Bild-Ratio 16/8 (erstes Element) · Stat-Zahl 1.6rem · Nav-padding 6px 10px · Inputs: font-size 1rem, padding 13px 15px · Button: align-self stretch |
| **Desktop** | `≥ 861px` | Content 3-spaltig |

---

## 06 — CSS Custom Properties (Übersicht)

```css
:root {
  --bg:         #1b2838;   /* Seitenhintergrund          */
  --surface:    #1e2a3a;   /* Karten / Blöcke            */
  --header-bg:  #171d25;   /* Header & Footer            */
  --footer-bg:  #171d25;   /* Footer (identisch)         */
  --text:       #c6d4df;   /* Primärtext                 */
  --text-muted: #8fa4b5;   /* Sekundärtext / Labels      */
  --accent:     #66c0f4;   /* Akzentfarbe / Links        */
  --gap:        16px;      /* Standard-Abstand           */
  --max-width:  940px;     /* Maximale Contentbreite     */
}
```
