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

## Butterfly Wing Scale Refinement

- [x] Enlarge both butterfly wings for a clear, balanced silhouette.
- [x] Strengthen the centered body, wing shading, and resting scale on mobile.
- [x] Preserve live wing movement, variant colors, and reduced-motion support.
- [x] Validate the final visual with type-check, build, tests, and mobile preview.

## Butterfly Detail and Landing Petals

- [x] Add fine vein details inside both butterfly wings.
- [x] Add a tiny localized petal tremble directly below the butterfly’s feet.
- [x] Synchronize the petal response with the butterfly’s landing timing.
- [x] Validate the completed bouquet with type-check, build, tests, and mobile preview.

## Premium Flower Variety Expansion

- [x] Add premium procedural flower families: Peony, Orchid, and Ranunculus.
- [x] Add unique silhouettes, layering, highlights, and cute interaction copy for each family.
- [x] Integrate premium families into deterministic bouquet styles and flower-family selection.
- [x] Validate representative premium bouquets on mobile with type-check, build, and tests.

## Premium Stem and Leaf Design Update

- [x] Add curved, fuller peony stems with broad leaf silhouettes.
- [x] Add slender, arching orchid stems with elegant lance-shaped leaves.
- [x] Add layered ranunculus stems with softer rounded foliage.
- [x] Add family-specific stem weight and foliage finish while preserving responsive rendering.
- [x] Validate representative premium bouquets with type-check, build, tests, and mobile previews.

## Premium Accents, Luxury Wrap, and Growth Motion

- [x] Add eucalyptus-style accents, fern branches, and baby’s-breath dots to premium bouquets.
- [x] Add a gold-thread luxury ribbon finish whenever premium flowers are present.
- [x] Add subtle leaf shimmer and foliage sway during the growth phase.
- [x] Preserve reduced-motion behavior and validate completed/growing responsive states.
- [x] Run type-check, production build, and tests successfully.

## Private Creator Bouquet Modes

- [x] Add exactly two creator choices: All Flowers and Premium Only.
- [x] Keep the selector hidden unless the private creator flag is present.
- [x] Generate premium-only bouquets using only Peony, Orchid, and Ranunculus.
- [x] Preserve mode through no-repeat generation and shared bouquet URLs.
- [x] Remove the creator flag from shared links so receivers see only the finished bouquet.
- [x] Validate creator and receiver mobile states, mode output, type-check, build, and tests.

## Public Bouquet Choice and Clean Composition

- [x] Make All Flowers and Premium Only visible to every visitor on the normal opening screen.
- [x] Clarify that mixed All Flowers bouquets can include premium blooms.
- [x] Remove the dense grass, leaf, and accent foliage layer from the bouquet render.
- [x] Keep only three clean hero stems so the flower silhouettes stay readable.
- [x] Validate the public chooser and simplified receiver bouquet on mobile with type-check, build, and tests.

## Stem Restoration and Leaf Cleanup Correction

- [x] Restore a clean stem for every flower in the bouquet.
- [x] Keep the extra leaf layer, grass-like foliage, eucalyptus, fern, and baby’s-breath accents hidden.
- [x] Override the earlier hero-only stem rule so smaller blooms are also connected naturally.
- [x] Validate the corrected premium bouquet with type-check, tests, and mobile preview.

## Bouquet Replan and Final Visual Audit

- [x] Reintroduce controlled foliage so bouquets feel botanical without becoming crowded.
- [x] Differentiate mixed bouquets with balanced classic leaves and premium bouquets with fewer, larger sculptural leaves.
- [x] Keep eucalyptus, fern, and baby’s-breath accent branches disabled to avoid visual clutter.
- [x] Restore mode-aware bouquet metadata and preserve All Flowers versus Premium Only behavior.
- [x] Keep every flower stem visible and ensure flower/leaf geometry remains inside the SVG canvas.
- [x] Reduce mobile rendering cost for filler blooms and respect reduced-motion preferences.
- [x] Validate mixed and premium mobile previews, geometry bounds, type-check, production build, and tests.

## Fuller Bouquet Foliage Refinement

- [x] Increase mixed-bouquet foliage to a fuller 13–18 leaves.
- [x] Increase premium-bouquet foliage to 9–12 larger, more sculptural leaves.
- [x] Add a short connecting branch stem beneath every leaf.
- [x] Keep the foliage within safe canvas bounds and preserve the mixed/premium visual distinction.
- [x] Validate mobile previews, leaf counts, type-check, production build, and tests.

## Stem-Anchored Professional Arrangement

- [x] Derive leaf positions from real hero/support flower stems instead of free-scattering them.
- [x] Anchor leaves through the middle and lower bouquet structure for a natural hand-tied silhouette.
- [x] Add short branch stems that visibly return from each leaf toward its parent stem.
- [x] Preserve fuller mixed foliage and restrained premium foliage as separate visual systems.
- [x] Validate mobile composition, leaf ranges, type-check, production build, and tests.

## Synchronized Bouquet Growth Motion

- [x] Add a gentle synchronized sway to the main stem network.
- [x] Add a slightly offset leaf sway so foliage follows the stems naturally.
- [x] Add restrained hero-bloom settling motion after the flowers appear.
- [x] Scope motion to the growing phase, preserve the finished bouquet, and respect reduced-motion settings.
- [x] Validate with type-check, production build, tests, and responsive growth previews.

## Final Bouquet Arrangement Audit

- [x] Add explicit parent-stem coordinates to every generated leaf.
- [x] Draw each leaf branch directly to its real parent stem instead of using a fixed curve.
- [x] Preserve a balanced florist-style hierarchy of hero, support, and filler blooms.
- [x] Check mixed and premium bouquets at mobile and desktop sizes for attachment, spacing, and clipping.
- [x] Re-run type-check, production build, tests, and deterministic anchor validation.

## Synchronized Leaf Growth Animation

- [x] Add per-leaf stagger timing during bouquet growth.
- [x] Draw each leaf’s connecting branch before its leaf silhouette appears.
- [x] Unfold leaves alongside the stem network instead of revealing them after growth completes.
- [x] Preserve the final bouquet arrangement and reduced-motion behavior.
- [x] Validate with type-check, production build, tests, and responsive previews.

## Full Debugging Audit

- [x] TypeScript check passes.
- [x] Production build passes with only existing asset-resolution/chunk-size warnings.
- [x] Full Vitest suite passes: 3 files, 6 tests.
- [x] Add bouquet-engine regression coverage for premium mode, mixed mode, determinism, leaf anchors, and canvas bounds.
- [x] Geometry and mode checks pass across five names and both bouquet modes.
- [x] Mobile and desktop responsive previews show no visible clipping or layout regressions.
- [x] Dev-server logs contain only pre-existing auth-session signature warnings, with no bouquet/runtime errors.

## Replay Growth Control

- [x] Add a Replay growth button to the completed bouquet interface.
- [x] Restart the current bouquet at 0% without generating a new variation or refreshing the page.
- [x] Reset selected flower state, celebration particles, dialogs, and share status.
- [x] Restart the ambient melody from the beginning when replaying.
- [x] Preserve the current name, note, bouquet mode, and palette.
- [x] Validate desktop/mobile placement, type-check, production build, and all tests.

## Leaf Attachment and QR Growth Playback Fix

- [x] Correct leaf branches for rotation and scale so each short petiole reaches its intended parent stem.
- [x] Recheck mixed and premium bouquets for natural leaf placement and visual balance.
- [x] Add a `play=1` flag to generated, shared, and QR bouquet links.
- [x] Make scanned/shared links open the cinematic opening and growth sequence instead of the finished bouquet.
- [x] Preserve the exact name, variation, note, melody mood, and bouquet mode through QR playback.
- [x] Validate with type-check, production build, tests, link-flag checks, and responsive previews.
