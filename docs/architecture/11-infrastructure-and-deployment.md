# 11. Infrastructure and Deployment
The project will use a Git-based CI/CD pipeline hosted on Vercel. Pushing to a feature branch creates a Preview Deployment, merging to `staging` updates the Staging Environment, and merging to `main` deploys to Production. Vercel provides instant rollbacks.

---
