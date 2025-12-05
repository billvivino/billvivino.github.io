// /partials/partials-loader.js
document.addEventListener("DOMContentLoaded", async () => {
  const log = (m) => console.log(`✅ ${m}`);
  const fail = (m, e) => console.error(`❌ ${m}`, e || "");

  async function loadPartial(id, path, injectHead = false) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();

      if (injectHead) {
        // Temporary container to parse HTML
        const temp = document.createElement("div");
        temp.innerHTML = html;

        // Reinsert script tags so they execute
        temp.querySelectorAll("script").forEach((oldScript) => {
          const newScript = document.createElement("script");
          for (const attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
          }
          if (oldScript.textContent)
            newScript.textContent = oldScript.textContent;
          document.head.appendChild(newScript);
        });

        // Insert meta, link, style, title normally
        temp.querySelectorAll("meta, link, style, title").forEach((el) =>
          document.head.appendChild(el)
        );
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.innerHTML = html;

          // Execute <script> tags inside the partial
          el.querySelectorAll("script").forEach((oldScript) => {
            const newScript = document.createElement("script");
            for (const attr of oldScript.attributes) {
              newScript.setAttribute(attr.name, attr.value);
            }
            newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript);
          });
        }
      }

      log(`Loaded: ${path}`);
    } catch (e) {
      fail(`Failed to load ${path}`, e);
    }
  }

  // SAFE depth calculation — never negative
  const segments = window.location.pathname.split("/").filter(Boolean);
  const depth = Math.max(0, segments.length - 1);
  const basePath = "../".repeat(depth) + "partials/";

  // Load the partials
  await loadPartial("head-partial", `${basePath}header.html`, true);
  await loadPartial("body-start", `${basePath}body-start.html`);
  await loadPartial("navbar", `${basePath}navbar.html`);
  await loadPartial("footer", `${basePath}footer.html`);
  setActiveNavLink();


  // 🕐 Wait for Bootstrap to exist before initializing dropdowns
  const wait = setInterval(() => {
    if (window.bootstrap && typeof bootstrap.Dropdown === "function") {
      clearInterval(wait);
      document
        .querySelectorAll('[data-bs-toggle="dropdown"]')
        .forEach((el) => new bootstrap.Dropdown(el));
      log("Bootstrap dropdowns initialized.");
    }
  }, 200);
});
function setActiveNavLink() {
  let path = window.location.pathname;

  // Normalize "/" to "/index.html"
  if (path === "/") {
    path = "/index.html";
  }

  // Select nav links + dropdown items
  const links = document.querySelectorAll("a.nav-link, a.dropdown-item");

  links.forEach(link => {
    const href = link.getAttribute("href");

    // Highlight Blog for /posts/*
    if (path.startsWith("/posts/") && href === "/blog.html") {
      link.classList.add("active");
      return;
    }

    if (href === path) {
      link.classList.add("active");
    }
  });
}
