# Portfolio Database Schema

## Overview
PostgreSQL database schema for my portfolio web application. Contains user authentication, Spotify track data, and project showcase information.

## Database Info
- **Platform**: PostgreSQL 
- **Extensions**: pgcrypto (for UUID generation)
- **Connection**: Configured via environment variables

## Tables

### 1. users
**Purpose**: User authentication and role management
- **Primary Key**: `id` (UUID)
- **Unique Fields**: `username`, `email`
- **Roles**: `user`, `admin`, `owner`
- **Created**: Track registration timestamp

### 2. spotify_tracks
**Purpose**: Store spotify track data
- **Primary Key**: `track_id` (Spotify Track ID)
- **Categories**: `favorite`, `personal`
- **Metadata**: Artist, album, release year
- **Integration**: Connected to Spotify API

### 3. dev_and_data_projects
**Purpose**: Store general personal project data for displaying on dev-and-data page
- **Primary Key**: `project_id` (UUID)
- **Content**: Title, description, date, authors
- **Media**: Project path and image path
- **Display**: Used for project gallery

## Schema Files
- `001_create_users.sql` - User authentication table
- `002_create_spotify_tracks.sql` - Spotify music data table  
- `003_create_dev_and_data_projects.sql` - Projects table
- `complete_schema.sql` - All tables in one file