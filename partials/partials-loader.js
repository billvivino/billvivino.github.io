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
        // Temporarily insert into a dummy div so we can handle <script> tags properly
        const temp = document.createElement("div");
        temp.innerHTML = html;

        // Reinsert any <script> tags so they actually execute
        temp.querySelectorAll("script").forEach((oldScript) => {
          const newScript = document.createElement("script");
          // Copy attributes (src, type, etc.)
          for (const attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
          }
          if (oldScript.textContent) newScript.textContent = oldScript.textContent;
          document.head.appendChild(newScript);
        });

        // Insert non-script head elements normally
        temp.querySelectorAll("meta, link, style, title").forEach((el) =>
          document.head.appendChild(el)
        );
      } else {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      }

      log(`Loaded: ${path}`);
    } catch (e) {
      fail(`Failed to load ${path}`, e);
    }
  }

  // Load all partials in order
  await loadPartial("head-partial", "partials/header.html", true);
  await loadPartial("body-start", "partials/body-start.html");
  await loadPartial("navbar", "partials/navbar.html");
  await loadPartial("footer", "partials/footer.html");

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
