# Mahaguru Center Web Application

A comprehensive learning management platform built with modern web technologies, providing educational tools and resources for students and instructors.

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) with TypeScript 5+
- **Styling**: [Tailwind CSS 4+](https://tailwindcss.com/)
- **Database**: [PostgreSQL 15+](https://postgresql.org/) with [Prisma 5+ ORM](https://www.prisma.io/)
- **API**: [tRPC 11+](https://trpc.io/) for type-safe API communication
- **Authentication**: [NextAuth.js 5+](https://next-auth.js.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Testing**: [Vitest](https://vitest.dev/) with Testing Library
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Deployment**: [Vercel](https://vercel.com/) with CI/CD pipeline

## Getting Started

### Prerequisites

- **Node.js**: v18 or later ([Download](https://nodejs.org/))
- **npm**: v9 or later (comes with Node.js)
- **PostgreSQL**: v15 or later ([Download](https://postgresql.org/download/))
- **Git**: For version control ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mahaguru-center-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```
   
   Configure the following required environment variables in `.env`:
   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/mahaguru_center"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Add your authentication providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database:**
   
   Create the database:
   ```bash
   createdb mahaguru_center
   ```
   
   Run database migrations:
   ```bash
   npm run db:push
   ```
   
   Generate Prisma client:
   ```bash
   npm run db:generate
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run format:check` - Check code formatting
- `npm run format:write` - Format code with Prettier
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run db:push` - Push database schema changes
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio database viewer

### Testing

Run tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

The project maintains 80% code coverage target for critical functionality.

### Code Quality

The project uses several tools to maintain code quality:

- **ESLint**: Linting with TypeScript strict mode
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **TypeScript**: Strict type checking

Pre-commit hooks automatically run:
- Linting and auto-fixing
- Code formatting
- Type checking

### Project Structure

```
mahaguru-center-web/
├── prisma/                 # Database schemas and migrations
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js app router pages
│   │   ├── api/           # API routes
│   │   │   └── trpc/      # tRPC endpoint configuration
│   │   ├── (pages)/       # Page components and routes
│   │   ├── admin/         # Admin interface pages
│   │   └── layout.tsx     # Root layout component
│   ├── components/        # Reusable UI components
│   │   └── ui/           # Base UI components (Radix UI)
│   ├── lib/              # Utility libraries and helpers
│   ├── server/           # Server-side code
│   │   └── api/          # tRPC API logic
│   │       └── routers/  # API route handlers
│   └── test/             # Test setup and utilities
├── .env.example          # Environment variables template
├── .eslintrc.js         # ESLint configuration
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── prettier.config.js   # Prettier configuration
├── README.md           # This file
├── tsconfig.json       # TypeScript configuration
└── vitest.config.ts    # Vitest test configuration
```

## Deployment

### Vercel Deployment (Recommended)

The application is configured for seamless deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - automatic on every push to main branch

### Environment Variables for Production

Set the following in your Vercel dashboard:

```bash
DATABASE_URL=your-production-database-url
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Manual Deployment

Build and start the application:
```bash
npm run build
npm run start
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "Add your feature"`
3. Push to the branch: `git push origin feature/your-feature`
4. Create a Pull Request

Please ensure all tests pass and code follows the established patterns.

## Support

For questions or issues, please create an issue in this repository or contact the development team.
