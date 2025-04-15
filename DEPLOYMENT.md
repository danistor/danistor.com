# Password Protection Setup for Vercel Deployment

This project includes password protection that can be enabled on the Vercel free tier. Follow these steps to set it up:

## Step 1: Configure Environment Variables in Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to the **Settings** tab
4. Navigate to **Environment Variables**
5. Add the following environment variables:

   | Name                 | Value                  | Description                 |
   | -------------------- | ---------------------- | --------------------------- |
   | `PASSWORD_PROTECTED` | `true`                 | Enable password protection  |
   | `SITE_PASSWORD`      | `your-secure-password` | Password to access the site |

   > **Important**: Replace `your-secure-password` with a strong, unique password

6. Set these variables in all environments (Production, Preview, and Development)
7. Click **Save** to apply changes

## Step 2: Redeploy Your Site

After setting up the environment variables, trigger a new deployment:

1. Go to the **Deployments** tab
2. Click **Redeploy** on your latest deployment, or push a new commit to your repository

## How It Works

- The middleware checks for the presence of an `auth_token` cookie before allowing access to any page
- If the cookie is missing or invalid, visitors are redirected to the login page
- After entering the correct password, the `auth_token` cookie is set, and visitors can access the site
- The cookie expires after 7 days by default

## Disabling Password Protection

To remove password protection:

1. Set `PASSWORD_PROTECTED` to `false` or delete the environment variable entirely
2. Redeploy your site

## Note on Security

This implementation provides basic protection suitable for portfolios and personal sites. It is not intended for securing sensitive information or commercial applications.

For stronger security:

- Use HTTPS (enabled by default on Vercel)
- Consider implementing a more robust authentication system for production applications
- Regularly update your password
