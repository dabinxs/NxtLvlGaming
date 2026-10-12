# Website CMS setup

The CMS uses Firebase Authentication and Cloud Firestore. It does not use Cloud Functions or Firebase Storage. Image uploads are resized in the browser and stored as individual Firestore documents, which keeps this small site on Firebase's no-cost plan within the Firestore free quotas.

## One-time Firebase project-owner steps

1. Open [Authentication setup](https://console.firebase.google.com/project/nextlevelgaming-events/authentication/providers). Select **Get started** if shown, then enable **Email/Password**.
2. Open [Firestore Database](https://console.firebase.google.com/project/nextlevelgaming-events/firestore). A project owner can select **Create database**, choose **Standard edition**, select `us-east1`, and start in production mode. The site code does not require a billing account. If creating it from the CLI, the account used by Firebase CLI needs the Google Cloud **Datastore Owner** role (`roles/datastore.owner`) or project **Owner** role. The current CLI account is `kcbianzon@gmail.com`.
3. From the `frontend` folder, run `npm run deploy:cms-rules` after the database exists. Firestore rules are separated into `firebase.cms.json`; regular `firebase deploy` publishes Hosting only. Use `npm run deploy` to build and publish the site.
4. Open `/cms` on the website. For the first login, select **First time? Create the owner account**, use `team@nextlevelgamingevents.com`, and verify it using the email link. Then sign in with that account.

The CMS rules allow public visitors to read published page text and images, and allow only the verified `team@nextlevelgamingevents.com` account to change or remove them. To add another editor later, add their verified email to `frontend/firestore.rules` and the allowlist in `frontend/src/components/AdminPage.jsx`, then redeploy the rules.

Google Analytics is not linked to this Firebase project yet. Until an Analytics property is linked in Firebase, the dashboard shows the content and system status but reports visitor analytics as unavailable rather than inventing traffic numbers.
