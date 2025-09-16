CREATE TABLE IF NOT EXISTS spotify_tracks (
  track_id VARCHAR(255) PRIMARY KEY,
  track_name VARCHAR(255) NOT NULL,
  album_id VARCHAR(255) NOT NULL,
  album_name VARCHAR(255) NOT NULL,
  artist_id VARCHAR(255) NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  release_year INTEGER NOT NULL CHECK(release_year BETWEEN 1000 and 9999),
  track_category VARCHAR(50) CHECK (track_category IN ('favorite', 'personal')),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

