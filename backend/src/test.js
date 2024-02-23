function berechneMonatlicheRate(kapital, zinsatz, tilgungsdauer) {
  // Zinssatz pro Monat
  const monatlicherZinssatz = zinsatz / 100;

  // Anzahl der Raten
  const anzahlDerRaten = tilgungsdauer;

  // Monatliche Rate berechnen
  const monatlicheRate =
    (kapital * monatlicherZinssatz) /
    (1 - Math.pow(1 + monatlicherZinssatz, -anzahlDerRaten));

  return monatlicheRate;
}

// Beispielaufruf mit den gegebenen Daten
const kapital = 10000;
const zinsatz = 12;
const tilgungsdauer = 12;

const monatlicheRate = berechneMonatlicheRate(kapital, zinsatz, tilgungsdauer);
console.log("Die monatliche Rate beträgt: " + monatlicheRate.toFixed(2));
