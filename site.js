function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  items.forEach((item) => {
    const delay = Number(item.dataset.delay || 0);
    const duration = Number(item.dataset.duration || 760);
    const x = Number(item.dataset.x || 0);
    const y = Number(item.dataset.y || 28);
    item.style.setProperty("--delay", `${delay}ms`);
    item.style.setProperty("--duration", `${duration}ms`);
    item.style.setProperty("--from-x", `${x}px`);
    item.style.setProperty("--from-y", `${y}px`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "40px", threshold: 0.05 },
  );

  items.forEach((item) => observer.observe(item));
}

function setupMobileMenu() {
  const button = document.querySelector(".menu-button");
  const menu = document.querySelector("#mobileMenu");
  if (!button || !menu) return;

  const setOpen = (open) => {
    button.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", String(open));
  };

  button.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function setupHeroVideo() {
  const video = document.querySelector(".hero-video");
  if (!video) return;

  const hlsSrc = video.dataset.hlsSrc;
  if (!hlsSrc) return;

  if (window.Hls && window.Hls.isSupported()) {
    const hls = new window.Hls({ enableWorker: false });
    hls.loadSource(hlsSrc);
    hls.attachMedia(video);
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = hlsSrc;
  }

  video.play().catch(() => {});
}

function setupFaq() {
  const items = Array.from(document.querySelectorAll("[data-faq]"));
  items.forEach((item) => {
    const button = item.querySelector("button");
    if (!button) return;
    button.addEventListener("click", () => {
      const wasActive = item.classList.contains("is-active");
      items.forEach((entry) => entry.classList.remove("is-active"));
      if (!wasActive) item.classList.add("is-active");
    });
  });
}

function setupMagnetic() {
  document.querySelectorAll(".magnetic").forEach((element) => {
    const strength = Number(element.dataset.strength || 8);
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) / strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) / strength;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

function setupRiskConsole() {
  const consoleEl = document.querySelector("#riskConsole");
  if (!consoleEl) return;

  consoleEl.addEventListener("mousemove", (event) => {
    const rect = consoleEl.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    consoleEl.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-2px)`;
  });

  consoleEl.addEventListener("mouseleave", () => {
    consoleEl.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
}

function updateTicker() {
  const rows = document.querySelectorAll(".ticker-row");
  rows.forEach((row, index) => {
    const direction = row.dataset.direction === "right" ? 1 : -1;
    const scrollOffset = (window.scrollY * 0.18 + index * 80) * direction;
    const centerOffset = (window.innerWidth - row.scrollWidth) / 2;
    row.style.transform = `translateX(${centerOffset + scrollOffset}px)`;
  });
}

function setupFooterWatermark() {
  const svg = document.getElementById("efWatermarkSvg");
  const text = document.getElementById("efWatermarkText");
  if (!svg || !text) return;

  function fit() {
    try {
      const bbox = text.getBBox();
      if (bbox.width > 0) {
        svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      }
    } catch (e) {}
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fit);
  } else {
    window.addEventListener("load", fit);
  }
  window.addEventListener("resize", fit);
}

function setupPricingCalculator() {
  if (!document.getElementById("pricing")) return;

  const state = { serviceType: "both", models: 5, training: false, monitoring: false, timeline: "standard" };

  function calcGovtelligence() {
    const cfg = {
      audit:      { base: 1000, perModel: 500 },
      regulatory: { base: 800,  perModel: 400 },
      both:       { base: 1500, perModel: 800  },
    };
    const { base, perModel } = cfg[state.serviceType];
    let total = base + (state.models - 1) * perModel;
    if (state.training)              total += state.models * 150;
    if (state.monitoring)            total += state.models * 200;
    if (state.timeline === "urgent") total += state.models * 100;
    if (state.timeline === "priority") total += state.models * 50;
    return Math.max(total, base);
  }

  function calcBigFour() {
    const perModel = state.serviceType === "both" ? 8000 : 4000;
    return 25000 + (state.models - 1) * perModel;
  }

  function calcBoutique() {
    const perModel = state.serviceType === "both" ? 3000 : 1500;
    return 8000 + (state.models - 1) * perModel;
  }

  function fmt(n) { return "$" + n.toLocaleString(); }

  function render() {
    document.getElementById("calcGuardrailPrice").textContent = fmt(calcGovtelligence());
    document.getElementById("calcBigFourPrice").textContent   = fmt(calcBigFour());
    document.getElementById("calcBoutiquePrice").textContent  = fmt(calcBoutique());
    document.getElementById("calcModelCount").textContent     = state.models;
    const pct = ((state.models - 1) / 19) * 100;
    document.getElementById("calcSlider").style.setProperty("--progress", pct + "%");
  }

  document.querySelectorAll("#calcServiceType .calc-radio-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll("#calcServiceType .calc-radio-item").forEach((el) => el.classList.remove("is-selected"));
      item.classList.add("is-selected");
      state.serviceType = item.dataset.value;
      render();
    });
  });

  document.getElementById("calcSlider").addEventListener("input", (e) => {
    state.models = parseInt(e.target.value, 10);
    render();
  });

  document.getElementById("calcTraining").addEventListener("click", () => {
    state.training = !state.training;
    document.getElementById("calcTraining").classList.toggle("is-checked", state.training);
    render();
  });

  document.getElementById("calcMonitoring").addEventListener("click", () => {
    state.monitoring = !state.monitoring;
    document.getElementById("calcMonitoring").classList.toggle("is-checked", state.monitoring);
    render();
  });

  document.querySelectorAll("#calcTimeline .calc-radio-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll("#calcTimeline .calc-radio-item").forEach((el) => el.classList.remove("is-selected"));
      item.classList.add("is-selected");
      state.timeline = item.dataset.value;
      render();
    });
  });

  render();
}

setupReveal();
setupHeroVideo();
setupMobileMenu();
setupFaq();
setupMagnetic();
setupRiskConsole();
setupFooterWatermark();
setupPricingCalculator();
updateTicker();

window.addEventListener("scroll", updateTicker, { passive: true });
window.addEventListener("resize", updateTicker);
