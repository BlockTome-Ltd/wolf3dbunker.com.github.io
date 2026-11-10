(function () {
  "use strict";
  var me = document.currentScript && document.currentScript.src;
  var root = me ? me.replace(/rr-badge\.js(\?.*)?$/, "") : "";
  var old = location.href.indexOf(root + "2008-edition/") === 0;
  var css = document.createElement("style");
  css.textContent =
    ".rr-badge{position:fixed;right:8px;bottom:8px;z-index:9999;background:rgba(0,0,0,.85);color:#ccc;" +
    "border:1px solid #7a1a1a;font:12px/1.5 Verdana,Arial,sans-serif;padding:5px 10px;max-width:calc(100% - 16px);box-sizing:border-box}" +
    ".rr-badge a{color:#e8c860;text-decoration:none}.rr-badge a:hover{color:#fff}";
  document.head.appendChild(css);
  var b = document.createElement("div");
  b.className = "rr-badge";
  b.innerHTML = (old
      ? "2008&ndash;2019 edition of wolf3d.bjrowan.com, from the Wayback Machine &middot; " +
        '<a href="' + root + 'index.html">Current edition</a>'
      : "Preserved copy of wolf3d.bjrowan.com, captured November 2026 &middot; " +
        '<a href="' + root + '2008-edition/index.html">2008 edition</a>') +
    ' &middot; <a href="https://wolf3d.bjrowan.com/" target="_blank" rel="noopener">Live site</a>' +
    ' &middot; <a href="' + root + '../../index.html">&larr; Back to Wolf3dBunker</a>';
  document.body.appendChild(b);
})();
