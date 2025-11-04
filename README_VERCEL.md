# Deploying this repo to Vercel (Next.js build)

This project was migrated to a Next.js web build using `@expo/next-adapter` so it can be deployed on Vercel.

Follow these exact steps on Vercel to deploy:

1. Connect the repository on Vercel
   - Go to https://vercel.com/new and import the GitHub repository `ogooluwa-cn/hng-todo-list-`.

2. Configure Environment Variables (important)
   - Add the following Environment Variables in the Vercel project Settings → Environment Variables:
     - NEXT_ON_VERCEL = 1
       - Purpose: makes the Babel config return a minimal configuration during the Next build so Next internals are not transformed.
     - EXPO_PUBLIC_CONVEX_URL = <your convex client url>
       - Purpose: required by the Convex React client at runtime. Provide your Convex deployment URL.

3. Build & Output
   - Vercel auto-detects Next.js projects. Use the default build command:
     - Build Command: `npm run build`
     - Output Directory: (leave empty, Vercel will use Next default)

4. Deploy
   - After import and env vars are set, trigger a deployment from the Vercel dashboard.
   - The build will run `next build` and output the production site.

5. Troubleshooting
   - If the build fails with Babel/webpack errors, ensure `NEXT_ON_VERCEL=1` is set (this repo's babel config checks that var).
   - If you see issues with `react-native-web` packages, review package versions. The migration used `@expo/next-adapter` and expects compatible `react-native-web`.
   - Provide the full build logs if you want me to triage them.

6. (Optional) Create the Vercel project from the CLI
   - If you want me to create the Vercel project for you, I'll need one of the following:
     - A Vercel personal access token with `projects:write` and `deployments:write` scope, OR
     - Invite me to your Vercel account/team and tell me the GitHub username or email to use.
   - If you prefer to run it yourself, use the Vercel CLI:
     ```bash
     npm i -g vercel
     vercel login
     vercel --prod
     ```

If you want, I can also remove or tidy the `expo`-related web export artifacts (e.g., `vercel.json`) — I will remove `vercel.json` in this commit as part of cleanup.

If anything goes wrong when Vercel builds the site, paste the build log here and I'll fix what's needed.

---
Changes made by automation:
- Added this `README_VERCEL.md` with deployment steps.
