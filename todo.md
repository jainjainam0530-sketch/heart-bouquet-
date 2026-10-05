# Combined Gift Website Todo

- [x] Reconcile the newly supplied brief with the existing digital love bouquet content.
- [x] Confirm the opening “I love you” universe, cinematic transition, and code-built bouquet remain part of the combined experience.
- [x] Preserve the mobile-first layout and verify there is no horizontal overflow.
- [x] Verify flower tap interactions, short romantic messages, bloom timing, and heart-particle responses.
- [x] Verify the typed bouquet message and final “One more thing” reveal.
- [x] Run the full page-load-to-final-reveal journey on desktop and portrait mobile.
- [x] Save a final checkpoint and deliver the project version.

## Bloom For You Personalization Update

- [x] Add the personal introduction and best-friend name-entry experience.
- [x] Normalize the entered name and derive a deterministic seed.
- [x] Use the seed to vary palette, flower selection, count, sizes, arrangement, stems, leaves, and note copy.
- [x] Expand the procedural flower library with cherry blossoms, daisies, sunflower, hibiscus, lavender, carnation, and wildflowers where selected.
- [x] Add personalized bouquet generation, a cute/flirty note, and a grow-another-bouquet flow.
- [x] Validate that different names produce visibly different, repeatable bouquets.

## Natural Personal Gift Refinement

- [x] Replace the intense opening wording with a more comfortable, general gift introduction.
- [x] Add the author credit: “A small gift from Jainam to you.”
- [x] Ensure the garden card lists exactly the unique flower varieties rendered in the bouquet.
- [x] Rewrite the note templates in a simple, specific first-person voice that feels handmade by Jainam.
- [x] Validate the revised opening, bouquet card, notes, and final scene on mobile and desktop.

## Exact Note and CTA Refinement

- [x] Use Jainam’s supplied note verbatim for every completed bouquet.
- [x] Preserve the note’s line breaks and friendly sign-off in the garden note area.
- [x] Rename the primary action to “Grow My Garden.”
- [x] Give the primary action a clearer hover, press, and focus treatment.
- [x] Validate the note and CTA on mobile and desktop.

## Bouquet Variation Update

- [x] Make different names choose visibly different flower families.
- [x] Make palette, silhouette, scale, stems, foliage, and ribbon color vary with the name seed.
- [x] Compare multiple named bouquets in preview and verify they do not default to the same visual composition.

## No-Repeat Bouquet System

- [x] Add a persistent variation counter for every new bouquet generation.
- [x] Store a short recent-bouquet history in browser storage.
- [x] Avoid reusing recent variation combinations, including flower family, style, palette, and arrangement.
- [x] Keep shared or bookmarked bouquet URLs reproducible when a variation ID is present.
- [x] Validate repeated generations visually and confirm each result changes from the previous bouquet.

## Social Sharing Update

- [x] Add a visible Share button on the final bouquet screen.
- [x] Add dedicated WhatsApp and Instagram actions.
- [x] Keep a general Web Share action and copy-link fallback.
- [x] Preserve the bouquet name and variation ID in every shared URL.
- [x] Validate the share controls on mobile and desktop.

## QR Code Sharing Update

- [x] Add a Generate QR code action to the final sharing controls.
- [x] Encode the exact bouquet name and variation URL in the QR payload.
- [x] Show the QR code in an accessible responsive dialog or panel.
- [x] Add a download option for the generated QR image.
- [x] Validate QR rendering and mobile presentation.

## Professional Debugging Audit

- [x] Audit TypeScript, production build, dependency health, and runtime logs.
- [x] Trace opening, name entry, growth, bouquet, final, and reset state transitions.
- [x] Verify no-repeat persistence, recent-history avoidance, and reproducible variation URLs.
- [x] Verify general share, WhatsApp, Instagram, copy-link, QR generation, QR download, and QR payload behavior.
- [x] Check responsive layouts, keyboard focus, accessible labels, and runtime console/network errors.
- [x] Re-run the complete validation suite and document any fixes.

## Loading and Final CTA Refinement

- [x] Add a beautiful staged loading animation while the unique bouquet is generated.
- [x] Rotate natural garden-building status messages during generation.
- [x] Respect reduced-motion preferences for the new loading treatment.
- [x] Make One more thing more visibly clickable with clear hover, press, and focus states.
- [x] Validate loading timing and final CTA behavior on mobile and desktop.

## Success Transition and Custom Note System

- [x] Add a subtle success transition effect (bloom/glow) when the bouquet finishes growing.
- [x] Implement a proper custom-note editing system in the intro screen.
- [x] Ensure the custom note persists in the shared URL (base64 encoded).
- [x] Provide a "Reset to Default" option for the note.
- [x] Validate the transition and note persistence on mobile and desktop.

## Background Melody Update

- [x] Generate a soft, ambient background melody (lo-fi/piano/orchestral).
- [x] Implement an audio player that starts when bouquet growth begins.
- [x] Add a visible sound toggle (Mute/Unmute) to the UI.
- [x] Handle browser autoplay restrictions with a user-interaction trigger.
- [x] Validate audio playback and controls on mobile and desktop.

## Selectable Melody Moods Update

- [x] Generate three distinct background melodies: Dreamy (current), Whimsical, and Classic.
- [x] Add a "Melody Mood" selector to the intro and bouquet scenes.
- [x] Ensure the selected melody ID persists in the shared URL.
- [x] Implement seamless audio switching when the mood is changed.
- [x] Validate mood persistence and playback on mobile and desktop.

## Printable Gift Card Update

- [x] Design a clean, elegant printable gift-card layout with QR code and a dedicated personal-message column.
- [x] Add a "Print Gift Card" action to the final sharing scene.
- [x] Implement `@media print` styles to ensure the card prints cleanly on A4/Letter.
- [x] Ensure the QR code and exact bouquet link are correctly embedded.
- [x] Validate the print preview and layout on mobile and desktop.

## Slide-Out Melody Panel Update

- [x] Hide melody choices from the main screen behind the sound control.
- [x] Add a slide-out music panel with Dreamy, Whimsical, and Classic choices.
- [x] Keep the mute/unmute control visible and accessible in the panel.
- [x] Support closing the panel by selecting a melody, clicking outside, or pressing Escape.
- [x] Validate the panel and melody switching on mobile and desktop.

## Logo Update

- [x] Generate a cute, minimalist logo (flower/heart motif).
- [x] Ensure the logo has a transparent background.
- [x] Replace the current logo in the website header and gift card.
- [x] Update the favicon with the new logo.
- [x] Validate the logo appearance at various sizes.

## Logo Refinement Update

- [x] Refine the minimalist logo with a new color palette.
- [x] Preserve the flower/heart motif and transparent background.
- [x] Update the website and favicon with the recolored version.
- [x] Validate the new palette’s contrast and readability.

## Cute Realistic Bouquet Loading Refresh

- [x] Add a soft breathing glow behind the bouquet while it grows.
- [x] Add subtle firefly lights and a small heart indicator for a warmer, cuter loading mood.
- [x] Refine the progress track with rounded styling and a gentle moving glint.
- [x] Preserve reduced-motion behavior and validate desktop/mobile rendering.

## Post-Growth Celebration Update

- [x] Trigger a short celebration during the existing bouquet success-bloom window.
- [x] Add refined sparkle-ring and starburst details.
- [x] Add lightweight color-matched confetti particles that fade before the final state.
- [x] Preserve reduced-motion behavior and validate the journey on responsive previews.

## Completed Bouquet Butterfly

- [x] Add a decorative butterfly only after the bouquet has finished growing.
- [x] Animate a short flight path around the flowers before settling near the upper blooms.
- [x] Add continuous live wing movement with a reduced-motion fallback.
- [x] Validate the completed bouquet on mobile plus type-check, build, and tests.

## Butterfly Polish and Flower Landing Response

- [x] Add three deterministic butterfly visual variants tied to bouquet variation.
- [x] Refine wing gradients, silhouettes, antennae, and body shading for a more professional finish.
- [x] Add a delayed, subtle bouquet sway when the butterfly reaches the landing point.
- [x] Preserve reduced-motion behavior and validate multiple bouquet variants on mobile.
