# Jeremy · Level 41
A cinematic, responsive one-day birthday planner for Jeremy Dumas. Plain HTML, CSS, and JavaScript, with no build step.

## Connect the email
Create a **separate** Formspree form named **Jeremy 41st Birthday Planner** in the account that should receive Jeremy's answers. Set its notification recipient to the desired email address, complete any confirmation Formspree requests, and copy the form's `https://formspree.io/f/...` endpoint into `FORMSPREE_ENDPOINT` in `email.js`. Do not use the previous birthday form's endpoint. The submit button only shows the celebration after a successful response. Test delivery to the inbox separately.

## Deploy
Use GitHub Pages from the `main` branch and repository root. The site has no server dependency; The supplied YouTube video plays in a persistent, visible embedded player, requested immediately when the page loads and retried on Begin when the player is ready. The integrated soundtrack panel never overlays the planner; pause and volume controls remain in the YouTube player. Browser autoplay restrictions or the video owner may still require a direct Play tap or prevent embedding. The player stays outside the changing planner screens. All choice sections support multiple selections without a fixed cap. Each opening-button press clears the planner. Unsent answers persist within the same tab session.
