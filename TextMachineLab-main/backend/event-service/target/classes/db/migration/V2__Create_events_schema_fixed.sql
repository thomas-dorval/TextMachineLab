-- Create categories table (fixed version)
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL
);

-- Create events table (fixed version)
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    external_link VARCHAR(500),
    event_date DATE,
    archived BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create junction table (fixed version)
CREATE TABLE IF NOT EXISTS event_categories (
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, category_id)
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_archived ON events(archived);
CREATE INDEX IF NOT EXISTS idx_events_title ON events(title);

-- Insert default categories if they don't exist
INSERT INTO categories (name, display_name) VALUES
('Archive', 'Archive'),
('Biomedical', 'Biomedical'),
('Humor', 'Humor'),
('Representations', 'Representations')
ON CONFLICT (name) DO NOTHING;