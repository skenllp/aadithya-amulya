# Aadithya & Amulya — Engagement Invitation
Static site, no build. Open index.html or deploy the folder (Vercel/Netlify/GitHub Pages).
- RSVP: set RSVP_WHATSAPP ('91XXXXXXXXXX') or RSVP_ENDPOINT at the top of the script in index.html. Until then the form says nothing was sent.
- After deploying, change og:image / twitter:image in <head> to the full https:// URL of assets/og-image.jpg.
- assets/opening.mp4 is the provided video, unmodified. assets/neelashalabam.mp3 is carried over from the original; replace to change.

## Google Sheet RSVP setup
1. Create a Google Sheet (e.g. "Aadithya & Amulya RSVP"). Extensions → Apps Script.
2. Delete the default code, paste everything from `apps-script/Code.gs`, Save.
3. Deploy → New deployment → type **Web app** → Execute as **Me** → Who has access **Anyone** → Deploy. Authorize when asked.
4. Copy the Web app URL (ends in `/exec`) and paste it into `RSVP_SHEET_URL` at the top of the script in `index.html`.
5. Test: open the `/exec` URL (should show `"RSVP endpoint is live"`), then submit the form on the site.
If you edit Code.gs later, use Deploy → Manage deployments → Edit → New version, or the live URL keeps the old code.
