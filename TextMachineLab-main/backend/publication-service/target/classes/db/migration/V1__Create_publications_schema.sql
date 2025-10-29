-- Create publications table
CREATE TABLE IF NOT EXISTS publications (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    authors VARCHAR(500) NOT NULL,
    venue VARCHAR(255),
    year INTEGER,
    pdf_url VARCHAR(500),
    external_link VARCHAR(500),
    abstract TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_publications_title ON publications(title);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year);
CREATE INDEX IF NOT EXISTS idx_publications_authors ON publications(authors);
CREATE INDEX IF NOT EXISTS idx_publications_venue ON publications(venue);