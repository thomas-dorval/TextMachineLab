-- Update publications table to match the form fields
ALTER TABLE publications ALTER COLUMN venue DROP NOT NULL;
ALTER TABLE publications ADD COLUMN IF NOT EXISTS abstract_text TEXT;
ALTER TABLE publications ADD COLUMN IF NOT EXISTS doi VARCHAR(255);
ALTER TABLE publications ADD COLUMN IF NOT EXISTS publication_type VARCHAR(100);