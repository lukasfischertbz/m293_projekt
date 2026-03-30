// assets/js/themes.js

async function loadThemes() {
  try {
    // JSON-Datei laden (root-relative, so bleibt korrekt bei /themes)
    const response = await fetch('/data/themes.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const themes = await response.json();
    
    // Container für die Karten
    const content = document.querySelector('.content');
    
    // Existierende Karten entfernen (optional, falls du die Placeholder behalten möchtest)
    content.innerHTML = '';
    
    // Für jedes Thema eine Karte erstellen
    themes.forEach(theme => {
      const card = document.createElement('section');
      card.className = 'card';
      
      const cardImage = document.createElement('div');
      cardImage.className = 'card-image';
      cardImage.style.backgroundImage = `url('${theme.image}')`;
      
      const cardLabel = document.createElement('div');
      cardLabel.className = 'card-label';
      cardLabel.textContent = theme.label;
      
      card.appendChild(cardImage);
      card.appendChild(cardLabel);
      content.appendChild(card);
    });
    
  } catch (error) {
    console.error('Fehler beim Laden der Themen:', error);
  }
}

// Themen laden, wenn die Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', loadThemes);
