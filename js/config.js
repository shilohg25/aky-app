window.APP_CONFIG = {
  SUPABASE_URL: "https://pnadtkjdybaalnaqotiu.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_lnGONrjUkuM00sgdNTS7aQ_lSxolPAd"
};

window.ACCOUNT_ADMIN_FUNCTION_URL = `${window.APP_CONFIG.SUPABASE_URL}/functions/v1/account-admin`;

window.supabaseClient = supabase.createClient(
  window.APP_CONFIG.SUPABASE_URL,
  window.APP_CONFIG.SUPABASE_ANON_KEY
);
