-- Insert default categories based on existing HTML content
INSERT INTO categories (name, display_name, type) VALUES
-- Project categories
('Biomedical', 'Biomedical', 'PROJECT'),
('DigitalHumanities', 'Digital Humanities', 'PROJECT'),
('Representations', 'Representations', 'PROJECT'),
('Sentiment', 'Sentiment', 'PROJECT'),
('Social media', 'Social Media', 'PROJECT'),
('Temporal', 'Temporal', 'PROJECT'),
('WordSense', 'Word Sense', 'PROJECT'),

-- Event categories
('Archive', 'Archive', 'EVENT'),
('Biomedical', 'Biomedical', 'EVENT'),
('Humor', 'Humor', 'EVENT'),
('Representations', 'Representations', 'EVENT');

-- Insert default tags based on existing HTML content
INSERT INTO tags (name, display_name) VALUES
('Biomedical', 'Biomedical'),
('DigitalHumanities', 'Digital Humanities'),
('Representations', 'Representations'),
('Sentiment', 'Sentiment'),
('Social media', 'Social Media'),
('Temporal', 'Temporal'),
('WordSense', 'Word Sense'),
('Archive', 'Archive'),
('Humor', 'Humor');

-- Insert default admin user (password: admin123 - should be changed in production)
-- Password hash for 'admin123' using BCrypt
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@textmachinelab.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ADMIN');