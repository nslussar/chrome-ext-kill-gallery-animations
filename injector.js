// ISOLATED world content script — listens for CSS injection requests from MAIN world
document.addEventListener("__ext_inject_css", function (e) {
  var file = e.detail;
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = chrome.runtime.getURL(file);
  document.head.appendChild(link);
});
