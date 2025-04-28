import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import ResetPasswordMail from 'emails/reset-password'
import { Resend } from 'resend'
import { db } from './db'
import { account, session, user, verification } from './db/schema'

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: { user, session, account, verification },
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      // need to get and validate a custom domain for resend
      await resend.emails.send({
        from: 'me@example.com',
        to: user.email,
        subject: 'Reset your password',
        react: <ResetPasswordMail name={user.name} url={url} />,
      })
    },
  },
})
