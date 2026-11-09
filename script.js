(function () {
  "use strict";

  var YT_VIDEO_ID = "vxCpG8kWuxA";
  var STORAGE_KEY = "wolf3dbunker-muted";

  var audio = document.getElementById("bgm");
  var muteBtn = document.getElementById("mute");
  var hint = document.getElementById("sound-hint");

  var source = null;
  var ytPlayer = null;
  var ytReady = false;
  var ytPlaying = false;
  var muted = readMuted();

  function readMuted() {
    try { return localStorage.getItem(STORAGE_KEY) === "1"; } catch (e) { return false; }
  }
  function saveMuted() {
    try { localStorage.setItem(STORAGE_KEY, muted ? "1" : "0"); } catch (e) {  }
  }

  function isPlaying() {
    if (source === "local") return !audio.paused;
    if (source === "yt") return ytPlaying;
    return false;
  }

  function render() {
    muteBtn.classList.toggle("is-muted", muted);
    muteBtn.setAttribute("aria-pressed", String(muted));
    var label = muted ? "Unmute music" : "Mute music";
    muteBtn.setAttribute("aria-label", label);
    muteBtn.title = label;
    hint.hidden = muted || isPlaying();
  }

  function sync() {
    if (source === "local") {
      if (muted) {
        audio.pause();
      } else {
        var p = audio.play();
        if (p && p.catch) p.catch(function () {  });
      }
    } else if (source === "yt" && ytReady) {
      if (muted) {
        ytPlayer.pauseVideo();
      } else {
        ytPlayer.unMute();
        ytPlayer.setVolume(70);
        ytPlayer.playVideo();
      }
    }
    render();
  }

  audio.volume = 0.7;
  audio.addEventListener("canplay", function () {
    if (source) return;
    source = "local";
    sync();
  }, { once: true });
  audio.addEventListener("play", render);
  audio.addEventListener("pause", render);
  audio.addEventListener("error", function () {
    if (source) return;
    loadYouTube();
  });
  if (audio.error) {
    loadYouTube();
  } else if (audio.readyState >= 3) {
    source = "local";
  }

  function loadYouTube() {
    source = "yt";
    window.onYouTubeIframeAPIReady = function () {
      ytPlayer = new YT.Player("yt-player", {
        width: 200,
        height: 200,
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: YT_VIDEO_ID,
          playsinline: 1,
          rel: 0
        },
        events: {
          onReady: function () { ytReady = true; sync(); },
          onStateChange: function (e) {
            ytPlaying = e.data === YT.PlayerState.PLAYING;
            if (e.data === YT.PlayerState.ENDED && !muted) {
              ytPlayer.seekTo(0);
              ytPlayer.playVideo();
            }
            render();
          }
        }
      });
    };
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  function onFirstGesture(e) {
    if (e.target && e.target.closest && e.target.closest("#mute")) return;
    if (!isPlaying()) sync();
  }
  ["pointerdown", "keydown", "touchstart"].forEach(function (type) {
    document.addEventListener(type, onFirstGesture, { passive: true });
  });

  muteBtn.addEventListener("click", function () {
    if (!muted && !isPlaying()) {
      sync();
      return;
    }
    muted = !muted;
    saveMuted();
    sync();
  });

  sync();
})();

(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".tile .thumb").forEach(function (thumb) {
    var imgs = thumb.querySelectorAll("img");
    if (imgs.length < 2) return;
    var tile = thumb.closest(".tile");
    var idx = 0, timer = null;

    function show(i) {
      imgs[idx].classList.remove("on");
      idx = i;
      imgs[idx].classList.add("on");
    }
    function start() {
      if (timer) return;
      show((idx + 1) % imgs.length);
      timer = setInterval(function () { show((idx + 1) % imgs.length); }, 1400);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
      show(0);
    }
    tile.addEventListener("mouseenter", start);
    tile.addEventListener("mouseleave", stop);
    tile.addEventListener("focus", start);
    tile.addEventListener("blur", stop);
  });
})();
