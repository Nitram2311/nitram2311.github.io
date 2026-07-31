# ViewTube — YouTube Parallax Website

Eine vollständige, statische Website zum Thema YouTube mit Parallax-Effekten,
Scroll-Animationen und modernem Dark-Design.

---

## 📁 Ordnerstruktur

```
youtube-website/
├── index.html          ← Haupt-HTML (alle Sections)
├── css/
│   └── style.css       ← Gesamtes Styling (Tokens, Layout, Animationen)
├── js/
│   └── main.js         ← Parallax Engine, Cursor, Reveal, Counter
├── assets/             ← Ordner für eigene Bilder/Icons (aktuell leer)
└── README.md           ← Diese Datei
```

---

## ✨ Features

| Feature | Beschreibung |
|---|---|
| **Parallax** | Mehrschichtig: Hero-BG, Grid, Banner, CTA-Section |
| **Custom Cursor** | Roter Dot mit nachfolgenden Ring, skaliert on-hover |
| **Scroll Reveal** | Intersection Observer, gestaffelt mit Delay-Klassen |
| **Animated Counters** | Zahlen zählen hoch wenn sie in den Viewport kommen |
| **Tilt Cards** | Video-Cards reagieren auf Mausbewegung (3D-Tilt) |
| **Marquee** | Endloser Kategorien-Laufband, pausiert on-hover |
| **Sticky Nav** | Wird beim Scrollen opak mit Glasmorphism |
| **Responsive** | Mobile-optimiert ab 560px |
| **Reduced Motion** | Alle Animationen werden respektiert deaktiviert |

---

## 🎨 Design-Tokens

```css
--red:     #FF0000   /* YouTube-Rot, Akzent */
--black:   #0F0F0F   /* Hintergrund */
--dark:    #1A1A1A   /* Karten & Sections */
--dark-2:  #242424   /* Video-Mockups */
--muted:   #717171   /* Nebentexte */
--white:   #FFFFFF   /* Headlines */
```

**Schriften:** Space Grotesk (Display) · Inter (Body)

---

## 🚀 Starten

Einfach `index.html` im Browser öffnen — keine Build-Tools nötig.

Für lokalen Entwicklungsserver (empfohlen für Fonts):
```bash
npx serve .
# oder
python3 -m http.server 8080
```

---

## 🧩 Sections

1. **Hero** — Vollbild-Opener mit Parallax-Hintergrund und animiertem Grid
2. **Stats Band** — Animierte Zähler (2,7 Mrd. Nutzer, 500h/Minute, etc.)
3. **Feature: Algorithmus** — Text + Video-Mockup (Parallax)
4. **Marquee** — Rotierende YouTube-Kategorien
5. **Feature: Monetarisierung** — Reversed Layout
6. **Video Grid** — 6 Trending-Cards mit Tilt-Effekt
7. **Parallax Quote Banner** — "500 Stunden pro Minute"-Statement
8. **Creator Spotlight** — 4 fiktive Creator-Cards
9. **CTA Section** — Call-to-Action mit Parallax-Glow
10. **Footer** — 4-spaltig mit Links

---

## 📝 Anpassen

- **Farben:** CSS-Variablen in `:root` in `style.css` ändern
- **Inhalte:** Direkt in `index.html` bearbeiten
- **Parallax-Stärke:** `data-parallax="0.2"` Wert anpassen (höher = stärkerer Effekt)
- **Neue Sections:** `.reveal`-Klasse für automatische Einblend-Animation nutzen

---

*Fiktive Fan-Website. Nicht offiziell mit YouTube/Google verbunden.*
