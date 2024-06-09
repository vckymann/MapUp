const config = {
    supabaseUrl: String(import.meta.env.VITE_SUPABASE_URL),
    supabaseKey: String(import.meta.env.VITE_SUPABASE_KEY),
    mapUrl: String(import.meta.env.VITE_MAP_URL),
    mapKey: String(import.meta.env.VITE_MAP_KEY)
}

export default config;