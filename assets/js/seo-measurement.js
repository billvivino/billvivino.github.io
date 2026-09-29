(function () {
  "use strict";
  if (window.BVTMeasurement) return;
  const configNode = document.getElementById("bvt-measurement-config");
  if (!configNode) return;
  let config;
  try { config = JSON.parse(configNode.textContent); }
  catch (_error) { return; }
  const contentGroups = ["site", "article", "tool", "service"];
  const clusters = ["unassigned", "practical-ai", "mobile-systems", "software-rescue", "product-strategy"];
  const safePagePath = config && typeof config.page_path === "string" &&
    config.page_path.startsWith("/") && !/[?#\r\n]/.test(config.page_path);
  if (!config || !contentGroups.includes(config.content_group) ||
      !clusters.includes(config.seo_cluster) || !safePagePath) return;
  const storageKey = "bvt_attribution_v1";
  const idleLimit = 30 * 60 * 1000;
  const now = Date.now();
  const params = new URLSearchParams(window.location.search);
  const ownHosts = [window.location.hostname, "billvivinotechnology.com", "www.billvivinotechnology.com", "billvivino.github.io"];
  const sources = ["chatgpt", "chatgpt.com", "openai", "google", "bing", "linkedin", "linkedin.com", "perplexity", "perplexity.ai", "claude", "claude.ai", "copilot", "copilot.microsoft.com", "gemini", "gemini.google.com", "newsletter"];
  const mediums = ["cpc", "ppc", "paid", "paid_social", "referral", "organic", "email", "social"];
  // Only public, reviewed labels belong here. Never accept arbitrary query text.
  const campaigns = ["bvt_ai_workflow_pilot_01"];
  const creatives = ["workflow_integration", "existing_product"];
  const aiHosts = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "claude.ai", "copilot.microsoft.com", "gemini.google.com"];
  function listed(value, allowed) {
    return allowed.includes(value) ? value : "";
  }
  function referrerHost() {
    try { return new URL(document.referrer).hostname.toLowerCase(); }
    catch (_error) { return ""; }
  }
  function hostMatches(host, domain) {
    return host === domain || host.endsWith("." + domain);
  }
  function touch(source, medium, evidence, channel) {
    return {
      source: source, medium: medium, evidence: evidence, channel: channel,
      campaign: listed(params.get("utm_campaign"), campaigns),
      content: listed(params.get("utm_content"), creatives),
      landing_path: config.page_path,
    };
  }
  function currentTouch() {
    const source = listed(params.get("utm_source"), sources);
    const medium = listed(params.get("utm_medium"), mediums);
    const isPaid = ["cpc", "ppc", "paid", "paid_social"].includes(medium);
    const isChatGPT = ["chatgpt", "chatgpt.com", "openai"].includes(source);
    if (source && medium) {
      return touch(source, medium, "utm", isChatGPT && isPaid ? "paid_chatgpt" : isPaid ? "other_paid" : "tagged");
    }
    // Keep click IDs in the original URL for existing tags; never copy their values.
    if (params.get("oppref")) return touch("chatgpt", "cpc", "paid_marker", "paid_chatgpt");
    if (params.get("gclid") || params.get("gbraid") || params.get("wbraid")) return touch("google", "cpc", "paid_marker", "other_paid");
    if (params.get("msclkid")) return touch("bing", "cpc", "paid_marker", "other_paid");
    // A source-only ChatGPT link is not proof of an organic citation or a paid ad.
    if (isChatGPT && !params.has("utm_medium")) return touch(source, "referral", "source_only", "ai_referral_unverified");
    if (params.has("utm_source") || params.has("utm_medium")) {
      return touch("unclassified", "unclassified", "unrecognized_utm", "unclassified");
    }
    const host = referrerHost();
    if (ownHosts.includes(host)) return null;
    const aiHost = aiHosts.find(function (domain) { return hostMatches(host, domain); });
    if (aiHost) return touch(aiHost, "referral", "referrer", "ai_referral_unverified");
    if (hostMatches(host, "google.com")) return touch("google", "organic", "referrer", "search");
    if (hostMatches(host, "bing.com")) return touch("bing", "organic", "referrer", "search");
    if (host) return touch("other_referral", "referral", "referrer", "other_referral");
    return null;
  }
  // Validate stored values as well as URL input. Storage can be stale or edited.
  function cleanTouch(value) {
    if (!value || typeof value !== "object") return null;
    const source = listed(value.source, sources.concat(aiHosts, ["direct_or_unknown", "other_referral", "unclassified"]));
    const medium = listed(value.medium, mediums.concat(["none", "unclassified"]));
    const evidence = listed(value.evidence, ["utm", "paid_marker", "source_only", "referrer", "none", "unrecognized_utm"]);
    const channel = listed(value.channel, ["paid_chatgpt", "other_paid", "tagged", "ai_referral_unverified", "unclassified", "search", "other_referral", "direct_or_unknown"]);
    const landingPath = typeof value.landing_path === "string" &&
      value.landing_path.startsWith("/") && !/[?#\r\n]/.test(value.landing_path)
      ? value.landing_path : "";
    if (!source || !medium || !evidence || !channel || !landingPath) return null;
    return { source: source, medium: medium, evidence: evidence, channel: channel,
      campaign: listed(value.campaign, campaigns), content: listed(value.content, creatives), landing_path: landingPath };
  }
  let saved = null;
  try {
    const candidate = JSON.parse(window.sessionStorage.getItem(storageKey));
    if (candidate && now >= candidate.updated_at && now - candidate.updated_at < idleLimit) {
      const first = cleanTouch(candidate.first);
      const last = cleanTouch(candidate.last);
      if (first && last) saved = { first: first, last: last };
    }
  } catch (_error) { /* Measurement must never prevent browsing or submission. */ }
  const current = currentTouch();
  const unknown = touch("direct_or_unknown", "none", "none", "direct_or_unknown");
  const attribution = {
    first: saved ? saved.first : current || unknown,
    last: current || (saved ? saved.last : unknown),
    updated_at: now,
  };
  try { window.sessionStorage.setItem(storageKey, JSON.stringify(attribution)); }
  catch (_error) { /* Current-page attribution still works without storage. */ }

  function attributionFields() {
    const result = {};
    ["first", "last"].forEach(function (which) {
      Object.keys(attribution[which]).forEach(function (key) {
        result["bvt_" + which + "_" + key] = attribution[which][key];
      });
    });
    return result;
  }
  function emit(name, fields) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({
      event: name, measurement_version: "2", content_group: config.content_group,
      seo_cluster: config.seo_cluster, page_path: config.page_path,
      source_path: config.page_path, pathway: "", destination: "",
      contact_method: "", link_text: "",
    }, attributionFields(), fields || {}));
  }
  window.BVTMeasurement = {
    attributionFields: attributionFields,
    trackInquiryAttempt: function () { emit("general_project_inquiry_submit_attempt", { form_id: "contactForm", submission_status: "attempt" }); },
  };
  emit("seo_content_view");
  document.addEventListener("click", function (event) {
    const target = event.target && event.target.closest ? event.target : event.target && event.target.parentElement;
    const link = target && target.closest("a[href]");
    if (!link) return;
    let url;
    try { url = new URL(link.getAttribute("href"), window.location.href); }
    catch (_error) { return; }
    const internal = url.origin === window.location.origin;
    const contactMethod = url.protocol === "mailto:" ? "email" : url.protocol === "tel:" ? "phone" : internal && url.pathname === "/contact.html" ? "contact_page" : "";
    if (!contactMethod && !["http:", "https:"].includes(url.protocol)) return;
    // No addresses, telephone numbers, link text, queries, fragments, or external paths.
    const destination = contactMethod === "email" ? "email" : contactMethod === "phone" ? "phone" : internal ? url.pathname : "external_site";
    const pathway = /^[a-z0-9_-]{1,80}$/.test(link.dataset.seoCta || "") ? link.dataset.seoCta : "";
    const cluster = listed(link.dataset.seoCluster, ["practical-ai", "mobile-systems", "software-rescue", "product-strategy"]) || config.seo_cluster;
    const fields = { destination: destination, pathway: pathway, contact_method: contactMethod, seo_cluster: cluster };
    if (pathway) emit("seo_path_click", fields);
    if (contactMethod) emit("contact_intent_click", fields);
  });

  if (config.content_group === "service") {
    let visibleMs = 0;
    let previous = performance.now();
    let wasVisible = document.visibilityState === "visible";
    let reachedHalf = false;
    function tick() {
      const time = performance.now();
      if (wasVisible) visibleMs += time - previous;
      previous = time;
      wasVisible = document.visibilityState === "visible";
      if (visibleMs >= 30000 && reachedHalf && wasVisible) {
        emit("service_page_engaged", { engagement_rule: "visible_30s_and_scroll_50pct" });
        window.clearInterval(timer);
        document.removeEventListener("visibilitychange", tick);
        window.removeEventListener("scroll", onScroll);
      }
    }
    function onScroll() {
      const height = document.documentElement.scrollHeight;
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= height / 2) reachedHalf = true;
      tick();
    }
    const timer = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
