"use strict";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function loadCSS(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

if (isMobile) {
  loadCSS("assets/css/mobile.css");
} else {
  loadCSS("assets/css/desktop.css");
}
