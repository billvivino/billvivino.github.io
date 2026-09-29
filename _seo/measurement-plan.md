# Organic discovery and inquiry measurement plan

Updated September 29, 2026.

This document describes the website measurement implemented in this repository.
It separates search visibility, on-site behavior, inquiry attempts, received
inquiries, qualified opportunities, and paid work. Those stages must not be
reported as if they were interchangeable.

## Where results are viewed

| System | What it answers |
|---|---|
| Google Search Console | Which searches produced impressions and clicks, along with CTR, average position, pages, devices, indexing, and sitemap status |
| Google Analytics 4 | Which measured pages and pathways visitors used after arriving |
| Google Tag Manager Preview | Whether the site's data-layer events are present and whether the intended analytics tags fire |
| Formspree or the business inbox | Whether a contact-form inquiry was actually received |
| PayPal or invoice records | Whether money was actually received, refunded, or disputed |

The `_seo` directory contains documentation and automated tests. It is not a
dashboard and it is not emitted as a section of the Jekyll website. Because this
repository is public, committed files in this directory are still publicly
readable through the source repository.

## Search Console review

Use completed data only; recent Search Console dates can still be incomplete.

- Compare the latest complete 28 days with the previous 28 days.
- Compare the latest complete three months with the previous three months for
  broader direction.
- Separate branded queries matching `bill vivino|billvivino|vivino technology`
  from non-branded queries.
- Review articles, tools, and commercial service pages separately.
- Investigate a decline only after checking impressions, position, CTR, page,
  query, device, and indexing evidence. A short click decline alone is not proof
  of a penalty or a loss of market interest.

## Website event model

`_includes/seo-measurement.html` supplies static page metadata to
`assets/js/seo-measurement.js`. The script pushes events to `window.dataLayer`.
It does not send events directly to GA4; Google Tag Manager must route them.

| Event | Meaning | Never treat as |
|---|---|---|
| `seo_content_view` | A categorized site, article, tool, or service page loaded | Engagement, an inquiry, or a sale |
| `seo_path_click` | A link carrying an approved `data-seo-cta` pathway label was clicked | A completed destination action |
| `contact_intent_click` | A visitor clicked the contact page, email, or telephone path | A delivered message or completed call |
| `service_page_engaged` | A service page was visible for at least 30 seconds and the visitor reached halfway down the page | A qualified lead or a primary advertising conversion |
| `general_project_inquiry_submit_attempt` | The contact form passed the site's client-side checks and native Formspree submission was allowed to continue | Formspree acceptance, inbox delivery, qualification, or revenue |

Every custom event carries `measurement_version=2`, `content_group`,
`seo_cluster`, and a static path without its query string or fragment. Pathway
labels and SEO clusters are restricted to reviewed low-cardinality values.

## Attribution rules

The helper records a first observed touch and the latest non-direct touch in
same-tab session storage under `bvt_attribution_v1`.

- Stored attribution expires after 30 minutes of inactivity between page loads.
- Direct or internal navigation does not overwrite a known external touch.
- A newly recognized external touch updates the latest touch while preserving
  the first touch.
- Recognized sources include Google, Bing, LinkedIn, ChatGPT/OpenAI,
  Perplexity, Claude, Copilot, Gemini, email, and direct/unknown traffic.
- Paid markers such as `gclid`, `msclkid`, or `oppref` are recognized only by
  their presence. Their values are not copied into custom events or storage.
- Campaign and creative values are accepted only from a reviewed allowlist.
  Unknown UTM values remain unclassified instead of being copied into events.
- AI referrers without a paid marker are labelled unverified AI referrals. This
  does not prove that a specific answer cited the site or produced the visit.

The helper does not create a persistent visitor ID and does not connect tabs,
browsers, devices, or earlier sessions. Referrer stripping, private browsing,
ad blockers, disabled storage, and consent choices can create attribution gaps.
GA4's own session attribution remains authoritative for GA4 reporting; `bvt_*`
fields supplement it rather than replace it.

## Privacy contract

Custom event payloads must not contain:

- names, email addresses, phone numbers, form messages, timelines, or project
  descriptions;
- project type, stage, budget selection, or self-reported discovery source;
- inquiry references, payment references, or transaction identifiers;
- full referrers, arbitrary query strings, URL fragments, click-ID values,
  `utm_term`, external paths, or free-form link text.

Email and phone destinations are reduced to `email` and `phone`. External links
are reduced to `external_site`. The optional discovery answer, the opaque
`inquiry_reference`, and safe first/latest attribution fields travel only with
the private Formspree submission.

These rules cover this repository's custom helper only. Google tags and other
providers may independently process page URLs, referrers, device information,
and online identifiers. The public privacy policy must accurately describe the
providers and storage currently in use.

## Inquiry and payment stages

Keep the following counts separate:

1. Submission attempt: the browser allowed a native form submission.
2. Received inquiry: Formspree or the business inbox contains the submission.
3. Genuine inquiry: spam and duplicates have been removed.
4. Qualified inquiry: Bill confirms a real project, service fit, decision path,
   credible budget, and actionable timeframe.
5. Proposal or signed engagement: commercial scope was proposed or accepted.
6. Paid engagement: settled payment is independently verified.

A browser return from PayPal and the site's local checkout reference are not
payment verification. Checkout-start, return-page, engagement, contact-click,
and submission-attempt events must remain diagnostic and must not be primary
Maximize Conversions goals. Use PayPal or invoice records for paid outcomes.

## Google Tag Manager routing

The published custom-event tag currently routes these existing events:

```text
seo_content_view
seo_path_click
contact_intent_click
```

The repository also emits these newer events:

```text
service_page_engaged
general_project_inquiry_submit_attempt
```

They will not appear in GA4 until an approved Tag Manager change routes them.
When that change is made:

- retain the existing three event names;
- add the two newer diagnostic events;
- pass only the event-specific, low-cardinality parameters needed for reports;
- do not send `link_text`, inquiry references, form answers, or payment values;
- register only useful low-cardinality GA4 custom dimensions;
- do not mark any of these five events as a primary advertising conversion;
- use either a direct advertising conversion tag or a GA4 import for one real
  business outcome, never both.

Publishing repository code does not authorize or perform a GTM publication,
GA4 configuration change, Google Ads goal change, or advertising-budget change.

## Validation

Run the local behavior and privacy tests with:

```sh
node --test _seo/seo-measurement.test.cjs
```

The tests cover attribution precedence and expiry, hostile or unknown campaign
input, AI-domain boundary checks, storage denial, safe click destinations,
service engagement, contact-form validation, private Formspree metadata, and the
absence of sensitive form data from custom analytics events.

Before deployment, also:

1. Build the Jekyll site.
2. Inspect the rendered measurement configuration and script path.
3. Use Tag Manager Preview to verify the legacy events still fire.
4. Confirm an invalid or too-fast form does not emit an inquiry-attempt event.
5. Confirm a valid form still follows Formspree's native submission and
   anti-spam/CAPTCHA path.
6. Verify received inquiries in Formspree or the inbox rather than inferring
   receipt from the browser event.

## Reporting cadence

- Weekly: completed Search Console 28-day comparison, major page/query changes,
  service-path behavior, and received inquiry quality.
- Monthly: non-branded query direction, high-impression/low-CTR opportunities,
  service engagement, contact pathways, and source-to-inquiry reconciliation.
- Quarterly: indexing and content-cluster direction, qualified opportunities,
  signed work, paid engagements, and actual collected/refunded revenue.

Do not react to daily volatility or optimize campaigns toward time-on-page,
scrolling, contact-page visits, or unverified form attempts.
