chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["lightbox-override.css"]
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    world: "MAIN",
    func: applyLightboxOverrides
  });
});

function applyLightboxOverrides() {
  if (typeof lightbox === "undefined") {
    alert("Lightbox2 not found on this page.");
    return;
  }

  lightbox.option({ fadeDuration: 0, resizeDuration: 0, imageFadeDuration: 0 });

  document.addEventListener(
    "keydown",
    function (e) {
      if (
        document.getElementById("lightbox").style.display !== "none" &&
        (e.key === "ArrowLeft" || e.key === "ArrowRight")
      ) {
        e.preventDefault();
      }
    },
    true
  );
}
