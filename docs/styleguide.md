# Styleguide – MeinBlog

---

## Farben

| Name           | Hex       | Verwendung                    |
|----------------|-----------|-------------------------------|
| Background     | `#0f1117` | Seitenhintergrund             |
| Surface        | `#1a1d27` | Artikelkarten, Header, Footer |
| Border         | `#2a2d3a` | Trennlinien, Ränder           |
| Text Primary   | `#e8eaf0` | Fließtext, Überschriften      |
| Text Secondary | `#8b8fa8` | Datum, Autor, Kategorie       |
| Accent         | `#4caf82` | Links, „Weiterlesen"          |
| Accent Hover   | `#6fcba0` | Links beim Hovern             |

---

## Typografie

### Schriftfamilie

| Rolle       | Schrift    | Fallback     |
|-------------|------------|--------------|
| Überschrift | `'Inter'`  | `sans-serif` |
| Fließtext   | `'Inter'`  | `sans-serif` |

### Schriftgrößen

| Name   | Größe      | Verwendung        |
|--------|------------|-------------------|
| `sm`   | `0.875rem` | Datum, Autor      |
| `base` | `1rem`     | Artikeltext       |
| `xl`   | `1.5rem`   | Artikeltitel (H3) |
| `2xl`  | `2rem`     | Sektionsüberschrift (H2) |
| `3xl`  | `2.75rem`  | Seitentitel (H1)  |

### Schriftgewichte

| Name     | Wert  | Verwendung              |
|----------|-------|-------------------------|
| Regular  | `400` | Artikeltext, Excerpt    |
| Medium   | `500` | Navigation              |
| Bold     | `700` | H1, H2, Artikeltitel    |

### Zeilenabstand

| Kontext      | Wert  |
|--------------|-------|
| Überschriften | `1.2` |
| Artikeltext  | `1.7` |

---

## Abstände

Alle Abstände basieren auf einem **8px-Raster**:

| Name  | Wert   | Verwendung                      |
|-------|--------|---------------------------------|
| `sm`  | `8px`  | Innenabstand Tags, Datum        |
| `md`  | `16px` | Abstand zwischen Textelementen  |
| `lg`  | `24px` | Abstand zwischen Artikeln       |
| `xl`  | `32px` | Sektionsabstand                 |
| `2xl` | `48px` | Header/Footer-Padding           |

---

## Radien

| Name   | Wert    | Verwendung              |
|--------|---------|-------------------------|
| `sm`   | `4px`   | Datum-Badge, Tags       |
| `md`   | `8px`   | Artikelkarten           |
| `lg`   | `12px`  | Header, Footer          |

---

## Breakpoints

Ein einziger Styleguide – das Layout passt sich per CSS an:

| Name    | Ab Breite | Beschreibung              |
|---------|-----------|---------------------------|
| Mobile  | `0px`     | Standard, 1 Spalte        |
| Tablet  | `768px`   | 2 Spalten Artikelliste    |
| Desktop | `1024px`  | Max-Width, mehr Padding   |

```css
/* Mobile first – ohne Media Query */
#artikel-liste { columns: 1; }

/* Tablet */
@media (min-width: 768px) {
    #artikel-liste { columns: 2; }
}

/* Desktop */
@media (min-width: 1024px) {
    main { max-width: 1200px; margin-inline: auto; }
}
```

---

## CSS Custom Properties

```css
:root {
    /* Farben */
    --color-bg:             #0f1117;
    --color-surface:        #1a1d27;
    --color-border:         #2a2d3a;
    --color-text-primary:   #e8eaf0;
    --color-text-secondary: #8b8fa8;
    --color-accent:         #4caf82;
    --color-accent-hover:   #6fcba0;

    /* Typografie */
    --font-sans: 'Inter', sans-serif;

    --text-sm:   0.875rem;
    --text-base: 1rem;
    --text-xl:   1.5rem;
    --text-2xl:  2rem;
    --text-3xl:  2.75rem;

    /* Abstände */
    --space-sm:  8px;
    --space-md:  16px;
    --space-lg:  24px;
    --space-xl:  32px;
    --space-2xl: 48px;

    /* Radien */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
}
```
