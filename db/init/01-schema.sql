-- create names table
CREATE TABLE IF NOT EXISTS names (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- add indexes for better query performance
-- ! maybe optional ?
CREATE INDEX IF NOT EXISTS idx_names_last_name ON names(last_name);

-- documentation
COMMENT ON TABLE names IS 'Stores first and last names submitted through the application';
COMMENT ON COLUMN names.id IS 'Auto-incrementing primary key';
COMMENT ON COLUMN names.first_name IS 'Person''s first name';
COMMENT ON COLUMN names.last_name IS 'Person''s last name';
COMMENT ON COLUMN names.created_at IS 'Timestamp when the record was created';
