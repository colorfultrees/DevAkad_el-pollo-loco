/**
 * Erzeugt eine zufällige Ganzzahl aus einem gegebenen Intervall
 * @param {Number} min Die untere Intervall-Grenze
 * @param {Number} max Die obere Intervall-Grenze
 * @returns Ganzzahl
 */
function calcRandomNumber (min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}