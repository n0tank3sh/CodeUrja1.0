-- Add up migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS "documents" (
  key UUID NOT NULL DEFAULT uuid_generate_v4(),    
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TEXT NOT NULL
);
