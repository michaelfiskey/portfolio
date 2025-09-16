import { Pool } from 'pg';

export const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? 
        process.env.DATABASE_URL : process.env.DATABASE_PUBLIC_URL,
    ssl: {rejectUnauthorized: false},
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
