import { createClient } from "@supabase/supabase-js";

export const CMS_ADMIN_EMAIL = "team@nextlevelgamingevents.com";
export const CMS_MEDIA_BUCKET = "cms-media";

const SUPABASE_URL = "https://plyjyqyozzeoickaywkd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_yAEbVyM_5NQyM_tD8UdtDQ_BzMzsIa1";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
