(function () {
  "use strict";
  var root = document.documentElement;

  /* ---------- language ---------- */
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }
  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.lang = lang;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
    document.querySelectorAll("[data-alt-" + lang + "]").forEach(function (el) {
      el.setAttribute("alt", el.getAttribute("data-alt-" + lang));
    });
    document.querySelectorAll("[data-label-" + lang + "]").forEach(function (el) {
      el.setAttribute("aria-label", el.getAttribute("data-label-" + lang));
    });
    document.title = lang === "es"
      ? "Noelia Urpí Paniagua | Ingeniera de Datos"
      : "Noelia Urpí Paniagua | Data Engineer";
    store("lang", lang);
  }
  var saved = store("lang");
  var initial = saved || ((navigator.language || "en").toLowerCase().indexOf("es") === 0 ? "es" : "en");
  setLang(initial);
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.setLang); });
  });

  /* ---------- nav ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- lightbox ---------- */
  var box = document.querySelector(".lightbox");
  var boxImg = box.querySelector("img");
  document.querySelectorAll(".shot").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var img = btn.querySelector("img");
      boxImg.src = btn.dataset.full || img.src;
      boxImg.alt = img.alt;
      if (typeof box.showModal === "function") box.showModal(); else window.open(boxImg.src, "_blank");
    });
  });
  box.querySelector(".lightbox__close").addEventListener("click", function () { box.close(); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });

  /* ---------- scroll reveal ---------- */
  var groups = [
    ".section__head", ".about__text", ".facts", ".group-title", ".soft",
    ".job", ".card", ".stage", ".learn .list li", ".learn h3",
    ".contact__title", ".contact__lead", ".contact__mail", ".socials li"
  ];
  var targets = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty("--d", Math.min(i, 5) * 90 + "ms");
      el.classList.add("reveal");
      targets.push(el);
    });
  });
  var timeline = document.querySelector(".timeline");
  if (timeline) targets.push(timeline);
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
