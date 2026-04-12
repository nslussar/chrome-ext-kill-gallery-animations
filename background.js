chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["lightbox-override.css", "bxslider-override.css"]
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    world: "MAIN",
    func: applyOverrides
  });
});

function applyOverrides() {
  // Lightbox2
  if (typeof lightbox !== "undefined") {
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

  // bxSlider
  if (typeof jQuery !== "undefined") {
    var sliders = jQuery(".bx-wrapper").find(".bx-viewport > *");
    sliders.each(function () {
      var slider = jQuery(this).data("bxSlider");
      if (!slider) return;
      slider.reloadSlider({
        speed: 0,
        adaptiveHeightSpeed: 0,
        useCSS: false,
        easing: null,
        auto: false
      });
    });
  }
}
