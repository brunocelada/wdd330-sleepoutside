// wrapper for querySelector to make things less typing
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a querySelector all
export function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to localstorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// helper to get parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// helper to render a list using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}