export function di(id) {
  return document.getElementById(id);
}
export function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
