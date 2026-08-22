# Organic search measurement plan

## Search Console views

Use completed data only; Search Console commonly trails the current date.

- **Branded queries:** filter queries matching `bill vivino|billvivino|vivino technology`.
- **Non-branded queries:** exclude that same expression.
- **Articles:** filter pages matching `/(posts/|blog/)` and review `blog.html` separately.
- **Tools:** filter pages matching `(calculator|estimator|analyzer|detector|stress-test|scenario-planner|scoping-tool|reality-check)`.
- **Commercial pages:** review `services.html`, `pricing.html`, `app-rescue-assessment.html`, `ai-integration-consultant.html`, `senior-mobile-app-developer.html`, and `fractional-cto-technical-advisor.html` together.

## Cadence

- Weekly: compare the latest complete 28 days with the previous 28 days.
- Monthly: review non-branded queries, pages gaining impressions, service-path clicks, and contact-intent clicks.
- Quarterly: compare the latest three months with the previous three months and review indexing by content cluster.

Do not react to a daily or seven-day click swing unless qualified inquiries move with it.

## Investigation thresholds

Investigate when at least one of these persists across a complete 28-day period:

- Non-branded clicks fall 25% or more and impressions or average position also deteriorate.
- A primary guide loses material impressions across its cluster.
- A high-impression tool remains on page one but its CTR does not improve after a title or snippet change.
- Organic visits reach service pages but `contact_intent_click` does not follow.
- Submitted-page exclusions begin showing technical reasons rather than Google's discovered/crawled selection states.

## Data-layer events

- `seo_content_view`: identifies site, article, tool, and service page views.
- `seo_path_click`: records article-to-pillar, article-to-service, tool-to-service, and service-to-contact pathways.
- `contact_intent_click`: records contact-page, email, and phone intent.
- `app_rescue_assessment_checkout_start`: records an eligible visitor leaving `app-rescue-assessment.html` for the hosted PayPal payment link. This is not a conversion.
- `app_rescue_assessment_purchase`: records a successful PayPal auto-return to `payment-thanks.html` when the browser has a recent App Rescue checkout reference. Route this to a primary Google Ads purchase conversion with `value`, `currency`, and `transaction_id`.
- `hourly_consulting_checkout_start`: records a visitor leaving a site-controlled hourly purchase CTA for the hosted PayPal payment link. This is not a conversion.
- `hourly_consulting_purchase`: records a successful PayPal auto-return when the browser has a recent hourly checkout reference. Route this to a separate primary Google Ads purchase conversion, but do not assign a dynamic revenue value from the website event.
- `general_project_inquiry_submit`: records the secondary inquiry form for selected prototype/MVP work, referrals, and partnerships. Keep this secondary for paid-search bidding.

Google Tag Manager must route these custom events to the analytics destination used for reporting.

The hourly PayPal link allows 1–40 hours to be selected on PayPal. PayPal's hosted auto-return does not return that purchased quantity to this static site, so the hourly event reports the $175 unit price but deliberately omits `value`. Reconcile actual hourly revenue from PayPal, or add a verified PayPal transaction/webhook integration before importing dynamic conversion values into Google Ads. Do not hard-code every hourly purchase as a one-hour $175 sale.

## Google Tag Manager routing

- Trigger the fixed-fee Google Ads purchase tag only on `app_rescue_assessment_purchase`. Pass `value`, `currency`, and `transaction_id` from data-layer variables.
- Trigger a separate count-only Google Ads purchase tag on `hourly_consulting_purchase`. Leave conversion value unset because PayPal selects the final quantity after the visitor leaves the site.
- Send both checkout-start events to analytics for funnel reporting, but do not mark them as primary campaign conversions.
- Use either direct Google Ads conversion tags or conversions imported from GA4 for a given purchase event, not both, to avoid double counting.
- The current `transaction_id` is a locally generated checkout reference used for deduplication. It is not the PayPal transaction ID and must not be used to reconcile revenue.
