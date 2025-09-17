# Mahaguru Center

This is the repository for the Mahaguru Center web application, a platform for... (Add a brief description of the project).

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/)
- [Supabase](https://supabase.com/) (PostgreSQL)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm
- Docker

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd mahaguru-center-web
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the `mahaguru-center-web` directory by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your Supabase credentials and other required environment variables.

4.  **Run database migrations:**

    ```bash
    pnpm prisma db push
    ```

### Running the Application

To start the development server, run:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Deployment

The application is deployed to Vercel via Git integration. Any push to the `main` branch will trigger a new deployment.
