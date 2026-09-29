---
layout: post
title: "FCM Tokens and Coil HTTP 401: Two Production Debugging Lessons"
description: "Two bugs from my mobile work: missing Firebase Admin credentials blocked notifications, and Coil image requests needed the authenticated session cookie."
date: 2026-07-09
last_modified_at: 2026-09-28
permalink: /posts/fcm-tokens-and-coil-http-401-two-production-debugging-lessons.html
categories: software-development mobile-app-development firebase debugging ai
og_image: "/assets/optimized/human-engineers-thumb.webp"
---

<style>
  .tldr-box {
    background: #fff7d6;
    border-left: 4px solid #f4c542;
    padding: 16px 20px;
    border-radius: 6px;
    margin: 20px 0;
  }

  .blog-img-right {
    max-width: 30%;
    float: right;
    margin-left: 20px;
    margin-bottom: 20px;
    display: block;
  }

  .blog-img-right img {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    height: auto;
  }

  @media (max-width: 768px) {
    .blog-img-right {
      max-width: 100%;
      float: none;
      margin: 20px 0;
    }
  }
</style>

<div class="tldr-box">
  <strong>TL;DR</strong><br />
  An iOS FCM token reached the backend, but missing Firebase Admin credentials left the send client uninitialized. An Android image URL resolved, but Coil's request needed the authenticated session cookie. Both bugs required tracing what actually crossed the boundary between the app and the backend.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/human-engineers-thumb.avif" type="image/avif" />
  <source srcset="/assets/optimized/human-engineers-thumb.webp" type="image/webp" />
  <img
    src="/assets/optimized/human-engineers-thumb.webp"
    alt="Human software engineer reviewing code and guiding AI-assisted development"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

Two bugs from my mobile development work explain more about production debugging than another argument about whether AI can write code.

In one case, an iOS app generated a Firebase Cloud Messaging (FCM) token and the backend stored it, but notifications were not arriving. In the other, an Android profile image had a resolved URL, but Coil returned `HTTP 401: Unauthorized` when it tried to load the image.

Both features looked close. Neither failure was explained by the part that appeared to be working.

## An FCM Token Did Not Prove the Backend Could Send

The iOS app was successfully generating an FCM token. The backend was storing it. Everything looked superficially close.

But notifications still were not arriving.

We had to trace the system rather than stop at the presence of a token:

- iOS APNS registration
- Firebase token timing
- backend token upload
- database rows
- backend send function
- Firebase Admin initialization

Eventually, the real issue was that the backend Firebase Admin client was not initialized because the service account credentials were missing. The function reached the send path but exited because `fcm` was null.

The token-generation and storage steps were working. They did not establish that the backend had an initialized client capable of sending a notification.

That distinction narrowed the problem. The symptom appeared on a phone, but the identified failure was in backend initialization.

Missing credentials were the cause in this system. They are not an explanation for every notification-delivery failure. The useful lesson is to verify each boundary instead of treating one successful step as proof of the whole workflow.

## A Resolved Image URL Did Not Prove the Request Was Authenticated

The Android profile-image problem had a similar shape.

The DTO was eventually correct. The image URL resolved. Coil attempted to load it. But it failed with:

```text
HTTP 401: Unauthorized
```

That told us the image endpoint required the authenticated session cookie. The fix was not "make the URL better." The fix was to attach the cookie from the app's authenticated cookie jar to the Coil image request.

The important boundary was the image request itself. A correct data-transfer object and a resolved URL were not enough: the request also had to meet that endpoint's authentication requirements.

This was a session-cookie-protected endpoint. It is not a general instruction to add session cookies to every image request, or a claim that every Coil `401` has this cause. The endpoint's contract determined what this request needed.

The scope mattered, too. Restoring profile-image display did not require adding image upload. I had to keep display parity separate from a new feature.

## What These Failures Had in Common

In both cases, a working component made the overall feature look healthier than it was:

- A generated and stored FCM token did not prove that Firebase Admin was initialized.
- A resolved image URL did not prove that Coil's request carried the required session.

The next question was not "Can we generate another implementation?" It was "What happened when this code actually ran?"

That meant inspecting the relevant code paths, using the debugger, checking network responses, and comparing the app's assumptions with the backend's behavior.

## Where AI Helped—and Where I Still Had to Decide

I use agentic coding tools heavily. They can help inspect code, trace related implementations, and cover more of a system. But in this work I still had to constrain the scope, review the plan and diff, run the app, and correct assumptions that did not match the actual system.

The value of that review was concrete: distinguish a backend initialization problem from a token problem, and an authenticated request problem from an image URL problem.

These examples do not settle every question about AI and software jobs. They show why generating a plausible implementation and diagnosing a running product are different tasks.

For an existing application that looks nearly finished but still fails in important workflows, the [App Rescue Assessment](/app-rescue-assessment.html) offers a focused technical diagnosis before deciding what to repair next.
