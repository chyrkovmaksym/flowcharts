const HALF_AN_HOUR = 1800000;
const HOUR_OF_DARK = 19;

function applyTheme(themeName) {
  document.querySelector('[title="theme"').setAttribute('href', `styles/${themeName}-theme.css`);
}

function selectTheme() {
  const date = new Date();
  if (date.getHours < HOUR_OF_DARK) {
    applyTheme('light');
  } else {
    applyTheme('dark');
    alert(date.getHours);
  }
  setTimeout(() => selectTheme(), HALF_AN_HOUR);
}

selectTheme();
