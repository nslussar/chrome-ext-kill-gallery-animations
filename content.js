function injectCSS(file) {
  document.dispatchEvent(new CustomEvent("__ext_inject_css", { detail: file }));
}

// Lightbox2
if (typeof lightbox !== "undefined") {
  injectCSS("lightbox-override.css");
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

  // Cmd-click on gallery thumbnails opens the linked image in a new tab
  // (overriding lightbox2 which normally hijacks all clicks on these links)
  document.querySelectorAll('a[data-lightbox]').forEach(function (link) {
    link.addEventListener(
      "click",
      function (e) {
        if (e.metaKey) {
          e.stopImmediatePropagation();
        }
      },
      true
    );
  });
}

// ModuloBox — kill spring animations by setting friction/attraction to 1 (instant snap)
if (typeof ModuloBox !== "undefined") {
  injectCSS("modulobox-override.css");
  var holder = document.querySelector(".mobx-holder");
  if (holder && holder.GUID) {
    var mbx = new ModuloBox();
    var patchAnimate = function (anim) {
      if (!anim) return;
      anim.forces.friction = 1;
      anim.forces.attraction = 1;
    };
    patchAnimate(mbx.slider);
    if (mbx.cells) {
      for (var i = 0; i < mbx.cells.length; i++) {
        patchAnimate(mbx.cells[i]);
      }
    }
    patchAnimate(mbx.thumbs);
  }
}

// bxSlider
if (typeof jQuery !== "undefined" && jQuery(".bx-wrapper").length) {
  injectCSS("bxslider-override.css");
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
