CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user'
        CHECK (role in ('user', 'admin', 'owner')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS spotify_tracks (
  track_id VARCHAR(255) PRIMARY KEY,
  track_name VARCHAR(255) NOT NULL,
  album_id VARCHAR(255) NOT NULL,
  album_name VARCHAR(255) NOT NULL,
  artist_id VARCHAR(255) NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  release_year INTEGER NOT NULL CHECK(release_year BETWEEN 1000 and 9999),
  track_category VARCHAR(50) CHECK (track_category IN ('favorite', 'personal')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS dev_and_data_projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_title VARCHAR(200) NOT NULL,
    project_description VARCHAR(3000),
    project_date DATE,
    project_authors TEXT[],
    project_path VARCHAR(1000) NOT NULL,
    project_image_path VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);