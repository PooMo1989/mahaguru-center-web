# 6. System Components
The system is comprised of five primary components: Web Frontend, Backend API, Database, Authentication Service, and the Deployment Platform (Vercel).

graph TD
    subgraph "Browser"
        A[User]
    end
    subgraph "Vercel Platform"
        B[Web Frontend]
        C[Backend API]
        D[Authentication Service]
    end
    subgraph "Database Provider"
        E[PostgreSQL Database]
    end

    A --> B;
    B --> C;
    C --> D;
    C --> E;
    D --> E;

---
