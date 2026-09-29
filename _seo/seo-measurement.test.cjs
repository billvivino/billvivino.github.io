// Run with: node --test _seo/seo-measurement.test.cjs
// Entirely local: no Google, OpenAI, PayPal, or Formspree requests.
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "assets/js/seo-measurement.js"), "utf8");
const contactSource = fs.readFileSync(path.join(root, "contact.html"), "utf8");
const contactMatch = contactSource.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(contactMatch, "contact page should contain its validation script");
const contactScript = contactMatch[1];

function field(value) {
  return {
    value: value || "",
    listeners: {},
    addEventListener(name, fn) { this.listeners[name] = fn; },
  };
}

function page(options = {}) {
  const location = new URL(options.url || "https://billvivinotechnology.com/ai-integration-consultant.html");
  const memory = options.memory || new Map();
  let clock = options.now || 10000000;
  const listeners = {};
  const windowListeners = {};
  const intervals = new Map();
  const fields = {};

  ["name", "email", "phone", "projectStage", "type", "timeline", "message", "ts"].forEach(function (id) {
    fields[id] = field("private-" + id);
  });
  fields.message.value = "Our team needs a system that links inventory scheduling customer updates and project reporting across several existing applications with reliable permissions and approvals.";
  fields.budget = field("Prototype retainer - $5k-$10k");
  fields.budget.options = [
    { value: "", dataset: {} },
    {
      value: "Prototype retainer - $5k-$10k",
      dataset: { tier: "prototype", description: "Prototype planning range" },
    },
  ];
  fields.budget.selectedIndex = 1;
  fields["budget-help"] = { textContent: "Choose the closest planning range." };
  fields.engagementSource = field("");
  fields.engagementSource.name = "engagement_source";
  fields.engagementSource.type = "hidden";

  const form = {
    children: [fields.engagementSource],
    listeners: {},
    addEventListener(name, fn) { this.listeners[name] = fn; },
    querySelector(selector) {
      const match = selector.match(/name="([^"]+)"/);
      return match ? this.children.find(function (item) { return item.name === match[1]; }) : null;
    },
    appendChild(child) { this.children.push(child); },
  };

  const config = options.config || {
    content_group: options.group || "service",
    seo_cluster: options.cluster || "practical-ai",
    page_path: location.pathname,
  };
  const configText = Object.prototype.hasOwnProperty.call(options, "configText")
    ? options.configText
    : JSON.stringify(config);
  const document = {
    visibilityState: "visible",
    referrer: options.referrer || "",
    documentElement: { scrollHeight: 2000 },
    getElementById(id) {
      if (id === "bvt-measurement-config") return { textContent: configText };
      if (id === "contactForm") return form;
      return fields[id];
    },
    createElement() { return {}; },
    addEventListener(name, fn) { (listeners[name] ||= []).push(fn); },
    removeEventListener(name, fn) {
      listeners[name] = (listeners[name] || []).filter(function (item) { return item !== fn; });
    },
  };
  const window = {
    location,
    dataLayer: [],
    innerHeight: 800,
    scrollY: 0,
    crypto: { randomUUID: function () { return "opaque-reference"; } },
    sessionStorage: {
      getItem(key) {
        if (options.blockStorage) throw Error("blocked");
        return memory.get(key) || null;
      },
      setItem(key, value) {
        if (options.blockStorage) throw Error("blocked");
        memory.set(key, value);
      },
    },
    addEventListener(name, fn) { (windowListeners[name] ||= []).push(fn); },
    removeEventListener(name, fn) {
      windowListeners[name] = (windowListeners[name] || []).filter(function (item) { return item !== fn; });
    },
    setInterval(fn) {
      const id = intervals.size + 1;
      intervals.set(id, fn);
      return id;
    },
    clearInterval(id) { intervals.delete(id); },
  };
  const alerts = [];
  const context = vm.createContext({
    window,
    document,
    URL,
    URLSearchParams,
    performance: { now: function () { return clock; } },
    Date: { now: function () { return clock; } },
    alert: function (value) { alerts.push(value); },
    Set,
  });

  vm.runInContext(script, context);

  return {
    window,
    document,
    memory,
    fields,
    form,
    alerts,
    context,
    events(name) { return window.dataLayer.filter(function (event) { return event.event === name; }); },
    advance(milliseconds) {
      clock += milliseconds;
      Array.from(intervals.values()).forEach(function (fn) { fn(); });
    },
    visibility(value) {
      document.visibilityState = value;
      (listeners.visibilitychange || []).slice().forEach(function (fn) { fn(); });
    },
    scroll() {
      window.scrollY = 300;
      (windowListeners.scroll || []).slice().forEach(function (fn) { fn(); });
    },
    click(href, dataset = {}) {
      const link = { getAttribute: function () { return href; }, dataset, textContent: "private-link-text" };
      (listeners.click || []).forEach(function (fn) {
        fn({ target: { closest: function () { return link; } } });
      });
    },
    loadForm() {
      vm.runInContext(contactScript, context);
      (listeners.DOMContentLoaded || []).forEach(function (fn) { fn(); });
    },
    submit() {
      const event = {
        prevented: false,
        preventDefault() { this.prevented = true; },
      };
      form.listeners.submit(event);
      return event;
    },
  };
}

const paid = "https://billvivinotechnology.com/ai-integration-consultant.html?utm_source=chatgpt&utm_medium=paid_social&utm_campaign=bvt_ai_workflow_pilot_01&utm_content=workflow_integration";

test("base event uses static page metadata and excludes the query string", function () {
  const current = page({ url: paid });
  const view = current.events("seo_content_view")[0];
  assert.equal(view.measurement_version, "2");
  assert.equal(view.content_group, "service");
  assert.equal(view.seo_cluster, "practical-ai");
  assert.equal(view.page_path, "/ai-integration-consultant.html");
  assert.equal(view.link_text, "");
  assert.ok(!JSON.stringify(view).includes("utm_"));
});

test("invalid measurement configuration stops safely", function () {
  const malformed = page({ configText: "{" });
  assert.equal(malformed.window.dataLayer.length, 0);
  assert.equal(malformed.window.BVTMeasurement, undefined);
  const unsafe = page({ config: { content_group: "private", seo_cluster: "practical-ai", page_path: "/?secret" } });
  assert.equal(unsafe.window.dataLayer.length, 0);
});

test("paid attribution survives contact navigation without rewriting URLs", function () {
  const first = page({ url: paid });
  const second = page({ url: "https://billvivinotechnology.com/contact.html", memory: first.memory });
  const data = second.window.BVTMeasurement.attributionFields();
  assert.equal(data.bvt_first_source, "chatgpt");
  assert.equal(data.bvt_last_channel, "paid_chatgpt");
  assert.equal(data.bvt_last_campaign, "bvt_ai_workflow_pilot_01");
  assert.equal(data.bvt_last_landing_path, "/ai-integration-consultant.html");
  assert.equal(first.window.location.href, paid);
});

test("a new tagged source changes last touch while preserving first touch", function () {
  const first = page({ url: paid });
  const second = page({
    url: "https://billvivinotechnology.com/contact.html?utm_source=google&utm_medium=cpc",
    memory: first.memory,
    referrer: "https://chatgpt.com/",
  });
  const data = second.window.BVTMeasurement.attributionFields();
  assert.equal(data.bvt_first_source, "chatgpt");
  assert.equal(data.bvt_last_source, "google");
  assert.equal(data.bvt_last_campaign, "");
});

test("expired or invalid session state does not resurrect attribution", function () {
  const first = page({ url: paid });
  const second = page({ memory: first.memory, now: 10000000 + 31 * 60000 });
  assert.equal(second.window.BVTMeasurement.attributionFields().bvt_last_source, "direct_or_unknown");
  first.memory.set("bvt_attribution_v1", "{broken");
  assert.equal(page({ memory: first.memory }).events("seo_content_view").length, 1);
});

test("valid page paths with punctuation persist between pages", function () {
  const first = page({
    url: "https://billvivinotechnology.com/posts/why-i-don't-price-software-like-a-project.html?utm_source=google&utm_medium=cpc",
    group: "article",
    cluster: "product-strategy",
  });
  const second = page({ url: "https://billvivinotechnology.com/contact.html", memory: first.memory });
  assert.equal(second.window.BVTMeasurement.attributionFields().bvt_first_landing_path, "/posts/why-i-don't-price-software-like-a-project.html");
});

test("AI referrers are unverified referrals and fake domains are not ChatGPT", function () {
  ["https://chatgpt.com/c/private", "https://www.perplexity.ai/search/private"].forEach(function (referrer) {
    assert.equal(page({ referrer }).window.BVTMeasurement.attributionFields().bvt_last_channel, "ai_referral_unverified");
  });
  assert.equal(page({ referrer: "https://notchatgpt.com/" }).window.BVTMeasurement.attributionFields().bvt_last_source, "other_referral");
  assert.equal(page({ url: "https://billvivinotechnology.com/contact.html?utm_source=chatgpt.com" }).window.BVTMeasurement.attributionFields().bvt_last_channel, "ai_referral_unverified");
});

test("click marker values and unreviewed campaign text never enter custom events", function () {
  const current = page({
    url: "https://billvivinotechnology.com/contact.html?oppref=secret-click-id&utm_campaign=person@example.com&utm_term=patient-data",
  });
  assert.equal(current.window.BVTMeasurement.attributionFields().bvt_last_channel, "paid_chatgpt");
  const payload = JSON.stringify(current.window.dataLayer) + Array.from(current.memory.values()).join("");
  ["secret-click-id", "person@", "patient-data", "utm_term"].forEach(function (secret) {
    assert.ok(!payload.includes(secret));
  });
});

test("unrecognized UTMs remain unknown and recognized UTMs beat referrers", function () {
  const unknown = page({
    url: "https://billvivinotechnology.com/?utm_source=private-person&utm_medium=cpc",
    referrer: "https://chatgpt.com/",
  });
  assert.equal(unknown.window.BVTMeasurement.attributionFields().bvt_last_evidence, "unrecognized_utm");
  const known = page({
    url: "https://billvivinotechnology.com/?utm_source=google&utm_medium=cpc&oppref=private",
    referrer: "https://chatgpt.com/",
  });
  assert.equal(known.window.BVTMeasurement.attributionFields().bvt_last_source, "google");
});

test("safe contact and pathway clicks exclude private destinations and link text", function () {
  const current = page();
  current.click("contact.html?email=private@example.com#secret", { seoCta: "ai_to_contact" });
  current.click("mailto:private@example.com?body=secret");
  current.click("tel:+15555550123");
  current.click("https://elsewhere.test/contact.html");
  assert.equal(current.events("contact_intent_click").length, 3);
  assert.equal(current.events("seo_path_click").length, 1);
  assert.equal(current.events("contact_intent_click")[0].destination, "/contact.html");
  const payload = JSON.stringify(current.window.dataLayer);
  ["private@", "15555550123", "secret", "private-link-text"].forEach(function (secret) {
    assert.ok(!payload.includes(secret));
  });
});

test("service engagement needs 30 visible seconds plus scroll and fires once", function () {
  const current = page();
  current.visibility("hidden");
  current.advance(60000);
  current.scroll();
  assert.equal(current.events("service_page_engaged").length, 0);
  current.visibility("visible");
  current.advance(29000);
  assert.equal(current.events("service_page_engaged").length, 0);
  current.advance(1000);
  current.advance(10000);
  current.scroll();
  assert.equal(current.events("service_page_engaged").length, 1);
  assert.equal(page({ group: "article" }).events("service_page_engaged").length, 0);
});

test("storage denial keeps view and attempt events functional", function () {
  const current = page({ url: paid, blockStorage: true });
  current.window.BVTMeasurement.trackInquiryAttempt();
  assert.equal(current.events("seo_content_view").length, 1);
  assert.equal(current.events("general_project_inquiry_submit_attempt").length, 1);
});

test("valid contact submission preserves native delivery and keeps private fields out of analytics", function () {
  const current = page({ url: paid + "&budget=prototype&engagement=fixed-price-retainer" });
  current.loadForm();
  current.advance(21000);
  assert.equal(current.fields.budget.value, "Prototype retainer - $5k-$10k");
  assert.equal(current.fields.engagementSource.value, "fixed-price-retainer");
  assert.equal(current.submit().prevented, false);
  assert.equal(current.form.children.find(function (item) { return item.name === "inquiry_reference"; }).value, "opaque-reference");
  assert.equal(current.form.children.find(function (item) { return item.name === "bvt_last_source"; }).value, "chatgpt");
  assert.equal(current.events("general_project_inquiry_submit_attempt").length, 1);
  const payload = JSON.stringify(current.window.dataLayer);
  ["private-", "opaque-reference", "Our team needs", "project_stage", "budget_range", "engagement_source", "fixed-price-retainer"].forEach(function (secret) {
    assert.ok(!payload.includes(secret));
  });
  assert.equal(current.events("general_project_inquiry_submit").length, 0);
  assert.equal(current.events("generate_lead").length, 0);
  current.submit();
  assert.equal(current.form.children.filter(function (item) { return item.name === "inquiry_reference"; }).length, 1);
});

test("invalid and too-fast forms generate no inquiry event, and native fallback remains available", function () {
  const current = page();
  current.loadForm();
  assert.equal(current.submit().prevented, true);
  current.advance(21000);
  current.fields.email.value = "";
  assert.equal(current.submit().prevented, true);
  assert.equal(current.events("general_project_inquiry_submit_attempt").length, 0);
  current.fields.email.value = "private-email";
  current.fields.message.value = "too short";
  assert.equal(current.submit().prevented, true);
  current.fields.message.value = "Our team needs a system that links inventory scheduling customer updates and project reporting across several existing applications with reliable permissions and approvals.";
  delete current.window.BVTMeasurement;
  assert.equal(current.submit().prevented, false);
});
