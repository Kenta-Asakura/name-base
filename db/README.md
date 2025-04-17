# Database Structure

This directory contains database initialization scripts and migration files.

## Schema

The main database is structured as follows:

### Names Table

- `id`: SERIAL PRIMARY KEY - Unique identifier for each entry
- `first_name`: VARCHAR(100) NOT NULL - Person's first name
- `last_name`: VARCHAR(100) NOT NULL - Person's last name
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP - When the record was created

## Initialization

The database is automatically initialized when the Docker container starts using the scripts in the `init/` directory.

## Development Practices

- Always use migrations for schema changes in production
- Use parametrized queries to prevent SQL injection
- Keep column comments up to date
