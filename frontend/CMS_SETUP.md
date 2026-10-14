# Website CMS setup

The CMS uses Supabase Authentication, Postgres, and Storage. Firebase remains configured only for static website hosting. The quote and contact forms keep their existing email submission flow.

## One-time Supabase setup

1. Open the Supabase project `plyjyqyozzeoickaywkd` and go to **SQL Editor**.
2. Run the complete script in `supabase/cms_setup.sql`. It creates the CMS tables, the public media bucket, novelty design inbox, and row-level security policies. Only confirmed `team@nextlevelgamingevents.com` and `kcbianzon@gmail.com` accounts can read customer design submissions or edit CMS content. Visitors can submit designs to the inbox.
3. In **Authentication → URL Configuration**, set the Site URL to `https://nextlevelgaming-events.web.app` and add these Redirect URLs:
   - `https://nextlevelgaming-events.web.app/cms`
   - `http://localhost:3000/cms`
4. Open `/cms` on the website. Choose **First time? Create the owner account**, register either approved address, and confirm the link sent to that address if Supabase requests confirmation. Then sign in. Accounts marked confirmed in Supabase can sign in directly.
5. In the CMS, edit a page and choose **Save & Publish**. Supabase stores the page changes and image uploads, and the public site reads those updates. Open **Design submissions** to review customer novelty artwork and download the original PNG by its unique submission ID.

## Novelty customization access

Sign in to `/cms` and open **Novelty access**. Add an approved email address there; remove it from the same list to revoke studio entry. Added users create their own email/password account from the `/build-novelty` access screen and verify their email. Passwords are handled by Supabase Auth and are never stored or visible in the CMS. Confirmed CMS administrators can enter the studio without a separate grant.

If the first registration does not deliver a confirmation email, check Supabase **Authentication → Logs** and the inbox spam folder. Supabase's built-in email service has low sending limits; a custom SMTP sender may be configured in Supabase if needed. Never put a Supabase secret/service-role key in the website. The app uses only the project's publishable key.

Visitor analytics are not connected. The analytics screen accurately reports that no visitor metrics are available until a Google Analytics property is configured.
