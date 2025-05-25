import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rmhtwibzjebqsfmffxnb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtaHR3aWJ6amVicXNmbWZmeG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNjg1NTYsImV4cCI6MjA2Mzc0NDU1Nn0.S7WJi4Y9lXh-MrOceOmmcmP3r1F4lz7CJebFiRGre3Y"

export const supabase = createClient(supabaseUrl, supabaseKey)
