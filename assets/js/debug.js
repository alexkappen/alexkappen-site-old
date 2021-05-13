// Determine which element was clicked in the document
document.addEventListener("click", (e) => {
  e = e || window.event;
  let target = e.target;
  let text = target.textContent || target.innerHTML;
  console.log(`Target: ${target}`);
  console.log(`Inner HTML: ${text}`);
}, false);