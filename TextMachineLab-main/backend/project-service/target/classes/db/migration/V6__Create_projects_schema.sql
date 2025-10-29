-- Create project categories table
CREATE TABLE IF NOT EXISTS project_categories_ref (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL
);

-- Create project tags table
CREATE TABLE IF NOT EXISTS project_tags_ref (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    external_link VARCHAR(500),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create junction tables
CREATE TABLE IF NOT EXISTS project_categories (
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES project_categories_ref(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

CREATE TABLE IF NOT EXISTS project_tags (
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES project_tags_ref(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_title ON projects(title);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(active);

-- Insert default categories
INSERT INTO project_categories_ref (name, display_name) VALUES
('Biomedical', 'Biomedical'),
('DigitalHumanities', 'Digital Humanities'),
('Representations', 'Representations'),
('Sentiment', 'Sentiment'),
('Social media', 'Social Media'),
('Temporal', 'Temporal'),
('WordSense', 'Word Sense')
ON CONFLICT (name) DO NOTHING;

-- Insert default tags
INSERT INTO project_tags_ref (name, display_name) VALUES
('Biomedical', 'Biomedical'),
('DigitalHumanities', 'Digital Humanities'),
('Representations', 'Representations'),
('Sentiment', 'Sentiment'),
('Social media', 'Social Media'),
('Temporal', 'Temporal'),
('WordSense', 'Word Sense')
ON CONFLICT (name) DO NOTHING;