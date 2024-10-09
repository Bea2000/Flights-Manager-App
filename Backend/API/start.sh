#!/bin/bash

# Set the environment variables get from .env
source .env
npm install

# Set the environment variable for PostgreSQL password
export PGPASSWORD="$DATABASE_PASSWORD"

# Check if the database exists
if postgresql -h localhost -U "$DATABASE_USER" -d "$DATABASE_NAME" -c '\q' 2>/dev/null; then
    echo "Database '$DATABASE_NAME' exists."
else
    echo "Database '$DATABASE_NAME' does not exist."
    echo "Creating database '$DATABASE_NAME'..."
    psql -h localhost -U "$DATABASE_USER" -d postgres -c "CREATE DATABASE $DATABASE_NAME;"
fi

unset PGPASSWORD


# Start the API

npm run start:dev