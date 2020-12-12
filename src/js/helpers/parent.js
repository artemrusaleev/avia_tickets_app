export function getParent(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return console.log(el);
}
