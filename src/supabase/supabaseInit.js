import { createClient } from "@supabase/supabase-js"
import config from "../config/index.js"

const supabaseurl = config.supabaseUrl
const supabasekey = config.supabaseKey

export const supabase = createClient(supabaseurl, supabasekey)