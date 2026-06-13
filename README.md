# Portfolio Ecosystem

Two connected websites:
- Public portfolio
- Admin dashboard

Both use the same PostgreSQL database.

## Local URLs
- Portfolio: http://localhost:3000
- Admin: http://localhost:3001

## Setup
1. Replace all placeholder values in:
   - root .env
   - apps/admin/.env
   - apps/portfolio/.env
   - packages/database/.env
2. Run:
   npm install
3. Push schema:
   npm run db:push
4. Seed admin:
   npm run db:seed
5. Start apps:
   npm run dev
