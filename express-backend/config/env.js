import { config } from 'dotenv';

config({path: `./.env.${process.env.NODE_ENV || 'development'}.local`})

export const { 
  PORT, 
  NODE_ENV, 
  SUPABASE_URL, 
  SUPABASE_ANON_KEY, 
  SUPABASE_SERVICE_ROLE_KEY ,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  JWT_SECRET_KEY,
  TOKEN_HEADER_KEY,
  EMAIL_SERVICE,
  EMAIL_PASS,
  CONTACT_EMAIL
} = process.env;