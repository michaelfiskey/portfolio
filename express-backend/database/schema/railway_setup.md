# Database Configuration

## Environment Variables
```bash
# Required environment variable
DATABASE_URL=postgresql://username:password@host:port/database
```

## Connection Pool
```javascript
// Database connection with node-postgres
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
```

## Schema Structure
- **users**: Authentication and user roles
- **spotify_tracks**: Track data from Spotify API  
- **dev_and_data_projects**: Personal project information