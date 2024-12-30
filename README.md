# Router.so / Open Source Form Backend

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frouterso%2Frouter%2Ftree%2Fmain&env=RESEND_API_KEY,NEXTAUTH_SECRET,NODE_ENV,POSTGRES_URL&envDescription=NODE_ENV%20should%20be%20%60development%60.%20Resend%20will%20require%20an%20account%20to%20get%20an%20API%20key.&envLink=https%3A%2F%2Fgithub.com%2Frouterso%2Frouter%2Ftree%2Fmain%3Ftab%3Dreadme-ov-file%23prerequisites&project-name=router-so&repository-name=router-so"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

## Description

This is a simple router for forms. [Watch a Demo](https://x.com/youngbloodcyb/status/1831808232966516972)

# Self-Hosting router

## Prerequisites

Before starting, ensure you have the following:

- An account with [Resend](https://resend.com/)
- An account with [Vercel](https://vercel.com/)
- A PostgreSQL database (we recommend [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))

## Environment Variables

After creating your accounts, update your `.env.example` to be `.env.local` for running the application locally. Then, update the keys for each value.

## Step-by-Step Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/routerso/router.git
   cd router/main
   ```
### Without Docker

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**

   Ensure your `.env` file is correctly configured as mentioned above.

4. **Generate the Database Migrations**

   ```sh
   npm drizzle-kit generate
   ```

5. **Run the Database Migrations**

   ```sh
   npm tsx lib/db/migrate.ts
   ```

6. **Start the Development Server**

   ```sh
   npm run dev
   ```
### With docker

2. **Set Up Environment Variables**

   Ensure your `.env` file is correctly configured as mentioned above.

3. **Run Docker Command
   ```sh
   docker compose up
   ```
## Deploying to Vercel

- Push your code to a GitHub repository.
- Connect your repository to Vercel.
- Set the environment variables in Vercel's dashboard under "Settings > Environment Variables".

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs)

For any issues or questions, please open an issue on the [GitHub repository](https://github.com/routerso/router).
