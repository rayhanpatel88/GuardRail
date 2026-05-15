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
    button.setAttribute("aria-expanded", String(open));
  };

  button.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
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
    const offset = (window.scrollY * 0.18 + index * 80) * direction;
    row.style.transform = `translateX(${offset - 160}px)`;
  });
}

setupReveal();
setupMobileMenu();
setupFaq();
setupMagnetic();
setupRiskConsole();
updateTicker();

window.addEventListener("scroll", updateTicker, { passive: true });
window.addEventListener("resize", updateTicker);
