---
layout: post
title: "Why I Prefer Native iOS and Android Development in the AI Era"
description: "AI changes the cost of building in Swift and Kotlin. Why I favor native mobile development, where React Native still fits, and what still needs verification."
date: 2026-09-12 08:00:00 -0400
author: Bill Vivino
categories: [mobile-app-development, software-engineering]
tags: [native mobile development, Swift, Kotlin, AI-assisted development, React Native, iOS, Android]
seo_cluster: "mobile-systems"
og_image: "/assets/optimized/mobile_apps.webp"
---

My default for new mobile development is native: Swift on iOS and Kotlin on Android.

AI is a significant reason for that preference. I can translate functionality between Kotlin and Swift quickly. That changes how I weigh the benefit of sharing one implementation against the benefit of working directly with each platform.

It does not mean every React Native app should be rewritten. It means I no longer assume that supporting two platforms makes a shared UI framework the economical default.

## My Workflow: Manual Testing and AI-Assisted Smoke Tests

In recent mobile projects, I manually test and adjust the work. AI also helps me with automated smoke testing: checks that exercise the app's basic functionality.

That testing is part of the development work, not a separate argument against using AI. I can use AI to move quickly between Swift and Kotlin and still take responsibility for examining the result. Generating the second implementation is progress; it is not, by itself, proof that the feature is finished.

Those are complementary parts of the process. Smoke tests help check whether important paths still work. Manual testing gives me another way to examine behavior, catch problems, and refine what the generated implementation gets wrong.

A passing smoke test answers a limited question about the paths it covers. It does not establish that every interaction feels right, every edge case is handled, or the implementation respects each platform's conventions. Manual testing also has limits, which is why repeatable automated checks are useful alongside it.

This combination is central to my preference for native development. Faster implementation makes Swift and Kotlin more practical for me; testing and adjustment are how I work toward a result I can stand behind. I want the efficiency of AI assistance and the ability to inspect and refine each native app directly.

## AI Changes the Cost of Building Twice

One of the strongest arguments for React Native is avoiding repeated implementation. A team can build much of a feature once and deliver it on both iOS and Android.

That remains a real benefit. But its value depends on how expensive the second implementation would otherwise be.

With AI assistance, an existing Swift implementation can provide a concrete reference for Kotlin work, and vice versa. The product behavior, data model, backend expectations, and edge cases do not need to be rediscovered from a blank page. They can become inputs to the second implementation and its tests.

The distinction matters: I want to carry the **behavior** across platforms, not mechanically reproduce the first platform's code or interface.

For my work, that makes native development more attractive. I can use each platform's own tools and conventions while reducing some of the repeated implementation work that previously made a shared codebase so compelling.

## Shopify Reached a Similar Conclusion

On September 10, 2026, Shopify [announced its move from React Native back to Swift and Kotlin](https://shopify.engineering/back-to-native). Its explanation centers on coding agents changing the cost of implementing features on both platforms, rather than React Native suddenly becoming incapable of delivering good apps.

Shopify also [reported that the Shop app's native rebuild reached the app stores in twelve weeks](https://shopify.engineering/shop-app-migration). That is Shopify's result, not a timeline I would promise for somebody else's product.

Their decision is relevant because the underlying tradeoff resembles mine. It is not a universal prescription. A large company's tooling, staff, and migration budget do not automatically translate to a smaller team.

## Native Experience Still Matters

The reason I value native expertise is that generating a screen is only part of delivering its behavior. Someone still has to understand what happens when the app loses connectivity, authentication expires, media consumes too much memory, or the operating system interrupts a task.

AI can help implement and investigate those paths. It does not make them disappear.

## What Translation Still Has to Preserve

Consider a profile-photo feature implemented on iOS that also needs to work on Android. This is an illustrative example, not a description of one of those projects.

AI can help translate the data structures, network calls, validation, and screen states into a Kotlin implementation. The harder question is what counts as the same finished feature.

I would want both versions checked against the same outcomes:

- The correct user is authorized to upload and retrieve the image.
- The backend records the new image reference.
- A failed upload does not leave a false success state.
- The app stops displaying a stale cached image.
- The change survives closing and reopening the app.
- Permissions and interrupted work behave appropriately on each platform.

Those are product requirements, not Swift syntax or Kotlin syntax. A generated implementation that compiles can still miss them.

I cover this distinction in more depth in [Mobile App Feature Parity Is Not Screenshot Matching](/posts/mobile-app-feature-parity-ios-android.html). Native apps can have different interfaces while honoring the same business rules.

## When I Would Keep React Native

A preference for native development is not a reason to discard a working product.

If a React Native app is stable, its team knows the stack, and it supports the features the business needs, staying with it may be the better decision. Cross-platform experience remains useful for reviewing that choice honestly.

For an existing app, I would first look at the actual constraints: release blockers, platform integrations, maintenance effort, performance evidence, team capability, and the cost of changing direction. A migration needs a specific benefit that justifies its disruption.

For a new project, I favor Swift and Kotlin while still checking that the scope and ongoing support for both platforms fit the budget. AI reduces some implementation effort; it does not remove two release processes or the responsibility to maintain both apps.

## What This Means for a Client

My offer is not an unreviewed conversion of one codebase into another. It is senior mobile development with AI used to shorten the implementation loop.

The intended result is an app built for its platform, with behavior that can be explained, tested, and maintained. The value of faster code generation is the room it creates for getting those details right.

If you are planning a native app, adding Android to an iOS product, or deciding what to do with an existing mobile codebase, explore my [native iOS and Android development services](/senior-mobile-app-developer.html) or [iOS consulting work](/ios-app-development-consultant.html). [Get in touch](/contact.html) with the current product, target platforms, and the problem you need solved.
