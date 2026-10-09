# Form email delivery

The contact and quote forms call the Firebase Hosting rewrite at `/api/submit-form`. The Cloud Function sends submissions to `kcbianzon@gmail.com` using Gmail SMTP. SMTP credentials are Firebase Secrets and are never shipped to the browser.

## One-time setup

1. Enable billing for the Firebase project if Cloud Functions asks for the Blaze plan.
2. In the Gmail account that will send the messages, enable 2-Step Verification and create an App Password. Do not use the account's regular password.
3. From `frontend`, set the two secrets. Use `kcbianzon@gmail.com` for `SMTP_USER` and the generated App Password for `SMTP_APP_PASSWORD`:

   ```sh
   firebase functions:secrets:set SMTP_USER
   firebase functions:secrets:set SMTP_APP_PASSWORD
   ```

4. Build and deploy Hosting plus the function:

   ```sh
   npm run build
   firebase deploy --only functions,hosting
   ```

The website will report success only after Gmail accepts the message. Replies to the notification go to the address entered in the form.

For local function-emulator work, set `REACT_APP_FORM_API_URL` in an ignored `.env.local` file to the emulator's `submitForm` URL before starting the React app.
