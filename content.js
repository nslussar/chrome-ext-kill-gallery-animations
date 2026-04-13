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

  // Permanently override getThumbHeight so the sizing math
  // uses the full viewport height (thumbs bar is hidden via CSS).
  ModuloBox.prototype.getThumbHeight = function () { return 0; };

  // Override getCaptionHeight to use full slider dimensions.
  // Original subtracts topBar & caption height; we skip it entirely
  // to avoid its unnecessary DOM reads/writes (innerHTML, clientHeight).
  ModuloBox.prototype.getCaptionHeight = function (media, slide) {
    slide.width = this.slider.width;
    slide.height = this.slider.height;
  };

  // Override setMediaOffset to center without topBar offset
  ModuloBox.prototype.setMediaOffset = function (media, slide) {
    var size = media.dom.size;
    media.dom.offset = {
      top: size.height <= slide.height ? Math.round((slide.height - size.height) * 0.5) : 0,
      left: Math.round((slide.width - size.width) * 0.5)
    };
    media.dom.viewport = {
      width: this.slider.width,
      height: this.slider.height
    };
  };
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
