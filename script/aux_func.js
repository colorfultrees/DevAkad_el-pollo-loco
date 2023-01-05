/**
 * Erzeugt eine zufällige Ganzzahl aus einem gegebenen Intervall
 * @param {Number} min Die untere Intervall-Grenze
 * @param {Number} max Die obere Intervall-Grenze
 * @returns Ganzzahl
 */
function calcRandomNumber (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}