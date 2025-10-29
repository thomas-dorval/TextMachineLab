-- Check current flyway schema history
SELECT * FROM flyway_schema_history ORDER BY installed_rank;

-- The issue is that different services have different version numbers
-- We need to use unique version numbers for each service

-- Solution: Update migration file names to use unique version numbers
-- User Service: V1__Create_users_schema.sql (already exists)
-- Publication Service: V2__Create_publications_schema.sql (already exists) 
-- Project Service: V3__Create_projects_schema.sql (needs to be renamed)
-- Event Service: V4__Create_events_schema.sql (needs to be renamed)
-- Blog Service: V5__Create_blogs_schema.sql (needs to be renamed)

-- Or alternatively, reset flyway and start fresh:
-- DELETE FROM flyway_schema_history WHERE version NOT IN ('1', '2');
-- This would allow the other services to run their V1 migrations