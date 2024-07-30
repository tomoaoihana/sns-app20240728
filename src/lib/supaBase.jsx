import { createClient } from "@supabase/supabase-js";

export const supaBase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);
