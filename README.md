# Jeremy · Level 41
A cinematic, responsive one-day birthday planner for Jeremy Dumas. Plain HTML, CSS, and JavaScript, with no build step.

## Connect the email
Create a **separate** Formspree form named **Jeremy 41st Birthday Planner** in the account that should receive Jeremy's answers. Set its notification recipient to the desired email address, complete any confirmation Formspree requests, and copy the form's `https://formspree.io/f/...` endpoint into `FORMSPREE_ENDPOINT` in `email.js`. Do not use the previous birthday form's endpoint. The submit button only shows the celebration after a successful response. Test delivery to the inbox separately.

## Deploy
Use GitHub Pages from the `main` branch and repository root. The site has no server dependency. The user-supplied MP3 is hosted as `birthday-anthem.mp3`. A single looping audio element remains outside all planner screens, preserving playback across forward/back navigation, review and submission. The page requests playback immediately; if the browser blocks audible autoplay, the first tap or key interaction retries playback. The header provides pause/resume controls, and a deliberate pause is respected. Full sound autoplay cannot be guaranteed by any website across browsers. All choice sections support multiple selections without a fixed cap. Each opening-button press clears the planner. Unsent answers persist within the same tab session.
