# Name Registry Application

A full-stack application for collecting and displaying names, built with modern web technologies.

## Tech Stack

- **Frontend**: React (Vite) with Tailwind CSS and Daisy UI
- **Backend**: Node.js with Hono framework
- **Database**: PostgreSQL
- **Containerization**: Docker

## Project Structure

The project follows a clean architecture with proper separation of concerns:

- `/client` - React frontend
- `/server` - Node.js backend
- `/db` - Database initialization scripts
- `/docker` - Docker configuration

## Development Setup

### Prerequisites

- Docker and Docker Compose
- Node.js (v18+)
- npm or yarn

### Running with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
