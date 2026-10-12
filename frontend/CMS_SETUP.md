# Website CMS setup

The CMS uses Firebase Authentication and Cloud Firestore. It does not use Cloud Functions or Firebase Storage. Image uploads are resized in the browser and stored as individual Firestore documents, which keeps this small site on Firebase's no-cost plan within the Firestore free quotas.

## One-time Firebase project-owner steps

1. Open the [Firebase Console](https://console.firebase.google.com/project/nextlevelgaming-events/overview) for `nextlevelgaming-events`.
2. Open **Build → Firestore Database → Create database**. Choose **Standard edition**, select `us-east1`, and start in production mode. Choose the **Spark** plan; the CMS does not need a billing account.
3. Open **Build → Authentication → Get started → Sign-in method** and enable **Email/Password**.
4. Deploy the access rules from the `frontend` folder with `npm run deploy:cms-rules`.
5. Open `/cms` on the website, create the owner account using `team@nextlevelgamingevents.com`, and verify it using the email link. Then sign in with that account.

The CMS rules allow public visitors to read published page text and images, and allow only the verified `team@nextlevelgamingevents.com` account to change or remove them. To add another editor later, add their verified email to `frontend/firestore.rules` and the allowlist in `frontend/src/components/AdminPage.jsx`, then redeploy the rules.

Google Analytics is not linked to this Firebase project yet. Until an Analytics property is linked in Firebase, the dashboard shows the content and system status but reports visitor analytics as unavailable rather than inventing traffic numbers.
