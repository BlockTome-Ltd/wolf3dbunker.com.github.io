(function () {
  "use strict";

  var me = document.currentScript && document.currentScript.src;
  var ROOT = me ? me.replace(/archive-shim\.js(\?.*)?$/, "") : "";
  var FILES = {};
  (window.ARCHIVE_FILES || []).forEach(function (f) { FILES[f] = true; });
  var ALIASES = window.ARCHIVE_ALIASES || {};

  function resolve(url) {
    if (!url || /^(javascript:|mailto:)/i.test(url)) return url;
    if (/^https?:/i.test(url) && url.indexOf(location.host) < 0) {
      if (/test\.com/.test(url)) return null;
      return "https://web.archive.org/web/2003/" + url;
    }
    var abs = new URL(url, location.href).href;
    if (abs.indexOf(ROOT) !== 0) return url;
    var rel = decodeURIComponent(abs.slice(ROOT.length).split("#")[0].split("?")[0]).toLowerCase();
    if (FILES[rel]) return ROOT + rel;
    if (ALIASES[rel]) return ROOT + ALIASES[rel];
    return ROOT + "missing.html?p=" + encodeURIComponent("/" + rel);
  }

  var css = document.createElement("style");
  css.textContent = [
    ".bk-bar{display:flex;flex-wrap:wrap;gap:0;background:#660000;font:bold 12px Verdana,Arial,Helvetica,sans-serif;position:relative;z-index:50;width:max-content;max-width:100%}",
    ".bk-top{position:relative}",
    ".bk-top>span{display:block;padding:1px 9px;color:#cccc00;cursor:default;white-space:nowrap;line-height:15px}",
    ".bk-top:hover>span,.bk-top:focus-within>span{color:#fff}",
    ".bk-menu{display:none;position:absolute;left:0;top:100%;min-width:190px;background:#990000;border:1px solid #000;padding:1px 0;margin:0;list-style:none;z-index:60}",
    ".bk-menu .bk-menu{left:100%;top:-2px}",
    ".bk-top:hover>.bk-menu,.bk-top:focus-within>.bk-menu,.bk-item:hover>.bk-menu,.bk-item:focus-within>.bk-menu{display:block}",
    ".bk-item{position:relative}",
    ".bk-item>a,.bk-item>span{display:block;padding:2px 14px 2px 8px;font:9px Verdana,Arial,Helvetica,sans-serif;color:#cccccc;text-decoration:none;white-space:nowrap;cursor:pointer}",
    ".bk-item>a:hover,.bk-item>a:focus,.bk-item:hover>span{background:#000;color:#fff}",
    ".bk-item.bk-sub>span:after{content:'\\25B8';position:absolute;right:4px}",
    ".bk-item.bk-missing>a{color:#a07070}",
    ".bk-sep{border-top:1px solid #660000;border-bottom:1px solid #ff6666;margin:2px 0}",
    ".bk-img-missing{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;background:#4a0000;border:1px dashed #a05050;color:#d09090;font:9px Verdana,Arial,sans-serif;overflow:hidden;text-align:center;vertical-align:top}",
    ".bk-badge{position:fixed;right:8px;bottom:8px;z-index:9999;background:rgba(0,0,0,.82);color:#ccc;border:1px solid #990000;font:11px Verdana,Arial,sans-serif;padding:5px 9px;line-height:1.4}",
    ".bk-badge a{color:#cccc00;text-decoration:none}.bk-badge a:hover{color:#fff}",
    ".bk-scroller{position:absolute;overflow:hidden;z-index:100}",
    ".bk-scroller div{position:absolute;left:0;right:0;transition:top .6s ease;display:flex;align-items:center;box-sizing:border-box}"
  ].join("\n");
  document.head.appendChild(css);

  function buildList(arr, isSub) {
    var ul = document.createElement("ul");
    ul.className = "bk-menu";
    arr.forEach(function (row) {
      var type = row[0], label = row[1], tip = row[2], target = row[3];
      var li = document.createElement("li");
      if (type === "S") { li.className = "bk-sep"; ul.appendChild(li); return; }
      li.className = "bk-item";
      if (type === "M") {
        var sub = window[target];
        li.className += " bk-sub";
        var sp = document.createElement("span");
        sp.tabIndex = 0; sp.textContent = label; sp.title = tip || "";
        li.appendChild(sp);
        if (sub) li.appendChild(buildList(sub, true));
      } else {
        var a = document.createElement("a");
        var href = resolve(target);
        a.textContent = label; a.title = tip || "";
        if (href === null) { a.removeAttribute("href"); li.className += " bk-missing"; a.title = "Link was a placeholder on the original site"; }
        else { a.href = href; if (/missing\.html/.test(href)) li.className += " bk-missing"; }
        li.appendChild(a);
      }
      ul.appendChild(li);
    });
    return ul;
  }

  window.buildMenu = function (menuArrayName) {
    var menuArray = window[menuArrayName];
    var holder = document.getElementById("menuHolder");
    if (!menuArray || !holder) return;
    var bar = document.createElement("div");
    bar.className = "bk-bar";
    menuArray.forEach(function (top) {
      var wrap = document.createElement("div");
      wrap.className = "bk-top";
      var t = document.createElement("span");
      t.tabIndex = 0;
      t.textContent = top[0].trim();
      wrap.appendChild(t);
      var items = window[top[1]];
      if (items) wrap.appendChild(buildList(items));
      bar.appendChild(wrap);
    });
    holder.innerHTML = "";
    holder.appendChild(bar);
  };

  window.getImage = function (name) { return document.images[name] || document.getElementsByName(name)[0]; };
  window.getImagePageLeft = function (img) { return img.getBoundingClientRect().left + window.scrollX; };
  window.getImagePageTop = function (img) { return img.getBoundingClientRect().top + window.scrollY; };

  function modernScroller(s) {
    var box, items = [], idx = 0;
    s.create = function () {
      if (box) return;
      box = document.createElement("div");
      box.className = "bk-scroller";
      box.style.width = s.width + "px"; box.style.height = s.height + "px";
      box.style.background = s.bdColor || "#000";
      (s.items || []).forEach(function (html, i) {
        var d = document.createElement("div");
        d.style.height = s.height + "px";
        d.style.top = (i === 0 ? 0 : s.height) + "px";
        d.style.padding = (s.padding + s.border) + "px";
        d.style.color = s.fgColor; d.style.background = s.bgColor;
        d.style.fontFamily = s.fontFace; d.style.fontSize = (s.fontSize <= 2 ? 13 : 16) + "px";
        d.innerHTML = html;
        box.appendChild(d); items.push(d);
      });
      document.body.appendChild(box);
      if (items.length > 1) setInterval(function () {
        var cur = items[idx]; idx = (idx + 1) % items.length; var nxt = items[idx];
        nxt.style.transition = "none"; nxt.style.top = s.height + "px";
        void nxt.offsetHeight; nxt.style.transition = "";
        cur.style.top = -s.height + "px"; nxt.style.top = "0px";
      }, (s.pauseTime || 2000) + 800);
    };
    s.moveTo = function (x, y) { if (box) { box.style.left = x + "px"; box.style.top = y + "px"; } };
    s.show = function () { if (box) box.style.visibility = "visible"; };
    s.hide = function () { if (box) box.style.visibility = "hidden"; };
    s.setzIndex = function (z) { if (box) box.style.zIndex = z; };
  }
  if (typeof window.Scroller === "function") {
    Object.keys(window).forEach(function (k) {
      try { if (window[k] instanceof window.Scroller) modernScroller(window[k]); } catch (e) {  }
    });
  }

  function placeholder(img) {
    if (img.dataset.bkDone) return;
    img.dataset.bkDone = "1";
    var w = parseInt(img.getAttribute("width"), 10), h = parseInt(img.getAttribute("height"), 10);
    if (!w || !h || (w <= 2 && h <= 2)) { img.style.visibility = "hidden"; return; }
    var box = document.createElement("span");
    box.className = "bk-img-missing";
    box.style.width = w + "px"; box.style.height = h + "px";
    box.title = "Image not preserved: " + (img.getAttribute("src") || "");
    if (w >= 40 && h >= 12) box.textContent = img.alt || (w > 120 ? "image not archived" : "");
    img.replaceWith(box);
  }
  document.addEventListener("error", function (e) { if (e.target && e.target.tagName === "IMG") placeholder(e.target); }, true);
  function sweep() {
    Array.prototype.forEach.call(document.images, function (img) {
      if (img.complete && img.naturalWidth === 0) placeholder(img);
    });
  }
  window.addEventListener("load", function () { sweep(); setTimeout(sweep, 400); setTimeout(sweep, 1500); });
  sweep();

  var badge = document.createElement("div");
  badge.className = "bk-badge";
  badge.innerHTML = 'Preserved copy of wolf3dbunker.com (2000&ndash;2003) &middot; <a href="' + ROOT + '../../index.html">&larr; Back to Wolf3dBunker</a>';
  (document.body || document.documentElement).appendChild(badge);
})();
