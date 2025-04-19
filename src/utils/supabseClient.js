import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mlhflkleyxnkcgzyxalt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1saGZsa2xleXhua2Nnenl4YWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTc4ODQsImV4cCI6MjA1OTg3Mzg4NH0.oLEOwpiSowa09aQqg9vGjGLuIbnM4avV0dgr8brHAUk"

export const supabase = createClient(supabaseUrl, supabaseKey)
