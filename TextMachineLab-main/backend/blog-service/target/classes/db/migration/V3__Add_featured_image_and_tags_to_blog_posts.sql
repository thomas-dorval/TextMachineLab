-- Add featured_image and tags columns to blog_posts table
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT;